import React,  { useContext, useEffect, useState } from 'react';
import classes from './AuthPage.module.css'
import logo from './img/LEDO_logo.png'
import authName from './img/AuthName.svg'
import authImg from './img/authImg.svg'
import regName from './img/RegName.svg'
import inpImage from './img/inpImage.svg'
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthButton from "../../components/UI/MyButton/AuthButton";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";


const AuthPage = () => {
    const [showRegField, setShowRegField] = useState(false)

    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {

    }, [error])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userID)
        } catch (e) {}
    }

    return (
        <div className={classes.background}>
            <div className={classes.cosmostars}>
                <div className={classes.stars}/>
                <div className={classes.stars2}/>
                <div className={classes.stars3}/>
                <div className={classes.stars4}/>
                <div className={classes.stars5}/>
            </div>
            <div className={classes.header}/>
            <div className={classes.header}>
                <img className={classes.logo} src={logo} alt="" />
                <div className={classes.text}>
                    <span className={classes.ledo}>LEDO - онлайн конструктор документов</span>
                    <span className={classes.description}>Данный веб сервис позволит вам с лёгкостью создать шаблон
                        <br />документа.
                        <br />И поделится им с друзьями.</span>
                    <br />
                </div>
            </div>
            {!showRegField &&
                <div className={classes.authField}>
                    <div className={classes.authTittle}>
                        <span className={classes.authText}>Авторизация <img  src={authImg} alt=""/> </span>
                    </div>
                    <span className={classes.tittle}>Войдите в систему, для работы с документами!</span>
                    <form action="">
                        <AuthInput name="email" onChange={changeHandler} placeholder="Email" type="email" />
                        <AuthInput name="password" onChange={changeHandler} placeholder="Password" type="password"/>
                        <AuthButton onClick={loginHandler} disabled={loading} name="LOGIN"/>
                        <img className={classes.mailImage} src={ inpImage } alt=""/>
                    </form>
                    <div className={classes.wantReg}>
                        <span className={classes.wantRegButton} onClick={() => setShowRegField(!showRegField)}>Хочу создать аккаунт!</span>
                    </div>
                </div>}
            {showRegField &&
                <div className={classes.authField}>
                    <div className={classes.regTittle}>
                        <span className={classes.regText}>Регистрация <img src={regName} alt=""/></span>
                    </div>
                    <span className={classes.regTextLogin}>Укажите свой логин и пароль  для <br/> регистрации в системе</span>
                    <form action="">
                        <AuthInput name="email" onChange={changeHandler} placeholder="Email" type="email"/>
                        <AuthInput name="password" onChange={changeHandler} placeholder="Password" type="password"/>
                        <AuthButton onClick={registerHandler} disabled={loading} name="SIGN UP"/>
                        <img className={classes.mailImage1} src={ inpImage } alt=""/>
                    </form>
                    <div className={classes.goBack} onClick={() => setShowRegField(!showRegField)} />
                </div>
            }
        </div>
    );
};

export default AuthPage;