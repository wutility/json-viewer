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

  const closeModal = (e, data) => {
    setcurrentImgSrc(data) 
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="container-fluid">

      <div className="images-container">

        {images.map((m) => {
          return (
            <div className="img-hover-zoom" key={m}>
              <img src={m}
                alt="smooth"
                onClick={(e, src) => { closeModal(e, m) }}
              />
            </div>
          )
        })}

      </div>

      <ImgModal
        imgSrc={currentImgSrc}
        alt={'anything'}
        caption="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        isModalOpen={isModalOpen}
        closeModalImg={closeModal}
      />

    </div>

  );
}

render(<App />, document.getElementById("root"));
