import element from 'virtual-element'

export const render = ({ props }) =>
  <section class="profile">
    <img class="avatar" src={props.user.avatar} />
    <section class="info">
      <div class="user-name">{props.user.name}</div>
      <div class="real-name">{props.user.realName}</div>
    </section>
  </section>
