<h1 align="center" style="width:100%">🔥 {JsnView} 🔥</h1>
<h3 align="center" style="margin:0">🏅 Ultra Fast and lightweight</h3>
<h3 align="center" style="margin-top:0">Json Viewer ~3KB with 0 dependencies</h3>

<div align="center" style="width:100%">
  <img src="https://badgen.net/bundlephobia/min/jsnview" alt="json viewer" />
  <img src="https://badgen.net/bundlephobia/dependency-count/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/v/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/dt/jsnview" alt="json viewer" />
</div>

### Demos  
[Demo Netlify](https://json-v.netlify.app/public/)  
[Demo JSBin UMD](https://jsbin.com/bovizupahi/1/edit)  
[Demo Codesandbox ESM](https://codesandbox.io/s/serverless-sound-igd1h)

```js
$ npm i jsnview
// or
$ yarn add jsnview
```

## Usage
```js
import jsnview from 'jsnview';
```

Or include it via jsDelivr CDN (UMD):
```html
<script src="https://cdn.jsdelivr.net/npm/jsnview@1.0.2/build/index.min.js"></script>
<!-- Access via global object : window.jsnview -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsnview@1.0.2/build/index.css" />
```

### Methods
- **jsnview(jsonData:Object, options: Object): [HTMLElement]**
```js
let jsonData = {name:'Mike', age: 22 };
jsnview(jsonData, { displayItemsLen:true , displayTypes:true });
//-> displayItemsLen: display Object or Array length
//-> displayTypes : display data type of each value
```

### Notes
- All pull requests are welcome, feel free.

### Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT