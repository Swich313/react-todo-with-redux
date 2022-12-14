import {useState} from "react";
import {handleDate} from "../todoCalendar/TodoCalendar";

import './todosListItem.scss';
import {useTranslation} from "react-i18next";

const TodosListItem = (props) => {
    const {
        title,
        description,
        type,
        deadline,
        id,
        completed,
        archived,
        onDeleteTodo,
        onArchiveTodo,
        onCompleteTodo
    } = props;
    let typeClassName;
    const [visibility, setVisibility] = useState(null);
    const currentDateString = handleDate(new Date());
    const {t} = useTranslation();


    switch (type) {
        case 'home':
            typeClassName = `bg__${type}`;
            break;
        case 'work':
            typeClassName = `bg__${type}`;
            break;
        case 'hobby':
            typeClassName = `bg__${type}`;
            break;
        case 'other':
            typeClassName = `bg__${type}`;
            break;
        default:
            typeClassName = 'bg__default';
    }


            return (
                <li
                    className={`todo_item ${typeClassName}`}>
                    <div className="todo_item__checkbox-rect">
                        <input type="checkbox" id={id} name="check" checked={completed} onChange={onCompleteTodo}/>
                        <label htmlFor={id} className={completed ? 'crossed' : null}>{title}</label>
                    </div>
                    <div className={`todo_item__text ${completed ? 'crossed' : null}`}>
                        {description}
                        <p className={
                            deadline ? null : 'time_hide'
                        }> {t('deadline_text')} {Date.parse(deadline) > Date.parse(new Date()) ? `${deadline}` : deadline === currentDateString ? `${deadline} ${t('deadline_today')}`: `${deadline} ${t('deadline_outdated')}`}</p>
                    </div>
                    <button type="button" className="close_btn" aria-label="Close" onClick={() => {
                        if (completed && !archived) {
                            onArchiveTodo();
                        } else if (completed && archived) {
                            onDeleteTodo();
                        }
                        setVisibility('visible');
                        // const timer = setTimeout(()=> {
                        //     setVisibility(null);}, 5000);
                        // clearTimeout(timer);
                        const timer = null;
                        timer ? clearTimeout(timer) : setTimeout(() => {
                            setVisibility(null)
                        }, 5000);
                    }}>x
                        <span className={`close_btn__tooltip ${visibility}`}>{t('tooltip')}</span>
                    </button>
                </li>
            )
}

export default TodosListItem;