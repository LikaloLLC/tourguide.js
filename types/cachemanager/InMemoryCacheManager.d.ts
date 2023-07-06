import { AbstractCacheManager } from "./CacheManager";
export default class MemoryCacheManager extends AbstractCacheManager {
    private _memory;
    get(key: string): any;
    set(key: string, value: any): any;
    clear(key: string): void;
}
