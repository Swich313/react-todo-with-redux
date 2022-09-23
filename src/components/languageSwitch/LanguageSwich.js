import './languageSwich.scss';

const LanguageSwitch = () => {
return (
        <div className="switch_lang">
            <div className="current_lang">
                <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png" className="lang_flag" alt="" />
                <p className="lang_text">English</p>
            </div>
            <div className="lang_dropdown">
                <div className="selecting_lang">
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Ukraine.png" alt className="lang_flag"/>
                    <p className="lang_text">Українська</p>
                </div>
                <div className="selecting_lang">
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Russia.png" alt className="lang_flag"/>
                    <p className="lang_text">Русский</p>
                </div>
                <div className="selecting_lang">
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Germany.png" alt className="lang_flag"/>
                    <p className="lang_text">Deutsch</p>
                </div>
                <div className="selecting_lang">
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_France.png" alt className="lang_flag"/>
                    <p className="lang_text">Français</p>
                </div>
                <div className="selecting_lang">
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Italy.png" alt className="lang_flag"/>
                    <p className="lang_text">Italiano</p>
                </div>
            </div>
        </div>
)
}

export default LanguageSwitch;