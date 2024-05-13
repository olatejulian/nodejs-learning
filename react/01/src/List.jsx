function List(props) {
    const category = props.category
    const items = props.items

    const itemList = items.map((item => <li key={item.id}>{item.name}: &nbsp; {item.calories}</li>));

    return (
        <>
            <h3>{category}</h3>
            <ol>{itemList}</ol>
        </>
    )
}

export default List;
