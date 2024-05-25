"use client";

import Image from "next/image";
import bannerImage from "@/public/images/banner-illustration.jpg";
import Styles from "@/app/components/Banner/Banner.module.css";

export const Banner = () => {
  return (
    <section className={Styles.banner}>
      <div className={Styles.banner__description}>
        <h1 className={Styles.banner__title}>
          Портал инди-игр от&nbsp;студентов Яндекс Практикума
        </h1>
        <div className={Styles["banner__text-block"]}>
          <p className={Styles.banner__text}>
            Студенты курсов разрабатывают свои игры на Unity, здесь мы их
            публикуем. Вы можете играть прямо на сайте. А если у вас есть
            аккаунт пользователя — получаете возможность голосовать за игры.
          </p>
        </div>
        <a href="#popular" className={`button ${Styles.banner__link}`}>
          Смотреть игры
        </a>
      </div>
      <Image
        src={bannerImage}
        alt="Рука, утопленная в желтом фоне"
        placeholder="blur"
        className={Styles.banner__image}
      />
    </section>
  );
};

export default Banner;
