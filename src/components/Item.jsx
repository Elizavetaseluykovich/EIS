function Item({data}) {
    return <div>
        <h2>{data.code}</h2>
        <h3>{data.name}</h3>
        <h3>{data.currency}</h3>
        <h3>{data.continent}</h3>
        <h3>{data.capital}</h3>
    </div>
}

export default Item;