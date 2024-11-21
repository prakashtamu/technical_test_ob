export default {
  preset: `ts-jest`,
  testEnvironment: `node`,
  verbose: true,
  globalSetup: `<rootDir>/jest.global.setup.ts`,
  globalTeardown: `<rootDir>/jest.global.teardown.ts`,
  setupFiles: [`<rootDir>/jest.setup.ts`],
  setupFilesAfterEnv: [],
  rootDir: `./`,
  moduleDirectories: [`node_modules`, `src`],
  modulePathIgnorePatterns: [`<rootDir>/build`],
  moduleNameMapper: {
    "^@/(.*)$": `<rootDir>/src/$1`,
  },
  collectCoverage: false,
};
