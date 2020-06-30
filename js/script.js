const characterData = {
  charactersCatalog: document.querySelector(".characters__catalog"),
  characterArray: [],
  homeworldArray: [],

  getCharacters(url = "https://swapi.dev/api/people/") {
    return axios.get(url);
  },

  storeData({ data }) {
    console.log(data);

    for (let obj of data.results) {
      characterArray.push(obj);
      const DATA = JSON.stringify(characterArray);
      localStorage.setItem("characters", DATA);
    }

    for (let { homeworld } of data.results) {
      const api = axios.get(homeworld);
      api.then(({ data }) => {
        homeworldArray.push(data);
        const DATA = JSON.stringify(homeworldArray);
        localStorage.setItem("homeworlds", DATA);
      });
    }

    return Promise.resolve(data.next);
  },
};

const {
  charactersCatalog,
  characterArray,
  homeworldArray,
  getCharacters,
  storeData,
} = characterData;

getCharacters()
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData)
  .then(getCharacters)
  .then(storeData);

const GET_CHARACTERS = localStorage.getItem("characters");
const CHARACTER_DATA = JSON.parse(GET_CHARACTERS);

CHARACTER_DATA.map((info) => {
  const div = document.createElement("div");
  div.className = "characters__catalog__magic-card";
  const CHARACTER_CARD = `
    <h2>${info.name}</h2>
    <ul>
      <li><span>Birth year: </span> <span>${info.birth_year}</span></li>
      <li><span>Eye color: </span> <span>${info.eye_color}</span></li>
      <li><span>Gender: </span> <span>${info.gender}</span></li>
      <li><span>Hair color: </span> <span>${info.hair_color}</span></li>
      <li><span>Height: </span> <span>${info.height}</span></li>
      <li><span>Mass: </span> <span>${info.mass}</span></li>
      <li><span>Skin color: </span> <span>${info.skin_color}</span></li>
      <li><span>Homeworld: </span> <span>${info.homeworld}</span></li>
      <li><span>Films: </span> <span>${info.films}</span></li>
    </ul>
  `;
  div.innerHTML = CHARACTER_CARD;
  charactersCatalog.append(div);
});
