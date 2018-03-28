import { storeConfig } from '@/store';

describe('store/index.js', () => {
  it('should have a default state of {}', () => {
    expect(storeConfig.state).toMatchObject({});
  });
});
