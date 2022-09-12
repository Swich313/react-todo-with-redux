import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect, useContext, createContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'dotenv/config';

import { todoDeleted,
        todoArchived,
        todoToggleCompleted,
        fetchTodos,
        setCurrentPage,
        setFilteredTodosQuantity} from './todosSlice';
import {createSelector} from "@reduxjs/toolkit";

import TodosListItem from "../todosListItem/TodosListItem";
import Spinner from '../spinner/Spinner';
import './todoList.scss'
import data from "bootstrap/js/src/dom/data";


const TodosList = () => {                       //нужно прокинуть props.updateData
    const filteredTodosSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.todos.todos,
        (filter, todos) => {
            if (filter === 'all') {
                return todos.filter(item => item.type !== 'done');
            } else if (filter === 'done'){
                return todos.filter(item => item.type === filter);
            } else {
                return todos.filter(item => item.type === filter);
            }
        }
    );

    const filteredTodos = useSelector(filteredTodosSelector);
    const {todosLoadingStatus, currentPage,  perPage, todos} = useSelector(state => state.todos);
    const {activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();
    const style = {textAlign: 'center', marginTop: '5px'};
    const pagesQuantity = Math.ceil(filteredTodos.length / perPage);
    const pages = [];
    for (let i = 1; i<=pagesQuantity; i++){
        pages.push(i)
    };

    useEffect(()=> {
        dispatch(setFilteredTodosQuantity(filteredTodos));
    }, [filteredTodos]);

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, []);

    const onDeleteTodo = useCallback((id) => {
                request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`, "DELETE")
                .then(data => console.log(data, 'Deleted'))
                .then(dispatch(todoDeleted(id)))
                .catch(err => console.log(err))
    }, [request]);

    const onArchiveTodo = useCallback((id) => {
        request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`, "PATCH", JSON.stringify({archived: true, completed: true}))
            .then(data => console.log(data, 'Patched'))
            .then(dispatch(todoArchived(id)))
            .catch(err => console.log(err))
    }, [dispatch]);


    const onCompleteTodo = (id, todos) => {
        let iscompleted  = !todos.find(item => item.id === id).completed;
        request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`, "PATCH", JSON.stringify({completed: iscompleted}))
            .then(data => console.log(data, 'Patched'))
            .then(dispatch(todoToggleCompleted(id)))
            .catch(err => console.log(err));
    };


    if (todosLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (todosLoadingStatus === "error") {
        return <h5 style={style}>Downloading Error</h5>
    }

    const renderTodosList = (arr, filter, currentPage, perPage) => {
        if (arr.length === 0 && filter !== 'done') {
            return <h5 style={style}>There is no todo yet!</h5>
        } else if (arr.length === 0){
            return <h5 style={style}>There is no completed todo yet!</h5>
        }
        let start = (currentPage - 1) * perPage;
        let stop = currentPage * perPage;
        const shortenArr = arr.slice(start, stop);
        return shortenArr.map(({id, ...props}) => {
            return (
                <TodosListItem
                    key={id}
                    {...props}
                    id={id}
                    onDeleteTodo={() => onDeleteTodo(id, todos)}
                    onCompleteTodo={() => onCompleteTodo(id, todos)}
                    onArchiveTodo ={() => onArchiveTodo(id)}/>
            )
        })
    }

    const elements = renderTodosList(filteredTodos, activeFilter, currentPage, perPage);
    return (
        <ul>
            {elements}
            <div className="pages">
                {pages.map((page, i) => {
                    return (
                        <span key={i}
                              className={currentPage === page && pages.length > 1 ? "page active_page" : pages.length > 1 ? "page" : "invisible"}
                              onClick={() => {dispatch(setCurrentPage(page))}}>
                            {page}
                        </span>
                    )
                })}
            </div>
        </ul>
    )
}
export default TodosList;
