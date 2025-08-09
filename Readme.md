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
<script src="https://cdn.jsdelivr.net/npm/jsnview/build/index.min.js"></script>
<!-- Access via global object : window.jsnview -->
```

### Usage

Use the following code to initialize the viewer.

```javascript
import Jsnview from "jsnview";

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
  showType: true,
  showFoldmarker: true,
  maxDepth: Infinity,
};

const viewer = new Jsnview(data, options);
```

### TypeScript Integration

You can easily use this library in a TypeScript project by declaring the
function signature.

```ts
// 1. Declare the signature for the jsnview function
declare function jsnview(
  data: any,
  options?: {
    showType?: boolean;
    showFoldmarker?: boolean;
    showLen?: boolean;
    collapsed?: boolean;
    maxDepth?: number;
  },
): {
  element: HTMLElement;
  collapseAll: () => void;
  expandAll: () => void;
};

// 2. Your application code
const sampleData = {
  id: "0001",
  type: "donut",
  name: "Cake",
};

const container = document.getElementById("json-container") as HTMLElement;
const collapseBtn = document.getElementById("collapse-btn",) as HTMLButtonElement;
const expandBtn = document.getElementById("expand-btn") as HTMLButtonElement;

// Create the viewer instance
const viewer = jsnview(sampleData, { collapsed: false });

// Add the viewer to the DOM
container.appendChild(viewer.element);

// Wire up the controls
collapseBtn.addEventListener("click", () => viewer.collapseAll());
expandBtn.addEventListener("click", () => viewer.expandAll());
```

### Notes

- All pull requests are welcome, feel free.

### Author

- [Haikel Fazzani](https://github.com/haikelfazzani)

## License

Apache License 2.0
