import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Configurações base recomendadas
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Ignorar arquivos
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
    ],
  },

  // Regras personalizadas
  {
    rules: {
      // Estilo
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // Boas práticas
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-multiple-empty-lines": ["error", { max: 1 }],

      // TypeScript (quando aplicável)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
