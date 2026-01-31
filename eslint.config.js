import bpmnIoPlugin from 'eslint-plugin-bpmn-io';
import babelParser from '@babel/eslint-parser';

export default [
  ...bpmnIoPlugin.configs.recommended,
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: [ 'test/**/*.js', 'test/**/*.cjs' ]
    };
  }),
  {
    files: [ '**/*.js' ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [ '@babel/plugin-syntax-import-attributes' ]
        }
      }
    }
  },
  {
    ignores: [ 'dist/**' ]
  }
];
