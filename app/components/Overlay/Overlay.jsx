import Styles from "@/app/components/Overlay/Overlay.module.css"

export const Overlay = (props) => {
	return (
		<div
			className={`${Styles["overlay"]} ${props.isOpened && Styles["overlay_is-opened"]}`}
			onClick={props.closePopup}
		></div>
	)
}

export default Overlay
