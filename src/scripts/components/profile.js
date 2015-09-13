import element from 'virtual-element'

export function render({ props }) {
  return (
    <section class="profile">
      <img src={props.user.avatar} />
      {props.user.name}
    </section>
  );
}
