export type Target = '_self' | '_blank' | '_parent' | '_top'

export const openLink = <T extends string>(link: T, target: Target = '_blank') => {
    const $a: HTMLElement = document.createElement('a');
    $a.setAttribute('href', link);
    $a.setAttribute('target', target);
    $a.setAttribute('rel', 'noreferrer noopener');
    $a.setAttribute('id', 'external');

    // 移除已存在的 external
    const external = document.getElementById('external');
    external && document.body.removeChild(external);
    document.body.appendChild($a);

    $a.click();
    $a.remove();
};
