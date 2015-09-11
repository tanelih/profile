import element from 'virtual-element'

export const name = 'AvatarComponent'

export function render({ props }) {
	return (
		<section class="avatar">
			<img src={props.url} />
		</section>
	);
}
