"use client";

import Image from "next/image";
import promoImage from "@/public/images/promo-illustration.svg";
import Styles from "@/app/components/Promo/Promo.module.css";
import { useState, useEffect } from "react";

export const Promo = () => {
  const [codeIsVisible, setCodeIsVisible] = useState(false);

  const handleButtonClick = () => {
    if (!codeIsVisible) {
      setCodeIsVisible(true);
    }
  };

  useEffect(() => {
    let timeout;

    if (codeIsVisible) {
      timeout = setTimeout(() => {
        setCodeIsVisible(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [codeIsVisible]);

  return (
    <section className={Styles.promo}>
      <div>
        <h2 className={Styles.promo__title}>Твой промо-код</h2>
        <p className={Styles.promo__description}>
          Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!
        </p>
        <button
          className={`button ${Styles.promo__button}`}
          onClick={handleButtonClick}
        >
          {codeIsVisible ? (
            <span className={Styles["promo-code"]}>WEBTEENS10</span>
          ) : (
            "Получить код"
          )}
        </button>
      </div>
      <Image src={promoImage} alt="Собака" className={Styles.promo__image} />
    </section>
  );
};

export default Promo;
