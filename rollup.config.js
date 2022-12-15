import filesize from "rollup-plugin-filesize";
import { eslint } from "rollup-plugin-eslint";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import sass from "rollup-plugin-sass";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const isDev = Boolean(process.argv.find((arg) => arg === "--configDev"));

const babelplugin = babel({
  babelHelpers: "bundled",
  exclude: pkg.commonjs
});
const commonjsplugin = commonjs({
  exclude: "node_modules/process-es6/**",
  include: pkg.commonjs
});
const replaceplugin = replace({
  preventAssignment: true,
  "process.env.NODE_ENV": isDev
    ? JSON.stringify("development")
    : JSON.stringify("production"),
});
const resolveplugin = resolve({
  mainFields: ["module", "jsnext:main", "browser"],
  browser: true,
  preferBuiltins: true
});
const sassplugin = sass({ insert: false });
const plugins = [
  sassplugin,
  resolveplugin,
  commonjsplugin,
  replaceplugin,
  babelplugin,
  filesize(),
]
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
      fix: true,
      include: [
        "./src/**",
      ]
    }),
    ...plugins
  ]
}, {
  input: pkg.main,
  output: {
    format: "esm",
    file: pkg.main.replace(".js", ".min.js")
  },
  plugins: [terser()]
}, {
  input: pkg.src,
  output: {
    format: "esm",
    file: pkg.module
  },
  plugins: plugins
}, {
  input: pkg.src,
  output: {
    format: "umd",
    "name": "Tourguide",
    file: pkg.module.replace(".esm.js", ".umd.js")
  },
  plugins: plugins
}];
