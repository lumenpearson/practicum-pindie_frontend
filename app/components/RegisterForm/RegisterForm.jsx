"use client";
import { useStore } from "@/app/store/app-store";
import Styles from "./RegisterForm.module.css";
import { useEffect, useState } from "react";
import { authorize, isResponseOk } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";

export const RegisterForm = () => {
    const store = useStore();
    const [authData, setAuthData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState({ status: null, text: null });

    const handleRegister = async (e) => {
        e.preventDefault();
        await authorize(endpoints.register, authData);
        const userData = await authorize(endpoints.auth, authData);
        if (isResponseOk(userData)) {
            store.login({ ...userData, id: userData._id }, userData.jwt);
            setMessage({ status: "success", text: "Вы зарегистрировались!" });
        } else {
            setMessage({ status: "error", text: "Неверные почта или пароль" });
        }
    };

    const haveAcc = () => {
        store.authorize();
    };
    const handleInput = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let timer;
        if (store.user) {
            timer = setTimeout(() => {
                store.closePopup();
                setMessage({ status: null, text: null });
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [store.user]);

    return (
        <form className={Styles["form"]}>
            <h2 className={Styles["form__title"]}>Регистрация</h2>
            <div className={Styles["form__fields"]}>
                <label className={Styles["form__field"]}>
                    <span className={Styles["form__field-title"]}>
                        Имя пользователя
                    </span>
                    <input
                        onInput={handleInput}
                        name="username"
                        className={Styles["form__field-input"]}
                        type="username"
                    />
                </label>
                <label className={Styles["form__field"]}>
                    <span className={Styles["form__field-title"]}>Email</span>
                    <input
                        onInput={handleInput}
                        name="email"
                        className={Styles["form__field-input"]}
                        type="email"
                        placeholder="hello@world.com"
                    />
                </label>
                <label className={Styles["form__field"]}>
                    <span className={Styles["form__field-title"]}>Пароль</span>
                    <input
                        onInput={handleInput}
                        name="password"
                        className={Styles["form__field-input"]}
                        type="password"
                        placeholder="***********"
                    />
                </label>
            </div>
            {message.status && (
                <p className={Styles["form__message"]}>{message.text}</p>
            )}
            <div className={Styles["form__actions"]}>
                <button
                    className={Styles["form__submit"]}
                    type="submit"
                    onClick={handleRegister}
                >
                    Зарегистрироваться
                </button>
                <button
                    className={Styles["form__register"]}
                    type="reset"
                    onClick={haveAcc}
                >
                    Уже есть аккаунт
                </button>
            </div>
        </form>
    );
};
