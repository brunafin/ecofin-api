import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // Diretórios que contêm os testes
  roots: ["<rootDir>/test"],

  // Extensões que serão interpretadas pelo Jest
  moduleFileExtensions: ["js", "ts"],

  // Ambiente de testes
  testEnvironment: "node",

  // Transforma os arquivos de testes do TypeScript para JavaScript
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  // Configurações para o ts-jest
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  // Configuração do Mongoose
  // setupFilesAfterEnv: ["<rootDir>/test/setup-mongoose.ts"],

  // Ignora pastas comuns para não processá-las
  testPathIgnorePatterns: ["node_modules"],

  // Relatório de cobertura de código
  coverageReporters: ["text", "lcov"],

  // outras opções...
  testMatch: ["**/*.test.ts"],
};

export default config;
