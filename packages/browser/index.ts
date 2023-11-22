interface BrowserInfo {
    type: string;
    versions: number | undefined;
}

const UserAgent = navigator.userAgent.toLowerCase();

const browserList = {
    Opera: UserAgent.indexOf('opera') > -1,
    IE10: UserAgent.indexOf('compatible') > -1 && UserAgent.indexOf('msie') > -1,
    IE11: !!UserAgent.match(/trident.*rv:11\./),
    Firefox: UserAgent.indexOf('firefox') > -1,
    Edge: UserAgent.indexOf('edg') > -1,
    QQBrowser: /qqbrowser/.test(UserAgent),
    UCBrowser: UserAgent.indexOf('ubrowser') > -1,
    WeixinBrowser: /micromessenger/i.test(UserAgent),
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1,
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1,
};

type BrowserEnums = keyof typeof browserList;

// 获取浏览器类型
export function getBrowser() {
    const browserInfo: BrowserInfo = {
        type: '',
        versions: undefined,
    };

    for (let i in browserList) {
        if (!browserList[i as BrowserEnums]) continue;

        // 请注意判断顺序（有些浏览器会有多个字段）
        let versions = null;
        switch (i) {
            case 'Opera': {
                const res = UserAgent.match(/opera\/([\d.]+)/);
                if (res) versions = res[1];
                break;
            }
            case 'IE10':
            case 'IE11': {
                const res = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)
                if (res) versions = res[2];
                break;
            }
            case 'Firefox': {
                const res = UserAgent.match(/firefox\/([\d.]+)/)
                if (res) versions = res[1];
                break;
            }
            case 'Edge': {
                const res = UserAgent.match(/edge\/([\d.]+)/)
                if (res) versions = res[1];
                break;
            }
            case 'QQBrowser': {
                const res = UserAgent.match(/qqbrowser\/([\d.]+)/)
                if (res) versions = res[1];
                break;
            }
            case 'UCBrowser': {
                const res = UserAgent.match(/ubrowser\/([\d.]+)/)
                if (res) versions = res[1];
                break;
            }
            case 'Safari': {
                const res = UserAgent.match(/version\/([\d.]+)/)
                if (res) versions = res[1];
                break;
            }
            case 'Chrome': {
                for (const mt in navigator.mimeTypes) {
                    // 检测是否是360浏览器(测试只有pc端的360才起作用)
                    if (navigator.mimeTypes[mt].type === 'application/360softmgrplugin') {
                        i = '360';
                    }
                }
                const res = UserAgent.match(/chrome\/([\d.]+)/);
                if (res) versions = res[1];
                break;
            }
            default:
                break;
        }
        if (versions) {
            browserInfo.type = i;
            browserInfo.versions = parseInt(versions, 10);
            break;
        }
    }

    return browserInfo;
}