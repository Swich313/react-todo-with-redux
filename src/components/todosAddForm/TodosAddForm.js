import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {todoCreated, setTodoDeadline} from "../todosList/todosSlice";
import {useTranslation} from "react-i18next";
import 'dotenv/config';

import "./todosAddForm.scss"

const TodosAddForm = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescr, setTodoDescr] = useState('');
    const [todoType, setTodoType] = useState('');

    const {t} = useTranslation();
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
            return <option>{t('loading_message')}</option>
        } else if (status === 'error'){
            return <option>Downloading Error</option>
        }
        if (filters && filters.length > 0) {
            return filters.map(({id, name}) => {
                if (name === 'all' || name === 'done') return;
                return (
                    <option key={id} value={id}>{t(`filter_${name}`)}</option>
                )
            })
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="name" >{t('addForm_title')}</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    id="name"
                    onInvalid={e => e.target.setCustomValidity(t('addForm_title_invalid'))}
                    onInput={e => e.target.setCustomValidity('')}
                    placeholder={t('addForm_title_placeholder')}
                    value={todoTitle}
                onChange={e => setTodoTitle(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="text">{t('addForm_description')}</label>
                <textarea
                    required
                    name="text" 
                    id="text"
                    onInvalid={e => e.target.setCustomValidity(t('addForm_description_invalid'))}
                    onInput={e => e.target.setCustomValidity('')}
                    placeholder={t('addForm_description_placeholder')}
                    style={{"height": '130px'}}
                    value={todoDescr}
                    onChange={e => setTodoDescr(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="element">{t('addFrom_type')}</label>
                <select 
                    required
                    id="type"
                    name="type"
                    value={todoType}
                    onChange={e => setTodoType(e.target.value)}>
                    <option >{t('addForm_type_default')}</option>
                    {renderFilters(filters, filtersLoadingStatus)}

                </select>
            </div>

            <button type="submit" className='btn'>{t('addForm_button')}</button>
        </form>
    )
}

export default TodosAddForm;