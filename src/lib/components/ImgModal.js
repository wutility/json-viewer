import React from 'react';
import './ImgModal.css'

export default function ImgModal ({ children, imgSrc, caption, alt, isOpen, onClose }) {

  return (
    <div className="image-modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <span className="close" onClick={onClose}>&times;</span>
      <div className="img-container">
        {imgSrc && <div>
          <img className="image-modal-content" alt={alt} src={imgSrc} />
          <p className="caption">{isOpen ? caption : ''}</p>
        </div>}

        <div>{children}</div>
      </div>
    </div>
  );
}
