import { createContext, useContext } from 'react';

export const TodoContext = createContext({
    todo: [
        {
            id: Date.now(),
            todo: "Hello",
            isCompleted: false,
        }
    ],
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => { },
    createTodo: (todo) => { },
    toggleTodo: (id) => {}
});

export const useTodo = () => {
    return (
        useContext(TodoContext)
    )
}

export const TodoProvider = TodoContext.Provider;
