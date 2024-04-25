"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import Styles from "@/app/components/Footer/Footer.module.css"

export const Footer = () => {
	const pathname = usePathname()

	return (
		<footer className={Styles.footer}>
			{pathname === "/" ? (
				<div className={Styles.footer__logo}>
					<span className={Styles["footer__logo-name"]}>pindie</span>
					<span className={Styles["footer__logo-copy"]}>
						, XXI век
					</span>
				</div>
			) : (
				<Link href="/" className={Styles.footer__logo}>
					<span className={Styles["footer__logo-name"]}>pindie</span>
					<span className={Styles["footer__logo-copy"]}>
						, XXI век
					</span>
				</Link>
			)}
			<ul className={Styles["social-list"]}>
				<li className={Styles["social-list__item"]}>
					<a
						href="#"
						className={`button ${Styles["social-list__link"]}`}
					>
						YT
					</a>
				</li>
				<li className={Styles["social-list__item"]}>
					<a
						href="#"
						className={`button ${Styles["social-list__link"]}`}
					>
						ВК
					</a>
				</li>
				<li className={Styles["social-list__item"]}>
					<a
						href="#"
						className={`button ${Styles["social-list__link"]}`}
					>
						TG
					</a>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
