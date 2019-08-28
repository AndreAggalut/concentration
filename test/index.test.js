const { handleInput } = require('../index');

describe('handleInput', () => {
  const KEYS = [
    '1',
    '2',
    '3',
    '4',
    'Q',
    'W',
    'E',
    'R',
    'A',
    'S',
    'D',
    'F',
    'Z',
    'X',
    'C',
    'V',
  ];
  test('should throw an error if user use a different key besides the KEYS array', () => {
    expect(() => {
      handleInput('G', KEYS);
    }).toThrowError();
  });
});
