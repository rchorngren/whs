const Header = () => {

    const style = {
        header: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 95,
            borderBottom: "1px solid black",
            background: "#C4C4C4"
        },
        menuButton: {
            marginLeft: 25,
            background: "red"
        },
        profileButton: {
            marginRight: 25,
            background: "blue"
        },
        buttonGeneral: {
            width: 60,
            height: 60,
            borderRadius: 15,
            border: "1px solid black"
        }
    }


    return (
        <header style={style.header}>
            <div style={{...style.menuButton, ...style.buttonGeneral}}></div>
            <h2>WHS</h2>
            <div style={{...style.profileButton, ...style.buttonGeneral}}></div>
        </header>
    )
}

export default Header;