import React from 'react';
import './ImgModal.css'

export default function ImgModal ({ imgSrc, caption, alt, isModalOpen, closeModalImg }) {

  return (
    <div className="image-modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <span className="close" onClick={closeModalImg}>&times;</span>
      <div className="img-container">
        <div>
          <img className="image-modal-content" alt={alt} src={imgSrc} />
          <p className="caption">{isModalOpen ? caption : ''}</p>
        </div>
      </div>
    </div>
  );
}
