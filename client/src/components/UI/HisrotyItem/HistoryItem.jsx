import React from 'react';
import classes from "../HomePageDocumentsList/DocItem.module.css";
import docImg from "../../../pages/HomePage/img/docImg.svg";

const HistoryItem = () => {
    return (
        <div>
            <div className={classes.docItem}>
                <img className={classes.docImg} alt='' src={docImg}/>
                <span className={classes.docDescription}>Document...</span>
            </div>

        </div>
    );
};

export default HistoryItem;