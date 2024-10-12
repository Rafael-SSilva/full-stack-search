/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["^.+.js?$"],
    transform: {
      "^.+.ts?$": ["ts-jest",{}],
    },
  };