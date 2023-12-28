import { openLink } from '../index';

describe('openLink', () => {
    beforeEach(() => {
        // 在每个测试用例之前创建一个空的<body>元素
        document.body.innerHTML = '';
    });

    it('should remove existing <a> element before creating a new one', () => {
        const link = 'https://www.baidu.com';
        const target = '_blank';

        const existingLink = document.createElement('a');
        existingLink.setAttribute('id', 'external');
        document.body.appendChild(existingLink);

        openLink(link, target);

        const $a = document.getElementById('external');

        expect($a).toBeNull();
    });
});
