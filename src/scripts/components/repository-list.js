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

const linkToRepo = repo =>
  `https://github.com/${repo.owner.name}/${repo.name}`

const renderRepositoryTitle = repo =>
  <div class="repository-title">
    <a class="link" href={linkToRepo(repo)} target="_blank">
      {repo.name}
    </a>
    <span class="language">{repo.language}</span>
  </div>

const renderOwnedRepository = repo =>
  <li class="repository owned">
    {renderRepositoryTitle(repo)}
    <div class="description">
      {repo.description}
    </div>
    <div class="info">
      <strong>{repo.stars.toString()}</strong> stars | last updated at&nbsp;
      <strong>{new Date(repo.lastUpdate).toDateString()}</strong>
    </div>
  </li>

const renderForkedRepository = repo =>
  <li class="repository forked">
    {renderRepositoryTitle(repo)}
    <div class="description">
      {repo.description}
    </div>
    <div class="info">
      <strong>
        {repo.parent.contributions}
      </strong>
      &nbsp;contribution(s) to&nbsp;
      <a href={linkToRepo(repo.parent)} target="_blank">
        {`${repo.parent.owner.name}/${repo.parent.name}`}
      </a>
    </div>
  </li>
