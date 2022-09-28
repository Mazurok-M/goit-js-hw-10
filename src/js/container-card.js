export function createCountriesCardInfo(info) {
  return info
    .map(({ capital, population, languages }) => {
      return `
        <p class="country-text"> <span class="text-container">Capital:</span> ${capital}</p>
        <p class="country-text"> <span class="text-container">Population:</span> ${population}</p>
        <p class="country-text"> <span class="text-container">Languages:</span>  ${Object.values(
          languages
        ).join(', ')} </p>
          `;
    })
    .join('');
}

export function createCountriesCardFlag(flag) {
  return flag
    .map(({ flags, name }) => {
      return `
        <li class="country-item">
           <img  src="${flags.svg}"
           alt="${name.official}" width= "80"/>
          <p>${name.official}</p> 
        </li>
        `;
    })
    .join('');
}
