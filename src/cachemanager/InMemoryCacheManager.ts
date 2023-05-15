import { AbstractCacheManager } from "./CacheManager";

export default class MemoryCacheManager extends AbstractCacheManager {
    private _memory: Record<string, any> = {};
    get(key: string) {
        return this._memory[key];
    }
    set(key: string, value: any) {
        return this._memory[key] = value;
    }
    clear(key: string) {
        this._memory[key] = undefined;
    }
}