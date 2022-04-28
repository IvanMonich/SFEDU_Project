import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import WorkPage from "./pages/WorkPage/WorkPage";
import ListsJSON from './lists.json'

const useRoutes = isAuthenticated => {
    const [routesList, setRoutesList] = useState([
        { number: 1, routeName: "First" },
        { number: 2, routeName: "Second" },
        { number: 3, routeName: "Third" },
        { number: 4, routeName: "Forth" }
    ])

    const getSampleData = name => {
        for (let i = 0; i < ListsJSON.length; i++) {
            if (ListsJSON[i].sampleName === name) {
                return {
                    lists: ListsJSON[i].lists,
                    password: ListsJSON[i].password,
                    forShare: `http://localhost:3000/work_page/${name}`
                }
            }
        }
        return null
    }

    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage />}/>
                {
                    routesList.map(route =>
                        <Route path={ "/work_page/" + route.routeName }
                               element={<WorkPage sampleId={ route.routeName }
                                                  sampleData={ getSampleData(route.routeName) }/>
                        } key={ route.number.toString() }
                        />
                    )
                }
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />}/>
        </Routes>
    );
};

export default useRoutes;