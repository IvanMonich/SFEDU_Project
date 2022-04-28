import React, {useState} from 'react';

import classes from "./DocList.module.css";
import DocItem from "./DocItem";

export let Show = true

const DocList = props => {

    const [resizeDocList, setResizeDocList] = useState(false)
    const [docs, setDocs] = useState([
        {id: 1, title:'Document'},
        {id: 2, title:'Document'},
        {id: 3, title:'Document'},
        {id: 4, title:'Document'},
        {id: 5, title:'Document'},
        {id: 1, title:'Document'},
        {id: 2, title:'Document'},
        {id: 3, title:'Document'},
        {id: 4, title:'Document'},
        {id: 5, title:'Document'},
    ])

    return (
        <div className={classes.DocStyle} id='DocListSize'>
            <div className={classes.list} id='ListSize'>
            {docs.map((doc) =>
                <DocItem docs={doc} key = {docs.id}/>

            )}
                </div>
            <div className={classes.head}>
                <button className={classes.resBtn}
                        onClick={() => {
                            setResizeDocList(!resizeDocList)
                            if (resizeDocList === true && docs.length < 14){
                                let div = document.getElementById("DocListSize")
                                div.style.height = ((50 + 2) * docs.length + 15 + 32) + "px"
                                let div2 = document.getElementById("ListSize")
                                div2.style.height = ((50 + 2) * docs.length + 15 + 2) + "px"
                            }
                            else if (resizeDocList === true && docs.length > 13){
                                let div3 = document.getElementById("DocListSize")
                                div3.style.height = ((50 + 2) * 13 + 15 + 32) + "px"
                                let div4 = document.getElementById("ListSize")
                                div4.style.height = ((50 + 2) * 13 + 15 + 2) + "px"
                            }
                            else{
                                let div = document.getElementById("DocListSize")
                                div.style.height = 270 + 'px'
                                let div2 = document.getElementById("ListSize")
                                div2.style.height = 240 + 'px'
                            }
                        }
                    }
                />
                <button className={classes.closeBtn} onClick={props.onClick} />
            </div>
        </div>
    );
};

export default DocList;