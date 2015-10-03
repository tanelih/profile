import element from 'virtual-element'

import { assign }          from 'app/utils'
import { getUser,
         getRepository,
         getRepositories,
         getContributors } from 'app/utils/github'
import * as Profile        from 'app/components/profile'
import * as RepositoryList from 'app/components/repository-list'

export const render = ({ state }) =>
  <section id="user-view">
    <Profile user={state.user} />
    <RepositoryList repos={state.repos} />
  </section>

export const initialState = props => ({
  user: {
    name:   props.name,
    avatar: null
  },
  repos: [ ]
})

export const afterMount = ({ state, props }, el, set) =>
  // fetch the necessary data from the server
  getUser(props.name)
    .then(user => getRepositories(user.name)
      .then(repos =>
        // map over the repositories, resolving with the gotten repository if it
        // is owned by the user, otherwise retrieving the origin of the forked
        // repository and populating the repository data with the contributions
        Promise.all(repos.map(repo => repo.fork
          ? getRepository(user.name, repo.name).then(repo =>
            getContributors(repo.parent.owner.name, repo.parent.name)
              .then(contributors =>
                contributors.find(c => c.name === user.name))
              .then(contributor => assign(repo.parent, {
                contributions: contributor ? contributor.contributions : 0 }))
              .then(parent => assign(repo, { parent })))
          : Promise.resolve(repo))))
      .then(repos => set(assign(state, { user, repos }))))
