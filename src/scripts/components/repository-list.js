import element from 'virtual-element'

export function render({ props }) {
  return (
    <section class="repository-list">
      <ul>{props.repos.map(repo => <li>{repo.name}</li>)}</ul>
    </section>
  )
}
