// please refer the page here: https://www.freecodecamp.org/news/how-to-add-localization-to-your-react-app/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import {languageToggle} from '../controller/languageToggle';
// import {ajaxFunction} from '../controller/ajaxFunction';
// import env from "react-dotenv";
// import axios from 'axios';

// check the cache, if cache dont have language. it will get the local json file instead.
function checkLang(language){
    // if(localStorage.getItem('lang_'+language)){
    //     return JSON.parse(localStorage.getItem('lang_'+language));
    // }

    return require('./locales/'+language+'/translations.json');
}

// get language list (ch, en, and etc.)
// function getLangList(){
//     const urlGetLngList = env.API_HOST + ':' + env.API_PORT + env.API_LANGUAGES_TYPE;

//     ajaxFunction(urlGetLngList, {}).then(result => {
//         if(result.Success !== undefined && result.Success){
//             for(var i in result.Data){
//                 languageToggle(false, result.Data[i].code);
//             }
//         }
//     });
// }
// getLangList();

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translations: checkLang('en')
        },
        // zh_hans: {
        //     translations: checkLang('zh_hans')
        // }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'zh_hans'];

export default i18n;