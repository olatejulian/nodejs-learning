function Card() {
    return (
        <div className="card">
            <img
                className="card-image"
                src="https://cdn-icons-png.flaticon.com/256/1144/1144760.png"
                alt="profile"
            ></img>
            <h2 className="card-title">Username</h2>
            <p className="card-text">User description</p>
        </div>
    );
}

export default Card;
