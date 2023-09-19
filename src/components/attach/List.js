function ListItem(props) {
  return <div className="list-item">{props.children}</div>;
}

function List(props) {
  return <div className="list">{props.children}</div>;
}

export { List, ListItem };
