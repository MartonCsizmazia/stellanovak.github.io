const Backdrop = (props) => {
  return <div className="backdrop" style={BackdropStyles.backdrop}/>;
}

const BackdropStyles = {
  backdrop: {
    position: "fixed",
    zIndex: "1",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    width: "100%",
    height: "100vh",
    top: "0",
    left: "0",
    transition: "1s",
  },
}

export default Backdrop;
