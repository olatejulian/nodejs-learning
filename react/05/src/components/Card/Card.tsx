import style from './Card.module.css'

type CardProps = {
    image: any
}

function Card(props: Readonly<CardProps>) {
    return (
        <div className={style.card}>
            <img className="card-image" src={props.image} alt="Error"></img>
        </div>
    )
}

export default Card
