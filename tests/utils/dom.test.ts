import { getDataContents } from '../../src/utils/dom';

describe('getDataContents function', () => {
  it('should return default values when data is empty', () => {
    const result = getDataContents<Record<string, string>>("", {});
    expect(result).toEqual({});
  });

  it('should parse key-value pairs from the data string', () => {
    const result = getDataContents("key1:value1;key2:value2");
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should handle empty key-value pairs gracefully', () => {
    const result = getDataContents("key1:value1;key2:;key3:");
    expect(result).toEqual({ key1: 'value1', key2: '', key3: '' });
  });
});
