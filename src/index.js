import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchRef = document.querySelector(`#search-box`);
const wrapper = document.querySelector(`.country-info`);

searchRef.addEventListener('input', debounce(inputCountryName, 300));
function inputCountryName(e) {
  const countryName = e.target.value.trim();
  if (countryName.length > 0) {
    fetchCountries(countryName).then(data => {
      console.log(data);
      wrapper.innerHTML = createCountryElements(data);
    });
  } else {
    wrapper.innerHTML = '';
  }
}
function createCountryElements(countryArray = []) {
  console.log(countryArray.length);
  if (countryArray.length === 1) {
    return countryArray
      .map(({ name, capital, population, flags, languages }) => {
        return `<div class="country">
        <div class="country-flag">
        <img class="flag-img" src="${flags.svg}" alt="${
          name.official
        } "width="20" height="20" loading="lazy">
        <h2 class="name">${name.official}</h2>
        </div>
    <h2 class="value"> Capital: ${capital[0]}</h2>
    <h2 class="value"> Population: ${population}</h2>
    
   <h2 class="value"> Languages: ${Object.values(languages).join(', ')}</h2>
  </div>`;
      })
      .join('');
  } else if (countryArray.length === 0) {
    return '';
  } else if (countryArray.length > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
    return '';
  } else {
    return countryArray
      .map(({ name, flags }) => {
        return `<div class="country-flag">
        <img class="flag-img" src="${flags.svg}" alt="${name.official} "width="20" height="20" loading="lazy">
        <h2 class="value">${name.official}</h2>
        </div>`;
      })
      .join('');
  }
}
