import DOM from "./dom";
const defaults = {
  interval: 100,
  retries: 100,
};

export function awaitElement (selector, cb, opts = {}) {
  let retries = 0,
    timeout;
  Object.assign(opts, defaults);
  const runner = () => {
    const el = DOM.find(selector).pop();
    if (!el && retries < opts.retries) {
      timeout = setTimeout(runner, opts.interval);
      retries += 1;
    } else cb(el);
  };
  runner();
  return () => clearTimeout(timeout);
}
