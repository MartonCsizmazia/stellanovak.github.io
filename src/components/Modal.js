const Modal = (props) => {

  function chooseHun(){
    localStorage.setItem("language", "hungarian");
    props.onChoose();
  }

  function chooseEng(){
    localStorage.setItem("language", "english");
    props.onChoose();
  }

  return (
    <div className="modal" style={ModalStyles.modal}>
      <p>Choose your language: </p>
      <div className="flags" style={ModalStyles.flags}>
        <div id="flag" onClick={chooseHun}><img id="flagpicture" style={ModalStyles.flagpicture} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="" ></img></div>
        <div id="flag" onClick={chooseEng}><img id="flagpicture" style={ModalStyles.flagpicture} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt=""></img></div>
      </div>
    </div>
  )
}

const ModalStyles = {
  btn: {
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#800040",
    padding: "0.5rem 1.5rem",
    color: "white",
    border: "1px solid #800040",
    margin: "0 1rem",
  },

  flags:{
    display: "flex",
    justifyContent: "space-between",
    margin: "0 2.5rem 0 2.5rem"
  },

  flagpicture: {
    width: "6rem",
    height: "3rem",
    cursor: "pointer",
  },

  modal: {
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    backgroundColor: "grey",
    padding: "1rem",
    textAlign: "center",
    width: "20rem",
    zIndex: "10",
    position: "fixed",
    top: "20vh",
    left: "calc(50% - 10rem)",
    transition: "1s",
  },

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

export default Modal;
