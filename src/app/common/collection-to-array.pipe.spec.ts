import { CollectionToArrayPipe } from './collection-to-array.pipe';

describe('CollectionToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new CollectionToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
