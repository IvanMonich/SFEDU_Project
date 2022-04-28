import React from 'react';
import classes from "./DocItem.module.css";
import docImg from "../../../../src/pages/HomePage/img/docImg.svg"

const DocItem = props => {
    return (
        <div className={classes.docItem}>

            <img className={classes.docImg} alt='' src={docImg}/>
            <span className={classes.docDescription}>{props.docs.title} {props.docs.id}</span>
        </div>
    )
};

export default DocItem;