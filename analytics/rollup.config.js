import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'lib/index.js',
  plugins: [
    babel(babelrc()),
    uglify(),
  ],
  format: 'iife',
  dest: 'out/analytics.js',
};
