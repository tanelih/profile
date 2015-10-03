import element from 'virtual-element'

export const render = ({ props }) =>
  <section class="profile">
    <a href={`https://github.com/${props.user.name}`}>
      <img class="avatar" src={props.user.avatar} />
    </a>
    <section class="info">
      <div class="user-name">{props.user.name}</div>
      <div class="real-name">{props.user.realName}</div>
    </section>
  </section>
