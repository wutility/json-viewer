## 📋 ImgModal   
A lightweight React component modal image.  

[Demo](https://react-img-modal.onrender.com)

![bundlephobia badge](https://badgen.net/npm/v/react-img-modal) ![bundlephobia badge](https://badgen.net/bundlephobia/min/react-img-modal) ![bundlephobia badge](https://badgen.net/bundlephobia/minzip/react-img-modal)

```
npm i react-img-modal
```

### Usage
```js
import ImgModal from "react-img-modal";
import '../node_modules/react-img-modal/build/index.css'; // required

<ImgModal
  imgSrc="https://i.ibb.co/nQYZpsq/npm.png"
  alt='anything'
  caption="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  isOpen={true|false}
  onClose={function}        
/>
```

### Example 1:
```js
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className="img-hover-zoom">
        <img src="https://i.ibb.co/nQYZpsq/npm.png" alt="smooth" onClick={closeModal} />
      </div>

      <ImgModal
        imgSrc="https://i.ibb.co/nQYZpsq/npm.png"
        alt='anything'
        caption="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        isOpen={isModalOpen}
        onClose={closeModal}        
      />
    </>
  );
}
```

### Example 2:  
you can pass image element or any element as children
```js
<ImgModal        
  isOpen={isModalOpen}
  onClose={closeModal}
  >
  <img src="https://i.ibb.co/nQYZpsq/npm.png" alt="hh" width="300" />
</ImgModal>
```

### License
MIT