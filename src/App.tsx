import React, {useState} from 'react';
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import Login from "./pages/Login";

export type UserLogin = {
    login: string,
    password: string,
}

function App() {
    const [isAuth, setIsAuth] = useState(false)

    const authUser = ({login, password}: UserLogin) => {
        setIsAuth(true)
    }

    const logOutUser = () => {
        setIsAuth(false)
    }

    return (
        <BrowserRouter>
            <Navigation isAuth={isAuth} logOut={logOutUser}/>
            {isAuth ? (
                <Routes>
                    <Route path="/" element={<TodosPage/>}/>
                    <Route path="*" element={<TodosPage/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<Login authUser={authUser}/>}/>
                    <Route path="*" element={<Login authUser={authUser}/>}/>
                </Routes>
            )}
        </BrowserRouter>
    )
}

export default App;
