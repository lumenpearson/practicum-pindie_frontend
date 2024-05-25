"use client";

import endpoints from "@/app/api/config";
import { redirect } from "next/navigation";
import { useStore } from "@/app/store/app-store";
import { useState, useEffect } from "react";
import { isResponseOk, signup } from "@/app/api/api-utils";
import Styles from "@/app/components/SignupForm/SignupForm.module.css";

export const SignupForm = (props) => {
  const authContext = useStore();
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ status: null, text: null });
  const [registered, setRegistered] = useState(false);

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await signup(endpoints.signup, authData);
    if (isResponseOk(userData)) {
      setMessage({ status: "success", text: "Вы зарегистрировались!" });
      setRegistered(true);
    } else {
      setMessage({ status: "error", text: userData.message });
    }
  };

  useEffect(() => {
    let timer;

    if (authContext.user) {
      timer = setTimeout(() => {
        redirect("/");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [registered]);

  useEffect(() => {
    if (authContext.user) {
      redirect("/");
    }
    return;
  }, [authContext.user]);

  return (
    <form onSubmit={handleSubmit} className={Styles["form"]}>
      <h2 className={Styles["form__title"]}>Регистрация</h2>
      <div className={Styles["form__fields"]}>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Имя пользователя</span>
          <input
            className={Styles["form__field-input"]}
            onInput={handleInput}
            name="username"
            placeholder="a-z, A-Z, 0-9, 3-32 символа"
            required={true}
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input
            className={Styles["form__field-input"]}
            onInput={handleInput}
            name="email"
            type="email"
            placeholder="you@example.com"
            required={true}
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input
            className={Styles["form__field-input"]}
            onInput={handleInput}
            name="password"
            type="password"
            placeholder="***********"
            required={true}
          />
        </label>
      </div>
      {message.status && (
        <p className={Styles["form__message"]}>{message.text}</p>
      )}
      <div className={Styles["form__actions"]}>
        <button className={Styles["form__reset"]} type="reset">
          Очистить
        </button>
        <button className={Styles["form__submit"]} type="submit">
          Зарегистироваться
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
