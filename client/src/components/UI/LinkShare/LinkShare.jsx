import React from 'react';
import classes from "./LinkShare.module.css"
import copyImg from "./img/copyImg.svg"

const LinkShare = props => {
    return (
        <div className={classes.mainBox}>
            <div className={classes.infoString}>
                <span className={classes.linktext}>Ваша ссылка:</span>
                <img className={classes.linkImg} src={copyImg} alt=''/>
            </div>
        </div>
    );
};

export default LinkShare;