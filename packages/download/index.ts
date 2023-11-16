import useBrowser from "../useBrowser";

export const downloadByUrl = (url: string, fileName: string) => {
    if (!url) throw new Error('当前没有下载链接');

    const a = document.createElement("a");
    a.style.display = "none";
    // 火狐兼容
    if (useBrowser().browser === "firefox") a.target = "_blank";
    a.href = url;
    a.download = fileName;
    // 使用target="_blank"时，添加rel="noopener noreferrer" 堵住钓鱼安全漏洞 防止新页面window指向之前的页面
    a.rel = "noopener noreferrer";
    document.body.append(a);
    a.click();

    setTimeout(() => {
        a.remove();
    }, 1000);
};
