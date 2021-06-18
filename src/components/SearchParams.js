import { useState, useEffect, useContext } from 'react';
import useBreedList from '../useBreedList';
import ItemsList from './ItemsList';
import ThemeContext from './ThemeContext';

const ANIMALS = new Set(['bird', 'cat', 'dog', 'rabbit', 'reptile']);
const THEMES = new Set(['darkblue', 'red', 'green', 'orange', 'cyan']);

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext)

  const [pets, setPets] = useState([]);

  const updateAnimal = (evt) => setAnimal(evt.target.value);
  const updateBreed = (evt) => setBreed(evt.target.value);

  async function requestPets() {
    const resp = await (await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)).json();

    setPets(resp.pets);
  }

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-params">
      <form onSubmit={evt => {
        evt.preventDefault();

        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input type="text" value={location} placeholder="Location" onChange={(evt) => setLocation(evt.target.value)} />
        </label>
        <label htmlFor="animal">
          Animal
          <select name="animal" id="animal" value={animal} onChange={updateAnimal} onBlur={updateAnimal}>
            <option />
            {[...ANIMALS].map((animal) => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" value={breed} onChange={updateBreed} onBlur={updateBreed}>
            <option />
            {[...breeds].map((breed) => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select name="theme" id="theme" value={theme} onChange={(evt) => setTheme(evt.target.value)} onBlur={(evt) => setTheme(evt.target.value)}>
            <option />
            {[...THEMES].map((theme) => <option key={theme} value={theme}>{theme}</option>)}
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <ItemsList items={pets} component="Pet" />
    </div>
  );
}

export default SearchParams;
