import Calendar from "react-calendar";
import {useState} from "react";
import {setTodoDeadline} from "../todosList/todosSlice";

import 'react-calendar/dist/Calendar.css';
import {useDispatch} from "react-redux";

const TodoCalendar = () => {

    const [date, setDate] = useState(new Date());
    const dispatch= useDispatch();



    const onChange = date => {

        dispatch(setTodoDeadline(handleDate(date)));
        setDate(date);

    };

    return (
        <Calendar
            onChange={onChange}
            value={date}
            showWeekNumbers
            locale='en-EN'/>
    )
}

const handleDate = date => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months.at(date.getMonth())} ${date.getFullYear()}`;
}

export default TodoCalendar;
export {handleDate};