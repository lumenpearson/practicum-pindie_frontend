"use client"
import Link from 'next/link'
import Styles from './Footer.module.css'
import { usePathname } from 'next/navigation'

export const Footer = () => {

    const pathName = usePathname();

    return (
        <footer className={Styles['footer']}>
        {
    pathName === "/" ? <div className={Styles['footer__logo']}><span className={Styles['footer__logo-name']}>pindie</span> 
    <span className={Styles['footer__logo-copy']}>, XXI век</span> </div> : 
    <Link href="/" className={Styles['footer__logo']}>
    <span className={Styles['footer__logo-name']}>pindie</span>
    <span className={Styles['footer__logo-copy']}>, XXI век</span>
    </Link>
}
        <ul className={Styles['social-list']}>
        <li className={Styles['social-list__item']}>
            <a href="https://www.youtube.com" target="_blank" className={`button ${Styles.social_list_link}`}>YT</a>
        </li>
        <li className={Styles['social-list__item']}>
            <a href="https://vk.com" target="_blank" className={`button ${Styles.social_list_link}`}>ВК</a>
        </li>
        <li className={Styles['social-list__item']}>
            <a href="https://weba.telegram.org" target="_blank" className={`button ${Styles.social_list_link}`}>TG</a>
        </li>
        </ul>
    </footer>
    )
}