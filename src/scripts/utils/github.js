import { assign, mapProperties } from 'app/utils';

/**
 * Simple shortcut for 'fetch', which turns the response into JSON.
 */
const get = url => fetch(url).then(res => res.json())

/**
 * Map the GitHub resources to something more simple.
 */

const UserPropertyMap = {
  'login':      'name',
  'name':       'realName',
  'avatar_url': 'avatar'
}

const ContributorPropertyMap = {
  'login':         'name',
  'contributions': 'contributions'
}

let RepositoryPropertyMap = {
  'name':        'name',
  'fork':        'fork',
  'description': 'description',
  'language':    'language'
}

// we need to reference other property maps in the repository property mapping
RepositoryPropertyMap = assign(RepositoryPropertyMap, {
  'owner': UserPropertyMap })
RepositoryPropertyMap = assign(RepositoryPropertyMap, {
  'parent': RepositoryPropertyMap })

/**
 *
 */
export function getUser(user) {
  let url = process.env.NODE_ENV === 'development'
    ? `res/dummy-user.json`
    : `https://api.github.com/users/${user}`
  return get(url).then(mapProperties(UserPropertyMap))
}

/**
 *
 */
export function getRepository(user, repo) {
  let url = process.env.NODE_ENV === 'development'
    ? `res/dummy-repository.json`
    : `https://api.github.com/repos/${user}/${repo}`
  return get(url).then(mapProperties(RepositoryPropertyMap))

}

/**
 *
 */
export function getRepositories(user) {
  let url = process.env.NODE_ENV === 'development'
    ? `res/dummy-repositories.json`
    : `https://api.github.com/users/${user}/repos`
  return get(url).then(repositories =>
    repositories.map(mapProperties(RepositoryPropertyMap)))
}

/**
 *
 */
export function getContributors(user, repo) {
  let url = process.env.NODE_ENV === 'development'
    ? `res/dummy-contributors.json`
    : `https://api.github.com/repos/${user}/${repo}/contributors`
  return get(url).then(contributors =>
    contributors.map(mapProperties(ContributorPropertyMap)))
}
