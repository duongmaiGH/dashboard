const style = () => ({
    root: {
        width: 700,
        height: 500,
        position: 'absolute',
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: 'white'
    },
    containerall: {
        "padding": "10px 25px"
    },
    header: {
        "fontSize": "25px",
        "fontWeight": "500"
    },
    header1: {
        "fontSize": "15px",
        "color": "grey"
    },
    headerbot: {
        marginBottom: 40
    },
    header2: {
        "fontSize": "25px",
        "fontWeight": "500",
        "fontFamily": "system-ui"
    },
    input: {
        "& label.Mui-focused": {
            color: "blue"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "blue"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
            },
            "&:hover fieldset": {
                borderColor: "white"
            },
            "&.Mui-focused fieldset": {
                borderColor: "blue"
            }
        }
    },
    photo: { "width": "130px", "height": "130px", "backgroundColor": "green", "borderRadius": "90px", "textAlign": "center", "fontWeight": "500", "fontSize": "51px", "lineHeight": "130px", margin: "auto" }
})
export default style;