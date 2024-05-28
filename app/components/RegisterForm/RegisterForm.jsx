
import Styles from './RegisterForm.module.css';
import {register} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";
import {useEffect, useState} from "react";
import {isResponseOk} from "@/app/api/api-utils";
import {useStore} from '@/app/store/app-store';


export const RegisterForm = (props) => {
    const authContext = useStore();
    const [message, setMessage] = useState({ status: null, text: null });
    const [registerData, setRegisterData] = useState( {
        username: undefined,
        email: undefined,
        password: undefined
    });
    const handleInput = (e) => {
        const newAuthData = registerData;
        newAuthData[e.target.name] = e.target.value;
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registerData)
        const userData = await register(endpoints.register, registerData);
        if(isResponseOk(userData)) {
            setMessage({ status: "success", text: "Вы зарегестрированы!" });
        } else {
            setMessage({ status: "error", text: "Возникла ошибка при создании учётной записи" });
        }
    };
    console.log()
    return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Регистрация</h2>
        <div className={Styles['form__fields']}>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Имя</span>
                <input name={"username"} onInput={handleInput} className={Styles['form__field-input']} type="text"
                       placeholder='Имя пользователя'/>
            </label>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Email</span>
                <input name={"email"} onInput={handleInput} className={Styles['form__field-input']} type="email"
                       placeholder="Ваша почта"/>
            </label>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Пароль</span>
                <input name={"password"} onInput={handleInput} className={Styles['form__field-input']} type="password"
                       placeholder='Придумайте пароль'/>
            </label>
        </div>
        {message.status && (
            <p className={Styles["form__message"]}>{message.text}</p>
        )}
        <div className={Styles['form__actions']}>
            <button className={Styles['form__reset']} type="reset">Очистить</button>
            <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
