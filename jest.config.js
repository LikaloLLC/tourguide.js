// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>'
    ],
    moduleDirectories: ["node_modules", "<rootDir>"],
    modulePaths: ["<rootDir>"],
    transform: {
      '^.+\\.ts$': [
        'ts-jest',
        {
          tsconfig: '<rootDir>/tsconfig.json',
        },
      ],
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'ts', 'tsx', 'd.ts'],
    transformIgnorePatterns: ['node_modules'],
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
         "^.+\\.(css|less|scss)$": "babel-jest"
    }
};