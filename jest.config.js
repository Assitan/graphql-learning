module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: ['!**/node_modules/**'],
  coverageDirectory: 'test/coverage',
  notify: true,
  bail: true,
  verbose: true,
};
