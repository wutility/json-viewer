<p align="center">
<img src="https://i.ibb.co/0BYbk6V/jsnview.png" alt="json viewer"/>
</p>

<hr />

<div align="center" style="width:100%; text-align:center;">
  <img src="https://badgen.net/bundlephobia/min/jsnview" alt="json viewer" />
  <img src="https://badgen.net/bundlephobia/dependency-count/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/v/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/dt/jsnview" alt="json viewer" />
  <img src="https://data.jsdelivr.com/v1/package/npm/jsnview/badge" alt="json viewer"/>
</div>

### Demos  
[PLayground Netlify](https://json-v.netlify.app/public/)     
[Demo React Codesandbox](https://codesandbox.io/s/winter-firefly-xb5jj)
```html
$ npm i jsnview
// or
$ yarn add jsnview
```

## Usage
```js
import jsnview from 'jsnview';
import 'jsnview/build/index.css';
```

Or include it via jsDelivr CDN (UMD):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsnview@2.0.0/build/index.css" />
<script src="https://cdn.jsdelivr.net/npm/jsnview@2.0.0/build/index.min.js"></script>
<!-- Access via global object : window.jsnview -->
```

### Methods && Examples
- **jsnview(data: Object, options: Object): [HTMLElement]**  
```js
// Default object options (optional)
const options = {
  showLen: false,
  showType: false,
  colors: { boolean: '#ff2929', null: '#ff2929', string: '#690', number: '#905', float: '#002f99' }
}

let data = { name: 'Mike', age: 22 }; 
const treeView = jsnview(data, options); // returns HTMLElement
document.body.appendChild(treeView);
```

### Notes
- All pull requests are welcome, feel free.

### Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
Apache License 2.0