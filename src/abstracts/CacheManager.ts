import { CacheManager } from "@types";

export abstract class AbstractCacheManager implements CacheManager {
    constructor(identifier = "") {
        this.identifier = identifier;
    }
    identifier = "";
    abstract get<T = any>(key: string): T;
    abstract set(key: string, value: any): void;
    abstract clear(key: string): void;
}