module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'test',
          'style',
        ],
      ],
      'type-empty': [2, 'never'], // type不能为空
      'type-case': [0, 'always', 'lower-case'], // type不限制大小写
      'subject-empty': [2, 'never'], // subject（简短得描述）不能为空
      'subject-case': [0], // subject 大小写不做校验
    },
  };