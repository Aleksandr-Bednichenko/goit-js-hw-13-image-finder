import { alert, defaultModules, error } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

import getRefs from './js/getRefs.js';
import API from './js/fetchCountries.js'
import listTemplate from './template/countryList.hbs'
import listItemTemplate from './template/countryListItem.hbs';
import debounce from 'lodash.debounce';
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';



defaultModules.set(PNotifyMobile, {});


const refs = getRefs();

refs.input.addEventListener('input',  debounce(e => {
    onSearch(e);
  }, 500),);

function onSearch(e) {
  e.preventDefault();
  onClear(); 
  const searchQuery = e.target.value ;
  if (!searchQuery) {
  API.fetchCountries(searchQuery)
  .then(data => {    
    if (!data) {
      return;
    } else if (data.length > 10) {
      error({
        text: 'To many matches found. Please enter a more specific query'
      });   
    } else if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data);
    } else if (data.length === 1) {
        renderCountryListItem(data);
    }
  })
  .catch(onFetchError); 
  
}}
  

 function renderCountryList(list){
   const markUp = listTemplate(list)
   refs.countryInfo.innerHTML = markUp;
}

 function renderCountryListItem(item){
    const itemUp = listItemTemplate(item);
    refs.countryInfo.innerHTML = itemUp;
}

function onFetchError(){
alert ('Введите коректные данные');
}
 function onClear () {
  refs.countryInfo.innerHTML = ' ';
 }
