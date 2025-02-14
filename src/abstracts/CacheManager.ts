import { CacheManager } from "@types";

/**
 * Abstract base class for CacheManager
 *
 * The `CacheManager` class serves as a template for managing caching mechanisms, particularly useful when tracking user interactions during a guided tour. This could include storing data such as:
 * - User progress through the tour steps
 * - Completion status of the tour
 * - Preferences or settings related to the tour (e.g., whether users want to skip certain steps)
 * - Any other relevant interaction details that might enhance用户体验 or improve future iterations of the guided tour.
 *
 * By implementing this abstract class, specific caching strategies can be developed for different environments (e.g., browser local storage, server-side storage, in-memory cache). This flexibility allows for efficient and scalable handling of user interactions across various platforms and devices.
 */
export abstract class AbstractCacheManager implements CacheManager {
    /**
     * Creates an instance of AbstractCacheManager.
     * @param identifier - A string to identify the cache manager.
     */
    constructor(identifier = "") {
        this.identifier = identifier;
    }
    /**
     * The unique identifier for this cache manager.
     */
    identifier: string;

    /**
     * Retrieves a value from the cache by its key.
     * @template T - The type of the value to retrieve.
     * @param key - The key under which the value is stored.
     * @returns The value associated with the given key, or undefined if the key does not exist in the cache.
     */
    abstract get<T = any>(key: string): T;

    /**
     * Stores a value in the cache against a specific key.
     * @param key - The key under which to store the value.
     * @param value - The value to be stored.
     */
    abstract set(key: string, value: any): void;

    /**
     * Removes a value from the cache by its key.
     * @param key - The key of the value to remove.
     */
    abstract clear(key: string): void;
}