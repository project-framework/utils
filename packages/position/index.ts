/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */

export interface Point {
    lng: number; // 经度
    lat: number; // 纬度
}

/**
 * @description Haversine 半正矢公式，计算两个经纬度坐标之间的距离
 * @return 距离，单位：公里
 */
export const calculateDistance = (point1: Point, point2: Point) => {
    const R = 6371.393; // 地球半径，单位为千米
    const toRad = (degrees: number) => (degrees * Math.PI) / 180;

    const { lng: lon1, lat: lat1 } = point1;
    const { lng: lon2, lat: lat2 } = point2;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
};

/**
 * @description 获取设备当前位置
 */
export const getPosition = (options?: PositionOptions): Promise<Point> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        lng: position.coords.longitude,
                        lat: position.coords.latitude,
                    });
                },
                // [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPositionError)
                error => reject(error),
                Object.assign(
                    {
                        // 开启高精度定位
                        enableHighAccuracy: false,
                        // 缓存位置的最大时间(以毫秒为单位)：0 -> 不能使用缓存的位置，必须检索当前位置；Infinity -> 必须返回缓存位置
                        maximumAge: 0,
                        // 超时时间
                        timeout: Infinity,
                    },
                    options
                )
            );
        } else {
            reject('navigator.geolocation unavailable');
        }
    });
};
