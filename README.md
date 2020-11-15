# Jsnview: Ultra Fast and lightweight Json Viewer ~3KB (0 dependencies)

[Demo](https://json-v.netlify.app/public/)  
[Demo JSBin UMD](https://jsbin.com/bovizupahi/1/edit)  
[Demo codesandbox ESM](https://codesandbox.io/s/serverless-sound-igd1h)

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
<script src="https://cdn.jsdelivr.net/npm/jsnview@1.0.0/build/index.min.js"></script>
Access via global object : jsnview or window.jsnview

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsnview@1.0.0/build/index.css" />
```

### Methods
```js
jsnview(jsonData:Object): [HTMLDivElement]
```

### Notes
- All pull requests are welcome, feel free.

### Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT