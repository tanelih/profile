import element from 'virtual-element'

export function render({ props }) {
  let forked = props.repos.filter(repo => repo.fork)

  return (
    <section class="repository-list">
      <h2>Repositories</h2>
      <ul>
        {props.repos.filter(repo => !repo.fork).map(renderOwnedRepository)}
      </ul>
      <h2>Contributions</h2>
      <ul>
        {props.repos.filter(repo => repo.fork).map(renderForkedRepository)}
      </ul>
    </section>
  )
}

function renderOwnedRepository(repo) {
  return (
    <li class="repository">
      {repo.name}
    </li>
  )
}

function renderForkedRepository(repo) {
  return (
    <li class="repository fork">
      {repo.name}
    </li>
  )
}
