import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const pkg = require('./package.json')
const banner = `/*! jsnview - v${pkg.version} | Copyright 2022 - Haikel Fazzani */\n`;

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
    sourcemap: false,
    banner
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
