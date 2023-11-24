module.exports = {
    ignores: [commit => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [2, 'always'], // 主体前有空行
        'footer-leading-blank': [1, 'always'], // 末行前有空行
        'header-max-length': [2, 'always', 108], // 首行最大长度
        'subject-empty': [2, 'never'], // 标题不可为空
        'type-empty': [2, 'never'], // 类型不可为空
        'type-enum': [ // 允许的类型
            2,
            'always',
            [
                'wip', // 开发中
                'feat', // 新增功能
                'merge', // 代码合并
                'fix', // bug 修复
                'test', // 测试
                'refactor', // 重构
                'build', // 构造工具、外部依赖（webpack、npm）
                'docs', // 文档
                'perf', // 性能优化
                'style', // 代码风格（不影响代码含义）
                'ci', // 修改项目继续集成流程（Travis，Jenkins，GitLab CI，Circle等）
                'chore', // 不涉及 src、test 的其他修改（构建过程或辅助工具的变更）
                'workflow', // 流水线
                'revert', // 回退
                'types', // 类型声明
                'release', // 版本发布
            ],
        ],
    },
};
