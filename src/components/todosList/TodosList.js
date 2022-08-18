import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todoDeleted, todoToggleCompleted, fetchTodos} from './todosSlice';
import {createSelector} from "@reduxjs/toolkit";

import TodosListItem from "../todosListItem/TodosListItem";
import Spinner from '../spinner/Spinner';


const TodosList = () => {                       //нужно прокинуть props.updateData

    const filteredTodosSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.todos.todos,
        (filter, todos) => {
            if (filter === 'all') {
                return todos;
            } else {
                return todos.filter(item => item.type === filter);
            }
        }
    );

    const filteredTodos = useSelector(filteredTodosSelector);
    // updateData(filteredTodos);
    const {todos, todosLoadingStatus} = useSelector(state => state);
    const {activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();
    const style = {textAlign: 'center', marginTop: '5px'};

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, []);

    const onDeleteTodo = useCallback((id, todos) => {
        request(`http://localhost:3001/todos/${id}`, "DELETE")
                .then(data => console.log(data, 'Deleted'))
                .then(dispatch(todoDeleted(id)))
                .catch(err => console.log(err))
    }, [request]);

    const onCompleteTodo = (id) => {
        dispatch(todoToggleCompleted(id));
    };


    if (todosLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (todosLoadingStatus === "error") {
        return <h5 style={style}>Downloading Error</h5>
    }

    const renderTodosList = (arr, filter) => {
        if (arr.length === 0 && filter !== 'done') {
            return <h5 style={style}>There is no todo yet!</h5>
        } else if (arr.length === 0){
            return <h5 style={style}>There is no completed todo yet!</h5>
        }

        return arr.map(({id, ...props}) => {
            return (
                <TodosListItem
                    key={id}
                    {...props}
                    id={id}
                    onDeleteTodo={() => onDeleteTodo(id, todos)}
                    onCompleteTodo={() => onCompleteTodo(id)}/>
            )
        })
    }

    const elements = renderTodosList(filteredTodos, activeFilter);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default TodosList;