import element from 'virtual-element'

export const render = ({ props }) =>
  <section class="repository-list">
    <section class="list-container">
      <h2 class="title">Repositories</h2>
      <ul class="list">
        {props.repos.filter(repo => !repo.fork).map(renderOwnedRepository)}
      </ul>
    </section>
    <section class="list-container">
      <h2 class="title">Contributions</h2>
      <ul class="list">
        {props.repos.filter(repo => repo.fork).map(renderForkedRepository)}
      </ul>
    </section>
  </section>

const renderOwnedRepository = (repo) =>
  <li class="repository">
    {repo.name}
  </li>

const renderForkedRepository = (repo) =>
  <li class="repository fork">
    {repo.name}
  </li>
