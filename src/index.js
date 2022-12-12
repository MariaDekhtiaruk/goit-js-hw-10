import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchRef = document.querySelector(`#search-box`);
const wrapper = document.querySelector(`.country-info`);

searchRef.addEventListener('input', e => {
  const countryName = e.target.value;
  if (countryName.length > 0) {
    fetchCountries(countryName).then(data => {
      console.log(data);
      wrapper.innerHTML = createCountryElements(data);
    });
  } else {
    wrapper.innerHTML = '';
  }
});
function createCountryElements(countryArray = []) {
  console.log(countryArray.length);
  if (countryArray.length === 1) {
    return countryArray
      .map(({ name, capital, population, flags, languages }) => {
        return `<div class="country">
        <img src="${flags.svg}" alt="${name.official}" loading="lazy">
    <h2>${name.official}</h2>
    <h2> Capital: ${capital[0]}</h2>
    <h2> Population:${population}</h2>
    
   <h2> Languages: ${Object.values(languages).join(', ')}</h2>
  </div>`;
      })
      .join('');
  } else if (countryArray.length === 0) {
    return '';
  } else if (countryArray.length > 10) {
    alert('Too many matches found. Please enter a more specific name.');
    return '';
  } else {
    return countryArray
      .map(({ name }) => {
        return `<h2>${name.official}</h2>`;
      })
      .join('');
  }
}
