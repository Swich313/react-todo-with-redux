import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

import './languageSwich.scss';

const LanguageSwitch = () => {
    const defaultLanguage = [{
        code: 'en',
        name: 'English',
        country: 'United_Kingdom'
    }]
    const languages = [
        {
            code: 'ua',
            name: 'Українська',
            country: 'Ukraine'
        },
        {
            code: 'ua',
            name: 'Русский',
            country: 'Russia'
        },
        {
            code: 'de',
            name: 'Deutsch',
            country: 'Germany'
        },
        {
            code: 'fr',
            name: 'Français',
            country: 'France'
        },
        {
            code: 'it',
            name: 'Italiano',
            country: 'Italy'
        }
    ];
    const {t} = useTranslation();
    const currentLanguageCode =  document.cookie.split('=') || 'en';
    const currentLanguage = languages.find(item => item.code === currentLanguageCode);



    useEffect(
        () => { document.title = t('app_title')
        }, [t]);


    const renderLanguages = arr => {
        return arr.map(({code, name, country}, i) => {
            let langClass = (name === "English") ? "current_lang" : "selecting_lang";
            const activeLangClass = (code === currentLanguageCode) ? "active" : null;
            langClass = (country !== 'Russia') ? langClass : `${langClass} invalidLanguage`
               return (<div
                    key={i.toString()}
                    className={langClass}
                    onClick={() => i18next.changeLanguage(code)}
               >
                   <img src={`https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_${country}.png`}
                         className="lang_flag" alt={`flag of ${country}`}/>
                    <p className="lang_text">{name}</p>
               </div>)
        })
    };

    return (
        <div className="switch_lang">
            {renderLanguages(defaultLanguage)}
            <div className="lang_dropdown">
                {renderLanguages(languages)}
            </div>
        </div>
)
}

export default LanguageSwitch;