import {FirstToUppercasePipe} from './first-to-uppercase.pipe';

describe('FirstToUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstToUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
