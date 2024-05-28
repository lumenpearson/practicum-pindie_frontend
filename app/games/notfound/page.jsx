"use client"
import Styles from "./notfound.module.css";
import Image from 'next/image';
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();
    return (
        <div className={Styles['container']}>
            <section className={Styles['leftSection']}>
                <h1 className={Styles['textNormalize']}>Ваши запросы слишком абрастракты!</h1>
                <p className={Styles['textNormalize']}>К сожалению, игра не найдена</p>
                <p className={Styles['textNormalize']}>Хотите отправиться на главную страницу?</p>
                <button className={Styles['button']} onClick={() => router.push('/')}>Хочу!</button>
            </section>
            <Image
                className={Styles['image']}
                    src="/images/notfoundimg.png"
                    width={500}
                    height={375}
                    alt="кот имеющий длинную прическу, которая выглядит как мягкий и густой пушистый пух. Он украшен фиолетовым цветом волос, который выглядит как яркая и блестящая шелковистая шерсть"
                />
        </div>
    );
};

export default Page;
