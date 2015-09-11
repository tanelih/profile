import element from 'virtual-element'

import { assign }     from 'app/utils'
import {
	getUser,
	getRepository,
	getRepositories,
	getContributors } from 'app/utils/github'
import * as Avatar    from 'app/components/avatar'


export function initialState(props) {
	return {
		user: {
			name:   props.name,
			avatar: null
		},
		repos: [ ]
	}
}

export function render({ state }) {
	return (
		<section class="user-view">
			<Avatar url={state.user.avatar} />
		</section>
	)
}

export function afterMount({ state, props }, el, set) {
	return getUser(props.name)
		.then(user => getRepositories(user.name)
			.then(repos =>
				// map over the repositories and see which are forks
				Promise.all(repos.map(repo => repo.fork
					// fetch a detailed version of the forked repository, so we
					// can get more information on the parent repository and so
					// we can also fetch the contributions
					? getRepository(user.name, repo.name).then(repo =>
						getContributors(repo.parent.owner.name, repo.parent.name)
							// find the user from the contributors
							.then(contributors =>
								contributors.find(c => c.name === user.name))
							// assign the amount of contributions to the parent
							// repository, which is the origin of the fork
							.then(contributor => assign(repo.parent, {
								contributions: contributor
									? contributor.contributions : 0 }))
							// assign the parent back to the repository
							.then(parent => assign(repo, { parent })))
					// regular repositories we can just resolve straight on
					: Promise.resolve(repo))))
			.then(repos =>
				set(assign(state, { user, repos }))))
}
