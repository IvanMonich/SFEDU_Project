import React, {useState} from 'react';
import classes from './HomePageSample.module.css'
import LinkShare from "../LinkShare/LinkShare";
import { useNavigate } from "react-router-dom";

const HomePageSample = props => {
    const [showShare, setShowShare] = useState(false)
    let navigate = useNavigate()

    return (
        <div className={ classes.box } >
            <span>{props.name}</span>

            <div id={props.number} className={ classes.boxOver }>
                <div
                    className={classes.EditImg}
                    onClick={() => {
                        navigate("/work_page/" + props.name)
                    }}
                />
                <div
                    className={classes.ShareImg}
                    onClick={() => setShowShare(!showShare)}
                />
                <div
                    className={classes.DeleteImg}
                    onClick={props.deleteClick}
                />
            </div>
            {showShare &&
                <LinkShare />
            }
        </div>
    );
};

export default HomePageSample;