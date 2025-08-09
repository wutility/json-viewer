# High-Performance JSON Viewer

A lightweight, dependency-free JSON viewer that renders JSON data into a
human-readable, collapsible tree.

**Features**

- Pure JavaScript: No external libraries or frameworks required.
- Collapsible Nodes: Easily expand and collapse nested objects and arrays.
- Global Controls: Programmatically expand or collapse all nodes at once.
- Customizable: Options to control initial collapsed state, max depth, and more.
- Syntax Highlighting: Differentiates between strings, numbers, booleans, and
  null values.
- Modern Styling: Styled with Tailwind CSS for a clean and responsive UI.

<hr />

<div align="center" style="width:100%; text-align:center;">
  <img src="https://badgen.net/bundlephobia/min/jsnview" alt="json viewer" />
  <img src="https://badgen.net/bundlephobia/dependency-count/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/v/jsnview" alt="json viewer" />
  <img src="https://badgen.net/npm/dt/jsnview" alt="json viewer" />
  <img src="https://data.jsdelivr.com/v1/package/npm/jsnview/badge" alt="json viewer"/>
</div>

### Demos

[PLayground](https://wutility.github.io/json-viewer)\
[Demo Codepen](https://codepen.io/haikelfazzani-the-bold/pen/bGWKEMP)

```bash
$ npm i jsnview
# or
$ yarn add jsnview
```

## Usage

```js
import jsnview from "jsnview";
```

Or include it via jsDelivr CDN (UMD):

```html
<script src="https://cdn.jsdelivr.net/npm/jsnview@3.0.0/dist/index.min.js"></script>
<!-- Access via global object : window.jsnview -->
```

### Usage

Use the following code to initialize the viewer.

```javascript
const data = {
  key1: "value1",
  key2: 123,
  key3: true,
  key4: [1, 2, 3],
  key5: {
    nestedKey: "nestedValue",
  },
};

const options = {
  collapsed: false,
  showLen: true,
  showType: false,
  showFoldmarker: true,
  maxDepth: Infinity,
};

const viewer = new Jsnview(data, options);
```

### Notes

- All pull requests are welcome, feel free.

### Author

- [Haikel Fazzani](https://github.com/haikelfazzani)

## License

Apache License 2.0
