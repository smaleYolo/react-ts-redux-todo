import React from 'react';

interface NavigationProps {
    isAuth?: boolean,
    logOut: () => void,
    userName?: string,
}

const Navigation = ({isAuth, logOut}: NavigationProps) => {
    return (
        <nav className="bg-gray-400 h-10 mb-3 flex justify-between items-center pl-3">
            <span className="font-bold">Todo List</span>
            {
                isAuth &&
                <div className="mr-3">
                    <button onClick={logOut}>
                        Logout
                    </button>
                </div>
            }
        </nav>
    );
};

export default Navigation;