import React, {useContext, useState} from 'react';
import classes from './HomePage.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import logo from "../HomePage/img/LEDO_logo_mini.png"
import HomePageSample from "../../components/UI/HomePageSample/HomePageSample";
import HistoryItem from "../../components/UI/HisrotyItem/HistoryItem";
import DocList from "../../components/UI/HomePageDocumentsList/DocList";


const HomePage = () => {
    const auth = useContext(AuthContext)
    const history = useNavigate()
    const [blanks, setBlanks] = useState([
        { name: "First", number: 1},
        { name: "Second", number: 2},
        { name: "Third", number: 3},
        { name: "Fir", number: 4},
        { name: "Sec", number: 5},
        { name: "Thi", number: 6},
        { name: "First", number: 7},
        { name: "Second", number: 8},
        { name: "Third", number: 9},
        { name: "Fir", number: 10},
        { name: "Sec", number: 11},
        { name: "Thi", number: 12},
    ])
    const [nameOfNewSample, setNameOfNewSample] = useState('')
    const [showNameOfNewSample, setShowNameOfNewSample] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [activeSearch, setActiveSearch] = useState([])

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history("/")
    }

    const changeHandler = event => {
        setNameOfNewSample(event.target.value)
    }

    const changeHandlerSearch = event => {
        setSearchText(event.target.value)
        setActiveSearch(searchArray(event.target.value))
    }

    const [historyList, setHistoryItem] = useState([
        { name: "First", number: 1},
        { name: "Second", number: 2},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
        { name: "Third", number: 3},

    ])

    const [docList, setDocItem] = useState([
        { name: "First", number: 1},
        { name: "Second", number: 2},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
        { name: "Third", number: 3},
    ])

    const [showDocList, setShowDocList] = useState(false)
    const [showHistoryList, setHistoryList] = useState(false)

    const NewSampleListener = e => {
        document.querySelector("#NewSampleInput").addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault()

                setBlanks([...blanks, {name: e.target.value, number: blanks.length}])
                setNameOfNewSample('')
                setShowNameOfNewSample(false)
            }
        })
    }

    function searchArray(text) {
        let result = []
        for (let i = 0; i < blanks.length; i++) {
            if (blanks[i].name.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
                result.push(blanks[i])
            }
        }
        return result
    }

    const deleteClick = number => {
        let temp = Object.assign([], blanks)
        let result = []
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].number !== number) {
                result.push(temp[i])
            }
        }

        setBlanks(result)
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
            <div className={classes.header}>
                <div className={classes.logo}>
                    <img className={classes.logo} src={logo} alt = ''/>
                </div>
                <div className={classes.Search}>
                    <input type="text" placeholder="Искать здесь..."
                           onChange={ changeHandlerSearch }
                           id="SearchInput"
                    />
                </div>
                <div className={classes.text}>
                    <div style={{display: "flex"}}>
                        <div className={classes.history}
                             onClick={ () => {setHistoryList(!showHistoryList)}}>
                            <span className={classes.templatesText}>История</span>

                        </div>
                        <div className={classes.documents}
                             onClick={ () => {setShowDocList(!showDocList)}}>
                            <span className={classes.documentsText}>Мои документы</span>
                        </div>
                        <div className={classes.exit}>
                            <a className={classes.exitText} href="/" onClick={ logoutHandler }>Выход</a>
                            {/*<img className={classes.exitImg} src={ exitImg } alt = '' />*/}
                        </div>
                    </div>
                </div>
            </div>
            <hr className={classes.topLine}/>
            <div className={classes.blanks}>
                <div className={classes.createBox}>
                    <div
                         className={classes.plusImg}
                         onClick={() => setShowNameOfNewSample(!showNameOfNewSample)}
                    />
                </div>
                { searchText.length === 0 &&
                    blanks.map(blank =>
                        <HomePageSample name={blank.name}
                                        number={blank.number}
                                        deleteClick={() => deleteClick(blank.number)}
                                        key={blank.number}
                        />
                    )
                }
                { searchText.length !== 0 &&
                    activeSearch.map(blank =>
                        <HomePageSample name={blank.name}
                                        number={blank.number}
                                        deleteClick={() => deleteClick(blank.number)}
                                        key={blank.number}
                        />
                    )
                }
            </div>
            { showNameOfNewSample &&
                <div className={classes.newSampleNameWindow}>
                    <input id="NewSampleInput"
                            className={classes.newSampleNameWindowInput}
                            type="text"
                            placeholder="Введите имя шаблона..."
                            onChange={ changeHandler }
                            onFocus={ NewSampleListener }
                    />
                    <div className={classes.newSampleNameWindowButton} onClick={
                        () => {
                            setBlanks([...blanks, {name: nameOfNewSample, number: blanks.length + 1}])
                            setNameOfNewSample('')
                            setShowNameOfNewSample(false)
                        }
                    }>Создать
                    </div>
                </div>
            }
            {showDocList &&
                <DocList onClick={() => setShowDocList(false)}/>
            }
            { showHistoryList &&
                <div className={classes.showDocList}>

                    {historyList.map(his =>
                        <HistoryItem key={his.number}/>
                    )}

                </div>}
        </div>
    )
};

export default HomePage;