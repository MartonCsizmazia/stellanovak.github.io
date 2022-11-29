import './App.css';
import Segment from './components/Segment';
import Modal from './components/Modal.js';
import Backdrop from './components/Backdrop';
import {useState} from 'react';

function App() {
  //const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [ModalIsOpen, setModalIsOpen] = useState((localStorage.getItem("language") == null) ? true : false);

  const closeModalHandler = () => {
    setModalIsOpen(false)
  }

  return (
    <div className='main-page'>
      { ModalIsOpen ? <Modal onChoose={closeModalHandler}/> : null}
      { ModalIsOpen ? <Backdrop /> : null}

      <h1>HI</h1>
      <Segment url={"https://www.w3schools.com/html/pic_trulli.jpg"}/>
      <Segment url={"https://images.unsplash.com/photo-1508004526072-3be43a5005f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpY3R1cmV8ZW58MHx8MHx8&w=1000&q=80"}/>
      <Segment url={"https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000"}/>
      <Segment url={"https://i.guim.co.uk/img/media/63de40b99577af9b867a9c57555a432632ba760b/0_266_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=93458bbe24b9f88451ea08197888ab8e"}/>
      <Segment url={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/pillars-of-creation-visible-and-ir-weston-westmoreland.jpg"}/>
    </div>
  );
}

export default App;
