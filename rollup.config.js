import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const output = [
  {
    file: 'build/index.esm.js',
    format: 'esm',
    sourcemap: true,

  },
  {
    name: 'jsnview',
    file: 'build/index.js',
    format: 'umd',
    sourcemap: false
  }
];

export default {
  input: "src/index.js",
  output,
  plugins: [
    postcss({
      babelrc: false,
      modules: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime'
    }),
    terser()
  ]
};
