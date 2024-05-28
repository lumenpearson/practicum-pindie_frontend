'use client'
import Image from "next/image";
import Styles from "./aboutme.module.css";
import { useStore } from "@/app/store/app-store";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader/Preloader";
import dynamic from 'next/dynamic'
function Me() {
    const router = useRouter();
    const [preloaderVisible, setPreloaderVisible] = useState(false);
    const authContext = useStore();
    const handleLogout = async () => {
        setPreloaderVisible(false);
        authContext.logout();
        router.push("/");
    };

    useEffect(() => {
        if (authContext.user !== undefined && authContext.user !== false) {
            setPreloaderVisible(true);
        }
    }, [authContext.isAuth]);

    if (authContext.isAuth === false) {
        router.push('/');
    }

    return (
        <>
            {preloaderVisible ? (
                <main className={Styles["wrapper"]}>
                    <section className={Styles["section_wraper"]}>
                        <div className={Styles["ProfileBase"]}>
                            <div className={Styles["fisrtBlockWrapper"]}>
                                <Image
                                    src={"/images/avatarPlaceHolder.png"}
                                    width={150}
                                    height={150}
                                    alt={"PlaceHolder"}
                                    className={Styles["avatar"]}
                                />
                                <div className={Styles["user_text_container"]}>
                                    <p className={Styles["user_text"]}>{authContext.user.username}</p>
                                    <p className={Styles["user_text"]}>{authContext.user.id}</p>
                                </div>
                            </div>
                            <div className={Styles["secondBlockWrapper"]}>
                                <h2>Твои игры</h2>
                                <div className={Styles["descriptionBlock"]}>
                                    <p>
                                        "Place Holder"
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleLogout} className={Styles['auth__button']}>Выйти</button>
                        </div>
                    </section>
                    <section className={Styles["section_wraper"]}>
                        <Image
                            src={"/images/registerIll.png"}
                            width={500}
                            height={500}
                            alt={"PlaceHolder"}
                        />
                    </section>
                </main>
            ) : (
                <Preloader/>
            )}
        </>
    );
};

export default dynamic(() => Promise.resolve(Me), {
    ssr: false
})