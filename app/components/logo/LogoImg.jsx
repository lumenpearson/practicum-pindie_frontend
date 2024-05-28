import Styles from "@/app/components/Header/Header.module.css";

const LogoImg = () => {
    return (
        <div className={Styles['logo']}>
            <img
                className={Styles['logo__image']}
                src="./images/logo.svg"
                alt="Логотип Pindie"
            />
        </div>
    );
};

export default LogoImg;