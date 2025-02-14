import { GUID } from '../../src/utils/guid';

describe('GUID function', () => {
  it('should generate a random GUID string', () => {
    const guid = GUID();
    expect(typeof guid).toBe('string');
    expect(guid.length).toBe(36); // UUID v4 format length is 36 characters
    const parts = guid.split('-');
    expect(parts.length).toBe(5); // There should be 5 parts in a UUID v4 string
  });
});
