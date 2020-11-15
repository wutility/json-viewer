import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      name: 'jsvView',
      file: 'build/index.js',
      format: 'umd',
      sourcemap: false
    }
  ],
  plugins: [
    postcss({
      babelrc: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime'
    }),
     terser()
  ]
};