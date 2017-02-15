import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: 'lib/index.js',
  plugins: [
    babel(babelrc()),
  ],
  format: 'iife',
  dest: 'out/email-modal.js',
};
