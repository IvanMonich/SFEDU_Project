import React from 'react';
import classes from './WorkPageNavBar.module.css'
import logo from './img/logo.png'
import { useNavigate } from "react-router-dom";

const WorkPageNavBar = () => {
    let navigate = useNavigate()

    return (
        <div className={classes.background}>
            <img src={ logo } alt=""/>
            <div className={classes.toHomePage} onClick={() => navigate(-1)}>
                <div className={classes.toHomePageIMG}/>
                На главную
            </div>
            <div className={classes.navButtons}>
                <div className={classes.navFileButton}>
                    <div className={classes.navFileImg}/>
                    <span>Файл</span>
                </div>
                <div className={classes.navFormatButton}>
                    <div className={classes.navFormatImg}/>
                    <span>Формат</span>
                </div>
                <div className={classes.navViewButton} >
                    <div className={classes.navViewImg}/>
                    <span>Вид</span>
                </div>
            </div>

        </div>
    );
};

export default WorkPageNavBar;