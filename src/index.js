import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import './css/styles.css';
import {
  createCountriesCardInfo,
  createCountriesCardFlag,
} from './js/container-card';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  cardContainerNameCoutries: document.querySelector('.country-list'),
  cardContainerInfoCoutries: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onInputChangeCountries, DEBOUNCE_DELAY)
);

function onInputChangeCountries(event) {
  const searchQuery = event.target.value.trim();

  if (searchQuery === '') {
    clearContainerCard();
    return;
  }

  fetchCountries(searchQuery)
    .then(renderCounrtiesCard)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCounrtiesCard(countri) {
  if (countri.length <= 10) {
    const markupName = createCountriesCardFlag(countri);
    refs.cardContainerNameCoutries.innerHTML = markupName;
    refs.cardContainerInfoCoutries.innerHTML = '';
  }

  if (countri.length === 1) {
    const markupInfo = createCountriesCardInfo(countri);
    refs.cardContainerInfoCoutries.innerHTML = markupInfo;
  }

  if (countri.length >= 10) {
    refs.cardContainerNameCoutries.innerHTML = '';
    refs.cardContainerInfoCoutries.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function clearContainerCard() {
  refs.cardContainerNameCoutries.innerHTML = '';
  refs.cardContainerInfoCoutries.innerHTML = '';
}
