import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {v4 as uuidv4} from 'uuid';
import {todoCreated} from "../todosList/todosSlice";

import "./todosAddForm.scss"

const TodosAddForm = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescr, setTodoDescr] = useState('');
    const [todoType, setTodoType] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newTodo ={
            id: uuidv4(),
            title: todoTitle,
            description: todoDescr,
            type: todoType,
            completed: false
        }

        request("http://localhost:3001/todos", "POST", JSON.stringify(newTodo))
            .then(res => console.log(res, 'successful posting'))
            .then(dispatch(todoCreated(newTodo)))
            .catch(err => console.log(err));

        setTodoTitle('');
        setTodoDescr('');
        setTodoType('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading'){
            return <option>Loading...</option>
        } else if (status === 'error'){
            return <option>Downloading Error</option>
        }
        if (filters && filters.length > 0) {
            return filters.map(({id, name}) => {
                if (name === 'all') return;
                return <option key={id} value={id}>{name}</option>
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