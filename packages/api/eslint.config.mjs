import pluginJs from "@eslint/js";
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";
import stylistic from '@stylistic/eslint-plugin'

export default [
  {files: ["**/*.{js,mjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  {ignores: [".config*", "eslint.*", "jest.config.*", 'src/**/in-memory/*.ts', 'infrastructure/**/mongo/seeds/*.ts']},
  {plugins: {
    "simple-import-sort": simpleImportSort,
    "@stylistic": stylistic
  }},
  {rules: {
    "arrow-body-style": "error",
    "no-console": "error",
    "no-magic-numbers": "off",
    "no-nested-ternary": "error",
    "no-unused-vars": "off",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-with": "error",
    "max-lines": [
      "error",
      {
        "max": 350,
        "skipBlankLines": true,
        "skipComments": true,
      }
    ],
    "max-len": [
      "warn",
      {
        "code": 80,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "padding-line-between-statements": [
      "warn",
      { "blankLine": "always", "prev": "*", "next": "return" }
    ],
    "yoda": "warn",
    "require-await": "warn",
    "eqeqeq": ["error", "always"],
    "init-declarations": "off",
    "vars-on-top": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "warn",
    "import/no-anonymous-default-export": "off",
    "simple-import-sort/imports": "error",
    "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
    "@typescript-eslint/no-magic-numbers": ["error", {ignoreReadonlyClassProperties: true}],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/init-declarations": "error",
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/init-declarations": "off"
  }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  prettierConfig
];