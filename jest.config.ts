import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: "jsdom",  // Usa jsdom para pruebas en React
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],

  // Mapea los alias de Next.js para que Jest pueda resolverlos correctamente
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  // Asegurar que los test utilizan setup para Jest-DOM
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};

export default config;