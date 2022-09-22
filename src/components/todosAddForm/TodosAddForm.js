import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {todoCreated, setTodoDeadline} from "../todosList/todosSlice";
import 'dotenv/config';

import "./todosAddForm.scss"

const TodosAddForm = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescr, setTodoDescr] = useState('');
    const [todoType, setTodoType] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const {todoDeadline} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newTodo ={
            title: todoTitle,
            description: todoDescr,
            deadline: todoDeadline,
            type: todoType ? todoType : "other",
            completed: false,
            archived: false
        }


        request(`${process.env.REACT_APP_REQUEST_URL}todos`, "POST", JSON.stringify(newTodo))
            .then(res => {
                const newTodoWithId = {...newTodo, _id: res._id};
                console.log(res, 'successful posting')
                dispatch(todoCreated(newTodoWithId))
            })
            .catch(err => console.log(err));

        setTodoTitle('');
        setTodoDescr('');
        setTodoType('');
        dispatch(setTodoDeadline(null));
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading'){
            return <option>Loading...</option>
        } else if (status === 'error'){
            return <option>Downloading Error</option>
        }
        if (filters && filters.length > 0) {
            return filters.map(({id, name}) => {
                if (name === 'all' || name === 'done') return;
                return (
                    <option key={id} value={id}>{name}</option>
                )
            })
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="name" >What is to be done:</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    id="name"
                    placeholder="Topic"
                    value={todoTitle}
                onChange={e => setTodoTitle(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="text">Description of todo:</label>
                <textarea
                    required
                    name="text" 
                    id="text"
                    placeholder="Some details"
                    style={{"height": '130px'}}
                    value={todoDescr}
                    onChange={e => setTodoDescr(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="element">What kind of todo:</label>
                <select 
                    required
                    id="type"
                    name="type"
                    value={todoType}
                    onChange={e => setTodoType(e.target.value)}>
                    <option >Choose option...</option>
                    {renderFilters(filters, filtersLoadingStatus)}

                </select>
            </div>

            <button type="submit" className='btn'>Add todo</button>
        </form>
    )
}

export default TodosAddForm;