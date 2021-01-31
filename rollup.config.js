import filesize from "rollup-plugin-filesize";
import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sass from "rollup-plugin-sass";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default [{
  input: pkg.src,
  output: {
    format: "iife",
    "name": "Tourguide",
    "strict": true,
    file: pkg.main
  },
  plugins: [
    eslint({
      include: [
        "./src/**",
      ]
    }),
    sass({ output: "tourguide.css", options: { outputStyle: "compressed" } }),
    resolve({ mainFields: ["module", "jsnext:main", "browser"], browser: true, preferBuiltins: true }),
    commonjs({
      exclude: "node_modules/process-es6/**",
      include: pkg.commonjs
    }),
    babel({
      exclude: pkg.commonjs
    }),
    filesize(),
  ]
}, {
  input: pkg.main,
  output: {
    format: "esm",
    file: pkg.main.replace(".js", ".min.js")
  },
  plugins: [uglify()]
}, {
  input: pkg.src,
  output: {
    format: "esm",
    file: pkg.module
  },
  plugins: [
    sass({ insert: false }),
    resolve({ mainFields: ["module", "jsnext:main", "node"], browser: true, preferBuiltins: true }),
    commonjs({
      exclude: "node_modules/process-es6/**",
      include: pkg.commonjs
    }),
    babel({
      exclude: pkg.commonjs
    }),
    filesize(),
  ]
}, {
  input: pkg.src,
  output: {
    format: "umd",
    "name": "Tourguide",
    file: pkg.module.replace(".esm.js", ".umd.js")
  },
  plugins: [
    sass({ insert: false }),
    resolve({ mainFields: ["module", "jsnext:main", "node"], browser: true, preferBuiltins: true }),
    commonjs({
      exclude: "node_modules/process-es6/**",
      include: pkg.commonjs
    }),
    babel({
      exclude: pkg.commonjs
    }),
    filesize(),
  ]
}];
