import MemoryCacheManager from '../../src/cachemanager/InMemoryCacheManager';

describe('MemoryCacheManager', () => {
    let cache: MemoryCacheManager;

    beforeEach(() => {
        cache = new MemoryCacheManager();
    });

    it('should set and get a value', () => {
        cache.set('key1', 'value1');
        expect(cache.get('key1')).toBe('value1');
    });

    it('should clear a value', () => {
        cache.set('key2', 'value2');
        cache.clear('key2');
        expect(cache.get('key2')).toBeUndefined();
    });
});
