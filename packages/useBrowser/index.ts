// 获取浏览器型号以及版本
const useBrowser = () => {
    const ua = navigator.userAgent.toLowerCase();
    const re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    const m = ua.match(re);
    const Sys = {
        browser: m[1].replace(/version/, "'safari"),
        version: m[2]
    };

    return Sys;
};

export default useBrowser;