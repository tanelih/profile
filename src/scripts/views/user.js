import element from 'virtual-element'

import { assign }          from 'app/utils'
import { getUser,
         getRepository,
         getRepositories,
         getContributors } from 'app/utils/github'
import * as Profile        from 'app/components/profile'
import * as RepositoryList from 'app/components/repository-list'

export function render({ state }) {
  return (
    <section class="user-view">
      <Profile user={state.user} />
      <RepositoryList repos={state.repos} />
    </section>
  )
}

export function initialState(props) {
  return {
    user: {
      name:   props.name,
      avatar: null
    },
    repos: [ ]
  }
}

export function afterMount({ state, props }, el, set) {
  return getUser(props.name)
    .then(user => getRepositories(user.name)
      .then(repos =>
        // map over the repositories and see which are forks
        Promise.all(repos.map(repo => repo.fork
          // fetch a detailed version of the forked repository
          ? getRepository(user.name, repo.name).then(repo =>
            // fetch the contributors for the repository
            getContributors(repo.parent.owner.name, repo.parent.name)
              // find the user from the contributors
              .then(contributors =>
                contributors.find(c => c.name === user.name))
              // assign the amount of contributions to the parent
              // repository, which is the origin of the fork
              .then(contributor => assign(repo.parent, {
                contributions: contributor ? contributor.contributions : 0 }))
              // assign the parent back to the repository
              .then(parent => assign(repo, { parent })))
          // regular repositories we can just resolve straight on
          : Promise.resolve(repo))))
      // finally we can set the views state
      .then(repos => set(assign(state, { user, repos }))))
}
