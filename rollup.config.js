import scss from 'rollup-plugin-scss';
import cleanup from 'rollup-plugin-cleanup';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: 'build/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'build/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    scss(),
    cleanup(),
    minify({ comments: false })
  ],
};