import { useStore } from "@/app/store/app-store";
import Styles from "./Overlay.module.css";

export const Overlay = () => {
  
  const store = useStore();

  return (
    <div onClick={store.closePopup}
      className={`${Styles["overlay"]} ${store.popupIsOpened && Styles["overlay_is-opened"]}`}
    ></div>
  );
};
