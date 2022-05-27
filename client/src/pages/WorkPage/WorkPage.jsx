import React, { useEffect, useState } from 'react';
import classes from './WorkPage.module.css'
import WorkPageNavBar from "../../components/WorkPageNavBar/WorkPageNavBar";
import CommonText from './img/TextStyle/CommonText.svg'
import BoldText from './img/TextStyle/BoldText.svg'
import ItalicText from './img/TextStyle/ItalicText.svg'
import UnderlineText from './img/TextStyle/UnderlineText.svg'
import byCenter from './img/TextStyle/byCenter.svg'
import byWidth from './img/TextStyle/byWidth.svg'
import byRightSide from './img/TextStyle/byRightSide.svg'
import byLeftSide from './img/TextStyle/byLeftSide.svg'
import WorkSpace from "../../components/WorkSpace/WorkSpace";


const WorkPage = props => {
    const [showImageSettings, setShowImageSettings] = useState(false)
    const [showTextSettings, setShowTextSettings] = useState(false)
    const [showFigureSettings, setShowFigureSettings] = useState(false)
    const [showTableSettings, setShowTableSettings] = useState(false)

    const [isAccess, setIsAccess] = useState(false)
    const [isUsersMode, setIsUsersMode] = useState(false)
    const [activePassword, setActivePassword] = useState('')

    const [lists, setLists] = useState(props.sampleData.lists)

    const [activeBlock, setActiveBlock] = useState({
        listNumber: null,
        blockNumber: null
    })

    useEffect(() => {
        // const data = JSON.parse(localStorage.getItem("lists"))
        //
        // if (data && data.lists) {
        //     setLists(data.lists)
        // }
    }, [lists])

    function getActiveListBlock (listNumber, blockNumber) {
        setActiveBlock({
            listNumber: listNumber,
            blockNumber: blockNumber
        })
    }

    function addList(mode) {
        if (mode === "block") {
            setLists([...lists, {listNumber: lists.length, listBlocks: [{
                    blockNumber: 0,
                    blockType: "Text",
                    blockHeight: 150,
                    blockWidth: 250,
                    blockFontFamily: "Times New Roman",
                    blockFontSize: 14,
                    blockFontWeight: "normal",
                    blockFontStyle: "normal",
                    blockTextAlign: "center",
                    blockTextDecorationLine: "none",
                    color: "black",
                    content: 'Text Block'
                }]
            }])
        } else {
            setLists([...lists, {listNumber: lists.length, listBlocks: []}])
        }

        if (lists.length > 0) {
            let div = document.getElementById("backgroundId")
            div.style.height = (1740 * (lists.length + 1) + 132 * 2) + "px"
        }
    }

    useEffect(() => {
        let summaryHeight = 0

        for (let i = 0; i < lists.length; i++) {
            for (let j = 0; j < lists[i].length; j++) {
                if (j === lists[i].length - 1 && summaryHeight > 1754) {
                    let listsTemp = Object.assign([], lists)
                    let blockTemp = listsTemp[i].listBlocks
                    listsTemp[i + 1].listBlocks.push([listsTemp[i].listBlocks[-1], blockTemp])
                    listsTemp[i].listBlocks = listsTemp[i].listBlocks.slice(0, -1)
                    setLists(listsTemp)
                } else if (j === lists[i].length - 1 && summaryHeight < 1754) {
                    summaryHeight = 0
                } else {
                    summaryHeight += lists[i].listBlocks[j].height
                }
            }
        }
    })

    function addBlock(typeOfBlock, content) {
        let copy = Object.assign([], lists)
        // let whatIsBlockLength =
        if (copy[copy.length - 1].listBlocks.length === 10) {
            addList("block")
        } else if (typeOfBlock === "img") {
            copy[copy.length - 1].listBlocks.push({
                blockNumber: copy[copy.length - 1].listBlocks.length,
                blockType: typeOfBlock,
                blockHeight: 150,
                blockWidth: 250,
                background: `url(${content})`,
                content: ""
            })
        } else {
            copy[copy.length - 1].listBlocks.push({
                blockNumber: copy[copy.length - 1].listBlocks.length,
                blockType: typeOfBlock,
                blockHeight: 150,
                blockWidth: 250,
                blockFontFamily: "Times New Roman",
                blockFontSize: 14,
                blockFontWeight: "normal",
                blockFontStyle: "normal",
                blockTextAlign: "center",
                blockTextDecorationLine: "none",
                color: "black",
                content: 'Text Block'
            })
            setLists(copy)
        }
    }

    function setBlockList(newBlockList, listNumber, blockNumber) {
        let tempLists = Object.assign([], lists)
        tempLists[listNumber].listBlocks[blockNumber] = newBlockList
        setLists(tempLists)
    }

    const changeHandler = event => {
        setActivePassword(event.target.value)
    }

    function setBlockSettings(param, mode) {
        if ( activeBlock.blockNumber === null || activeBlock.listNumber === null ) return null

        let copy = Object.assign([], lists)
        if (mode === "FontFamily") {
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontFamily = param
        } else if (mode === "FontSize") {
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontSize = param
        } else if (mode === "FontWeight") {
            if ( copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontWeight !== param ) {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontWeight = param
            } else {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontWeight = "normal"
            }
        } else if (mode === "FontStyle") {
            if ( copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontStyle !== param ) {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontStyle = param
            } else {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontStyle = "normal"
            }
        } else if (mode === "TextDecorationLine") {
            if ( copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockTextDecorationLine !== param ) {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockTextDecorationLine = param
            } else {
                copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockTextDecorationLine = "none"
            }
        } else if (mode === "TextAlign") {
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockTextAlign = param
        } else if (mode === "Color") {
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].color = param
        } else if (mode === "SetFontSettings") {
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontWeight = "normal"
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontStyle = "normal"
            copy[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockTextDecorationLine = "none"
        }

        setLists(copy)
        // console.log(lists[activeBlock.listNumber].listBlocks[activeBlock.blockNumber].blockFontWeight, " Active Lists")
    }

    useEffect(() => {
        console.log(activeBlock)
    }, [activeBlock])

    const saveDataToStorage = () => {
        localStorage.setItem("lists", JSON.stringify({
            lists: lists
        }))
    }

    return (
        <>
            { isAccess ?
                <div id="backgroundId" className={classes.background}>
                    <WorkSpace listsWS={lists} getActive={getActiveListBlock} setListsState={setBlockList}/>
                    <div className={classes.toolPanel}>
                        <div className={classes.toolPanelImageButton}
                             onClick={() => {
                                 setShowImageSettings(!showImageSettings)
                                 setShowTextSettings(false)
                                 setShowFigureSettings(false)
                                 setShowTableSettings(false)
                             }}
                        />
                        <div className={classes.toolPanelTextButton}
                             onClick={() => {
                                 setShowTextSettings(!showTextSettings)
                                 setShowImageSettings(false)
                                 setShowFigureSettings(false)
                                 setShowTableSettings(false)
                             }}/>
                        <div className={classes.toolPanelFigureButton}
                             onClick={() => {
                                 setShowFigureSettings(!showFigureSettings)
                                 setShowImageSettings(false)
                                 setShowTextSettings(false)
                                 setShowTableSettings(false)
                             }}/>
                        <div className={classes.toolPanelTableButton}
                             onClick={() => {
                                 setShowTableSettings(!showTableSettings)
                                 setShowImageSettings(false)
                                 setShowTextSettings(false)
                                 setShowFigureSettings(false)
                             }}/>
                    </div>
                    {showImageSettings &&
                        <div className={classes.ImageSettingsWindow}>
                            <div className={classes.ImageSettingsWindowHeader}>
                                <span style={{cursor: "default"}}>Настройка изображения</span>
                                <div className={classes.closeWindow} onClick={() => {
                                    setShowImageSettings(false)
                                }}/>
                            </div>
                            <div className={classes.transparencyOption}>
                                <span>Прозрачность</span>
                            </div>
                            <div className={classes.transparencyOption}>
                                <span>Границы</span>
                            </div>
                            <div className={classes.transparencyOption}>
                                <span>Наложение текста</span>
                            </div>
                        </div>
                    }
                    {showTextSettings &&
                        <div className={classes.TextSettingsWindow}>
                            <div className={classes.ImageSettingsWindowHeader}>
                                <span style={{cursor: "default"}}>Настройка текста</span>
                                <div className={classes.closeWindow} onClick={() => {
                                    setShowTextSettings(false)
                                }}/>
                            </div>
                            <div className={classes.FontSet}>
                                <select name="Font" id="FontSettings" className={classes.FontSelection}
                                        onChange={event => setBlockSettings(event.target.value, "FontFamily")}
                                >
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Calibri">Calibri</option>
                                </select>
                                <select name="Font" id="FontSettings" className={classes.fontSizeSelection}
                                        onChange={event => setBlockSettings(event.target.value, "FontSize")}
                                >
                                    <option value="12px">12</option>
                                    <option value="14px">14</option>
                                    <option value="16px">16</option>
                                    <option value="18px">18</option>
                                </select>
                            </div>
                            <div className={classes.TextStyle}>
                                <div className={classes.TextStyleInter}>
                                    <span className={classes.SpanSettings}>Стиль текста</span>
                                    <div>
                                        <img className={classes.TextStyleImg} src={CommonText} alt="" onClick={() =>
                                            setBlockSettings("normal", "SetFontSettings")}
                                        />
                                        <img className={classes.TextStyleImg} src={BoldText} alt="" onClick={() =>
                                            setBlockSettings("bold", "FontWeight")}
                                        />
                                        <img className={classes.TextStyleImg} src={ItalicText} alt="" onClick={() =>
                                            setBlockSettings("italic", "FontStyle")}
                                        />
                                        <img className={classes.TextStyleImg} src={UnderlineText} alt="" onClick={() =>
                                            setBlockSettings("underline", "TextDecorationLine")}
                                        />
                                    </div>
                                </div>
                                <div className={classes.alignment}>
                                    <span className={classes.SpanSettings}>Выравнивание</span>
                                    <div>
                                        <img className={classes.TextStyleImg} src={byCenter} alt="" onClick={() =>
                                            setBlockSettings("center", "TextAlign")}
                                        />
                                        <img className={classes.TextStyleImg} src={byWidth} alt="" onClick={() =>
                                            setBlockSettings("justify", "TextAlign")}
                                        />
                                        <img className={classes.TextStyleImg} src={byRightSide} alt="" onClick={() =>
                                            setBlockSettings("right", "TextAlign")}
                                        />
                                        <img className={classes.TextStyleImg} src={byLeftSide} alt="" onClick={() =>
                                            setBlockSettings("left", "TextAlign")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.TextStyle}>
                                <div className={classes.TextStyleInter}>
                                    <span className={classes.SpanSettings}>Цвет текста</span>
                                    <div>
                                        <input className={classes.colorInput} type="color" onChange={event =>
                                            setBlockSettings(event.target.value, "Color")}
                                        />
                                    </div>
                                </div>
                                <div className={classes.alignment}>
                                    <span className={classes.SpanSettings}>Абзац</span>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {showFigureSettings &&
                        <div className={classes.FigureSettingsWindow}>

                        </div>
                    }
                    {showTableSettings &&
                        <div className={classes.TableSettingsWindow}>
                            <div className={classes.ImageSettingsWindowHeader}>
                                <span style={{cursor: "default"}}>Настройка таблицы</span>
                                <div className={classes.closeWindow} onClick={() => {
                                    setShowTableSettings(false)
                                }}/>
                            </div>
                        </div>
                    }
                    <WorkPageNavBar/>
                    <div className={classes.blocksActions}>
                        <div className={classes.AddListButton} onClick={addList}>
                            ADD LIST
                        </div>
                        <div className={classes.AddBlocksButton} onClick={addBlock}>
                            ADD BLOCK
                        </div>
                        <span className={classes.peregorodka}>|</span>
                        <div className={classes.saveButton}
                             onClick={ saveDataToStorage }>
                            SAVE
                        </div>
                    </div>
                </div>
                :
                <div className={classes.getPasswordWindow}>
                    <input className={classes.getPasswordWindowInput}
                           type="password"
                           placeholder="Введите пароль шаблона..."
                           onChange={ changeHandler }
                    />
                    <div className={classes.getPasswordWindowButton} onClick={
                        () => {
                            if (activePassword === props.sampleData.password) {
                                setIsAccess(true)
                            }
                        }
                    }>Редактировать
                    </div>
                    <div className={classes.getPasswordWindowButton} onClick={
                        () => {
                            if (activePassword === props.sampleData.password) {
                                setIsUsersMode(true)
                            }
                        }
                    }>Заполнить
                    </div>
                </div>
            }
        </>
    );
};

export default WorkPage;