import { AbstractCacheManager } from "../abstracts/CacheManager";
/**
 * The MemoryCacheManager class provides an in-memory caching mechanism using a JavaScript Map object.
 * This implementation extends the AbstractCacheManager abstract class and implements its methods.
 */
class MemoryCacheManager extends AbstractCacheManager {
    private _memory: Record<string, any> = {};

    /**
     * Retrieves the value associated with the given key.
     * @param key - The unique identifier for the cached item.
     * @returns The value associated with the key, or undefined if the key does not exist.
     */
    get(key: string) {
        return this._memory[key];
    }

    /**
     * Stores a value in the cache under the specified key.
     * @param key - The unique identifier for the cached item.
     * @param value - The value to be stored in the cache.
     */
    set(key: string, value: any) {
        return this._memory[key] = value;
    }

    /**
     * Clears the value associated with the given key from the cache, if it exists.
     * @param key - The unique identifier for the cached item to be cleared.
     */
    clear(key: string) {
        this._memory[key] = undefined;
    }
}

export default MemoryCacheManager;