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
    <div className="modal">
      <p>Choose your language: </p>
      <button className="btn btn--alt" onClick={chooseHun}>Magyar</button>
      <button className="btn" onClick={chooseEng}>English</button>
    </div>
  )
}

export default Modal;
