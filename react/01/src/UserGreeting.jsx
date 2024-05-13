function UserGreeting(props) {
    const logged = <h2>Welcome {props.username}</h2>;

    const nonLogged = <h2>Meu pau no seu ouvido</h2>;

    return props.isLoggedIn ? logged : nonLogged;
}

export default UserGreeting;
