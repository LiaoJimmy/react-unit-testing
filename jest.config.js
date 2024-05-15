module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/stories'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/?(*.)+(test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.(css|less)$': '<rootDir>/__tests__/helper/CSSStub.ts',
  },
};
