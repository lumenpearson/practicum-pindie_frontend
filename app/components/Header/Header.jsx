"use client"
import Styles from './Header.module.css'
import { useEffect, useState } from "react";
import { Overlay } from "@/app/components/Overlay/Overlay";
import { Popup } from "@/app/components/Popup/Popup";
import { AuthForm } from "@/app/components/AuthForm/AuthForm";
import Link from "next/link";
import LogoImg from "@/app/components/logo/LogoImg";
import LogoLink from "@/app/components/logo/LogoLink"
import { usePathname, useRouter } from "next/navigation";
import { useStore } from '@/app/store/app-store';
import Image from "next/image";


export const Header = () => {
  const router = useRouter()
  const pathname = usePathname();
  const authContext = useStore();
  const handleLogout = () => {
    authContext.logout();
  };
  const [popupIsOpend, setPopupIsoppened] = useState(false)

  const openPopup = () => {
    setPopupIsoppened(true)
  }

  const closePopup = () => {
    setPopupIsoppened(false)
  }
  return (
    <header className={Styles['header']}>
      {pathname === '/' ? <LogoImg /> : <LogoLink />}
      <nav className={Styles['menu']}>
        <ul className={Styles['menu__list']}>
          <li className={Styles['menu__item']}>
            <Link href="/new" className={`${Styles["menu__link"]} ${pathname === "/new" ? Styles["menu__link_active"] : ""}`}>
              Новинки
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/popular" className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>
              Популярные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/shooters" className={`${Styles["menu__link"]} ${pathname === "/shooters" ? Styles["menu__link_active"] : ""}`}>
              Шутеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/runners" className={`${Styles["menu__link"]} ${pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>
              Ранеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/pixel-games" className={`${Styles["menu__link"]} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>
              Пиксельные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="tds" className={`${Styles["menu__link"]} ${pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles['auth']}>
          {authContext.isAuth ?
            (
              <Link className={Styles['auth__button']} href={'/me'}>
                <Image
                  src={"/images/avatarPlaceHolder.png"}
                  alt={"Иконка перехода в профиль"}
                  width={150}
                  height={150}
                />
              </Link>
            )
            :
            (<button onClick={openPopup} className={Styles['auth__button']}>Войти</button>)
          }
        </div>
      </nav>
      <Overlay isOpened={popupIsOpend} close={closePopup} />
      <Popup isOpened={popupIsOpend} close={closePopup}>
        <AuthForm close={closePopup} />
      </Popup>
    </header>
  )
}
