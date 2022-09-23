import TodosList from '../todosList/TodosList';
import TodosAddForm from '../todosAddForm/TodosAddForm';
import TodosFilters from '../todosFilters/TodosFilters';
import TodoCalendar from "../todoCalendar/TodoCalendar";
import LanguageSwitch from "../languageSwitch/LanguageSwich";
import { useTranslation } from "react-i18next";

import './app.scss';







const App = () => {

     // const [filteredTodos, setFilteredTodos] = useState(null);
     //
     // const updateData = (value) => {
     //     setFilteredTodos(value);
     // }
    const { t } = useTranslation();

    console.log(t('welcome_to_react'))


    return (
        <main className="app">
            <h2>{t('welcome_to_react')}</h2>
            <div className="content">
                {/*<TodosList updateData={updateData}/>*/}
                <TodosList />
                <div className="content__interactive">
                    <LanguageSwitch />
                    <TodosAddForm />
                    {/*<TodosFilters filteredTodos={filteredTodos}/>*/}
                    <TodosFilters />
                    <TodoCalendar />
                </div>
            </div>
        </main>
    )
}

export default App;