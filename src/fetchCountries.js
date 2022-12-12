export const fetchCountries = name => {
  const urlAPI = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(urlAPI)
    .then(data => {
      console.log(data);
      const status = data.status;

      if (status !== 200) {
        throw new Error(data);
      }

      return data.json();
    })
    .catch(error => {
      console.log(`Put correct country`);
    });
};
