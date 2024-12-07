module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
