import Components from './index';


const ItemsList = ({ items = [], component = '' }) => {
  const Component = Components[component];

  if (!Component) {
    return (
      <div>Component not found</div>
    );
  }

  return (
    <div>
      {!items.length ? (
        <div>No items found for this list</div>
      ) : items.map(item => (
        <Component key={item.id} data={item}></Component>
      ))}
    </div>
  );
}

export default ItemsList;
