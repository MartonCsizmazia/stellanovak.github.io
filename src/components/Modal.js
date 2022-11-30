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
      <div className="flags">
        <div id="flag" onClick={chooseHun}><img id="flag-picture" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="" ></img></div>
        <div id="flag" onClick={chooseEng}><img id="flag-picture" src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt=""></img></div>
      </div>
    </div>
  )
}

export default Modal;
