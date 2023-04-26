export default class SessionCacheManager {
  get key() {
    return SessionCacheManager.Key + this.identifier;
  }
  constructor(identifier = "default") {
    this.identifier = identifier;
    try {
      (this._memory = JSON.parse(
        window.sessionStorage.getItem(this.key)
      ))._isObject;
    } catch (e) {
      this._memory = {};
      this._write();
    }
  }
  _write() {
    window.sessionStorage.setItem(this.key,
      JSON.stringify(this._memory)
    );
  }
  get(key) {
    return this._memory[key];
  }
  set(key, value) {
    this._memory[key] = value;
    this._write();
    return value;
  }
  clear(key) {
    if (key) {
      this._memory[key] = undefined;
      this._write();
    } else {
      this._memory = {};
      window.sessionStorage.removeItem(this.key);
    }
  }
}
SessionCacheManager.Key = "tourguide.js:Session:";