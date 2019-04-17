// Rollup plugins.
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import pkg from "../package.json";

// Import the development configuration.
import config from "./dev";

// Inject the production settings.
// config.sourcemap = false;
config.forEach(
  target => {
    target.plugins.push(replace({ "process.env.NODE_ENV": JSON.stringify("production"), "__VERSION__": JSON.stringify(pkg.version) }));
    target.plugins.push(uglify({
      output: {
        comments: function (node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
            // multiline comment
            return /@preserve/i.test(text);
          }
        }
      }
    }));
  }
);

export default config;