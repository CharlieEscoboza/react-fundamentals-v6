import { Link } from 'react-router-dom';

const Pet = ({ data = {} }) => {
  const {
    id = null,
    name = '',
    animal = '',
    breed = '',
    city = '',
    state = ''
  } = data;
  let {
    images: hero = []
  } = data;

  if (!hero.length) {
    hero = ['http://pets-images.dev-apis.com/pets/none.jpg'];
  }

  const location = `${city}, ${state}`;


  return (
    <Link to={`/details/${id}`}>
      <img src={hero[0]} alt={`${breed} ${animal} called: ${name}`} />
      <h1>{name}</h1>
      <h2>{`${animal} - ${breed} - ${location}`}</h2>
    </Link>
  );
}

export default Pet;
