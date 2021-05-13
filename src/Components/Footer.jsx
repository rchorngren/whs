const Footer = () => {

    const style = {
        footer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            height: 95,
            width: "100%",
            borderTop: "1px solid black",
            background: "#C4C4C4"
        },
        shoppingcartButton: {
            marginRight: 25,
            background: "yellow"
        },
        buttonGeneral: {
            width: 60,
            height: 60,
            borderRadius: 15,
            border: "1px solid black"
        }
    }

    return (
        <footer style={style.footer}>
            <div style={{...style.shoppingcartButton, ...style.buttonGeneral}}></div>
        </footer>
    )
}

export default Footer;