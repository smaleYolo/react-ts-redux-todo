import React from 'react';


interface TodoClassesProps {
    classes: string[],
    setClass: (cl: number) => void,
    active: number,
}

const TodoClasses = ({classes, active, setClass}: TodoClassesProps) => {

    return (
        <div className="flex justify-around w-[200px] mt-3">
            {
                classes.map((cl, i) => (
                    <button
                        key={cl}
                        disabled={active === i}
                        className={active === i ? 'opacity-50' : undefined}
                        onClick={() => setClass(i)}
                    >{cl}</button>
                ))
            }
        </div>
    );
};

export default TodoClasses;