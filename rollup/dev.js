import filesize from "rollup-plugin-filesize";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sass from "rollup-plugin-sass";
import pkg from "../package.json";

const plugins = [
  sass({ insert: true, options: { outputStyle: "compressed" } }),
  resolve({ mainFields: ['module', 'jsnext:main'], browser: true, preferBuiltins: true }),
  commonjs({
    exclude: "node_modules/process-es6/**",
    include: pkg.commonjs
  }),
  babel({
    babelrc: false,
    exclude: pkg.commonjs,
    presets: [["es2015", { modules: false }], "stage-0", "react"],
    plugins: ["external-helpers", "transform-decorators-legacy"]
  }),
  filesize(),
];

export default [{
  input: pkg.src,
  output: {
    format: "iife",
    "name": "Tourguide",
    "strict": true,
    file: pkg.main
  }, plugins
}, {
  input: pkg.srces,
  output: {
    format: "esm",
    file: pkg.module
  }, plugins
}];
