import React, {useState} from 'react';
import {UserLogin} from "../App";

interface LoginProps {
    authUser: ({ login, password }: UserLogin) => void
}

const Login = ({authUser}: LoginProps) => {
    const inputCl = 'outline-0 ml-2 mr-2 mb-2 border-b-2 border-dotted'
    const errorCl = 'outline-0 ml-2 mr-2 mb-2 border-b-2 border-b-red-300'

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const authHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if(!login.length){
            setError('Введите логин!')
            return
        }

        if(!password.length){
            setError('Введите пароль!')
            return;
        }

        authUser({login,password})
    }

    return (
        <div className="flex justify-center mt-8">
            <form className="flex flex-col border-2 w-[300px] rounded pt-2"
            >
                <input type="text" placeholder="Login"
                       className={error && error.includes('логин') ? (errorCl) : (inputCl)}
                       value={login} onChange={(e) => setLogin(e.target.value)}
                />
                <input type="password" placeholder="Password"
                       className={error && error.includes('пароль') ? (errorCl) : (inputCl)}
                       value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center">
                    <button
                        className="border-2 rounded-full pl-2 pr-2 mb-2"
                        onClick={(event) => authHandler(event)}
                    >
                        Login
                    </button>
                </div>
                <div className="flex justify-center text-red-600">
                    {
                        error && <p>{error}</p>
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;