// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwind from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default [
  // Bỏ qua thư mục build
  { ignores: ['node_modules', 'build', 'dist', 'coverage'] },

  // Base JS khuyến nghị
  js.configs.recommended,

  // React + a11y + Tailwind
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  tailwind.configs['flat/recommended'],

  // Cấu hình chung cho file nguồn
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      tailwind,
    },
    settings: {
      react: { version: 'detect' }, // auto detect version React
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cva', 'cx'],
        config: 'tailwind.config.js',
      },
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off', // JSX transform mới
      'react/prop-types': 'off', // thường dùng TypeScript/JS docs thay cho prop-types
      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // JS chung
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Tailwind (có thể bật 'error' nếu muốn chặt chẽ hơn)
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },

  // Đặt Prettier CUỐI CÙNG để tắt các rule xung đột format
  prettier,
];
