import Styles from "@/app/components/Header/Header.module.css";
import Link from "next/link";

const LogoLink = () => {
    return (
        <Link href="/" className={Styles['logo']}>
            <img
                className={Styles['logo__image']}
                src="/images/logo.svg"
                alt="Логотип Pindie"
            />
        </Link>
    );
};

export default LogoLink;