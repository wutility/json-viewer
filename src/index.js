import React, { useState } from 'react';
import { render } from "react-dom";
import './index.css'
import ImgModal from './lib';

const images = [
  "https://i.ibb.co/nQYZpsq/npm.png",
  "https://i.ibb.co/dLyp8k7/1662-original.jpg",
  "https://i.ibb.co/qx6BgJJ/codesignal-featured-logo.jpg"
]

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImgSrc, setcurrentImgSrc] = useState('')
  const [inc, setInc] = useState(0)

  const closeModal = (e, data) => {
    setcurrentImgSrc(data)
    setIsModalOpen(!isModalOpen)
  }

  const prevImg = () => {
    if (inc > 0) {
      setInc(inc - 1)
      setcurrentImgSrc(images[inc])
    }
    else {
      setInc(images.length - 1)
    }
  }

  const nextImg = () => {
    if (inc < images.length) {
      setInc(inc + 1)
      setcurrentImgSrc(images[inc])
    } else {
      setInc(0)
    }
  }

  return (
    <div className="container-fluid">

      <div className="images-container">
        {images.map((m) => {
          return (
            <div className="img-hover-zoom" key={m}>
              <img src={m} alt="smooth" onClick={(e, src) => { closeModal(e, m) }} />
            </div>
          )
        })}
      </div>

      <ImgModal
        imgSrc={currentImgSrc}
        alt={'anything'}
        caption="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <button onClick={prevImg}>prev</button>
        <button onClick={nextImg}>next</button>
      </ImgModal>

    </div>

  );
}

render(<App />, document.getElementById("root"));
