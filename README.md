## 📋 ImgModal 

![bundlephobia badge](https://badgen.net/bundlephobia/min/react-img-modal) ![bundlephobia badge](https://badgen.net/bundlephobia/minzip/react-img-modal)

[![ImgModal](https://i.ibb.co/MfNXqWk/modal.png "ImgModal")](https://i.ibb.co/MfNXqWk/modal.png)

```
npm i react-img-modal
```

### Usage
```js
import ImgModal from "react-img-modal";
```

### Examples
```js
import React, { useState } from 'react';
import { render } from "react-dom";
import './index.css'
import ImgModal from 'react-img-modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="container-fluid">

      <div className="img-hover-zoom">
        <img src="https://i.ibb.co/nQYZpsq/npm.png"
          alt="smooth"
          onClick={closeModal}
        />
      </div>

      <ImgModal
        imgSrc="https://i.ibb.co/nQYZpsq/npm.png"
        alt={'anything'}
        caption="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        isModalOpen={isModalOpen}
        closeModalImg={closeModal}        
      />

    </div>
  );
}
```

### License
MIT