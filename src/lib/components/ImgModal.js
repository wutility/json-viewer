import React, { useEffect } from 'react';
import './ImgModal.css'

export default function ImgModal ({ children, imgSrc, caption, alt, isOpen, onClose }) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <div className="img-modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <span className="close" onClick={onClose}>&times;</span>
      <div className="img-modal-body">
        {imgSrc
          && <div className="img-container">
            <img alt={alt} src={imgSrc} />
            <p className="caption">{isOpen ? caption : ''}</p>
          </div>}

        <div className="img-modal-children">{children}</div>
      </div>
    </div>
  );
}
