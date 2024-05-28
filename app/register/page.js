"use client"
import Styles from './mePage.module.css';
import {RegisterForm} from "@/app/components/RegisterForm/RegisterForm";
import Image from "next/image";
import dynamic from "next/dynamic";


const Page = () => {
    return (
        <main className={Styles["wrapper"]}>
            <section>
                <RegisterForm/>
            </section>
            <section>
                <Image
                    src={"/images/registerIll.png"}
                    width={500}
                    height={500}
                    alt={"PlaceHolder"}
                />
            </section>
        </main>
    );
};

export default dynamic(() => Promise.resolve(Page), {
    ssr: false,
});