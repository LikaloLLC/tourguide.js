export default class MemoryCacheManager {
  constructor(identifier = "") {
    this.identifier = identifier;
    this._memory = {};
  }
  get(key) {
    return this._memory[key];
  }
  set(key, value) {
    return this._memory[key] = value;
  }
  clear(key) {
    this._memory[key] = undefined;
  }
}