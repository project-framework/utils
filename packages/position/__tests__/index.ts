import { calculateDistance, getPosition, type Point } from '../index';

describe('calculateDistance', () => {
    /**
     * Test case 1: Same point distance calculation
     * 测试用例1: 相同点距离计算
     * 预期结果: 距离应该为0
     */
    test('should return 0 for the same point', () => {
        const point: Point = { lng: 116.397128, lat: 39.917749 }; // 北京坐标
        const distance = calculateDistance(point, point);
        expect(distance).toBeCloseTo(0, 10); // 精确到小数点后10位
    });

    /**
     * Test case 2: Known distance verification - Beijing to Shanghai
     * 测试用例2: 已知距离验证 - 北京到上海
     * 预期结果: 约1068公里 (根据实际地理距离)
     */
    test('should calculate correct distance between Beijing and Shanghai', () => {
        const beijing: Point = { lng: 116.397128, lat: 39.917749 };
        const shanghai: Point = { lng: 121.473701, lat: 31.230416 };
        const distance = calculateDistance(beijing, shanghai);
        // 北京到上海实际距离约为1068公里
        expect(distance).toBeCloseTo(1068, -1); // 精确到百位
    });

    /**
     * Test case 3: Zero coordinates test
     * 测试用例3: 零坐标测试
     * 预期结果: 正确计算赤道与本初子午线交点间的距离
     */
    test('should handle zero coordinates correctly', () => {
        const origin: Point = { lng: 0, lat: 0 };
        const point: Point = { lng: 1, lat: 1 };
        const distance = calculateDistance(origin, point);
        expect(distance).toBeGreaterThan(0);
    });

    /**
     * Test case 4: Negative coordinates test (West longitude/South latitude)
     * 测试用例4: 负坐标测试 (西经/南纬)
     * 预期结果: 正确处理负坐标
     */
    test('should handle negative coordinates correctly', () => {
        const point1: Point = { lng: -74.0059, lat: 40.7128 }; // 纽约
        const point2: Point = { lng: -118.2437, lat: 34.0522 }; // 洛杉矶
        const distance = calculateDistance(point1, point2);
        expect(distance).toBeGreaterThan(0);
        // 纽约到洛杉矶距离约为3933-3950公里
        expect(distance).toBeCloseTo(3935, -1);
    });

    /**
     * Test case 5: Large distance test (cross hemispheres)
     * 测试用例5: 大距离测试 (跨半球)
     * 预期结果: 正确计算跨半球距离
     */
    test('should calculate large distances across hemispheres', () => {
        const northPoint: Point = { lng: 0, lat: 90 }; // 北极
        const southPoint: Point = { lng: 0, lat: -90 }; // 南极
        const distance = calculateDistance(northPoint, southPoint);
        // 北极到南极距离约为地球半径π倍，即约20015公里
        expect(distance).toBeCloseTo(20015, -2); // 精确到千位
    });

    /**
     * Test case 6: International Date Line crossing
     * 测试用例6: 跨越国际日期变更线
     * 预期结果: 正确处理经度差超过180度的情况
     */
    test('should handle international date line crossing', () => {
        const tokyo: Point = { lng: 139.6917, lat: 35.6895 }; // 东京
        const losAngeles: Point = { lng: -118.2437, lat: 34.0522 }; // 洛杉矶
        const distance = calculateDistance(tokyo, losAngeles);
        expect(distance).toBeGreaterThan(0);
        // 东京到洛杉矶距离约为8800公里
        expect(distance).toBeCloseTo(8800, -2);
    });

    /**
     * Test case 7: Edge case - Maximum possible distance
     * 测试用例7: 边界情况 - 最大可能距离
     * 预期结果: 任意两点间距离不超过地球半周长
     */
    test('should not exceed maximum possible distance', () => {
        const point1: Point = { lng: -180, lat: 0 };
        const point2: Point = { lng: 0, lat: 0 };
        const distance = calculateDistance(point1, point2);
        // 两点间最大距离约为地球半周长 2πR/2 = πR ≈ 20017 km
        expect(distance).toBeLessThanOrEqual(20017);
    });

    /**
     * Test case 8: Small distance accuracy test
     * 测试用例8: 小距离精度测试
     * 预期结果: 能够准确计算很近的两点间距离
     */
    test('should calculate small distances accurately', () => {
        const point1: Point = { lng: 116.397, lat: 39.9177 };
        const point2: Point = { lng: 116.3971, lat: 39.9178 };
        const distance = calculateDistance(point1, point2);
        expect(distance).toBeGreaterThan(0);
        expect(distance).toBeLessThan(100); // 应该小于100公里
    });
});

describe('getPosition', () => {
    // 保存原始的navigator对象
    const originalNavigator = { ...navigator };

    beforeEach(() => {
        // 清除所有模拟，确保每次测试都是干净的状态
        jest.clearAllMocks();
    });

    afterEach(() => {
        // 恢复原始的navigator对象
        Object.assign(navigator, originalNavigator);
    });

    /**
     * Test Case 1: 成功获取地理位置信息
     * Scenario: 浏览器支持地理位置API且用户授权
     */
    // prettier-ignore
    it(
        'should resolve with position when geolocation is available and user grants permission',
        async () => {
        // Arrange: 准备测试数据
            const mockPosition = {
                coords: {
                    latitude: 39.9042,
                    longitude: 116.4074,
                    accuracy: 100,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null,
                },
                timestamp: Date.now(),
            };

            // Mock navigator.geolocation.getCurrentPosition
            const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
                successCallback(mockPosition);
            });

            // 设置模拟的navigator对象
            Object.defineProperty(navigator, 'geolocation', {
                writable: true,
                value: {
                    getCurrentPosition: mockGetCurrentPosition,
                },
            });

            // Act: 执行被测函数
            const result = await getPosition();

            // Assert: 验证结果
            expect(result).toEqual({
                lat: 39.9042,
                lng: 116.4074,
            });
            expect(mockGetCurrentPosition).toHaveBeenCalledTimes(1);
            // 验证默认选项是否正确传递
            expect(mockGetCurrentPosition).toHaveBeenCalledWith(
                expect.any(Function),
                expect.any(Function),
                {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity,
                }
            );
        });

    /**
     * Test Case 2: 浏览器不支持地理位置API
     * Scenario: navigator.geolocation 不存在
     */
    it('should reject when geolocation is not available', async () => {
        // Arrange: 移除geolocation API
        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: undefined,
        });

        // Act & Assert: 验证Promise被拒绝
        await expect(getPosition()).rejects.toEqual('navigator.geolocation unavailable');
    });

    /**
     * Test Case 3: 用户拒绝地理位置权限
     * Scenario: 用户拒绝授权访问位置信息
     */
    it('should reject when user denies geolocation permission', async () => {
        // Arrange: 模拟权限拒绝错误
        const mockError = {
            code: 1, // PERMISSION_DENIED
            message: 'User denied Geolocation',
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            errorCallback(mockError);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act & Assert: 验证错误被正确传递
        await expect(getPosition()).rejects.toEqual(mockError);
    });

    /**
     * Test Case 4: 位置信息不可用
     * Scenario: 设备无法获取位置信息
     */
    it('should reject when position is unavailable', async () => {
        // Arrange: 模拟位置不可用错误
        const mockError = {
            code: 2, // POSITION_UNAVAILABLE
            message: 'Position unavailable',
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            errorCallback(mockError);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act & Assert
        await expect(getPosition()).rejects.toEqual(mockError);
    });

    /**
     * Test Case 5: 获取位置信息超时
     * Scenario: 位置请求超时
     */
    it('should reject when geolocation request times out', async () => {
        // Arrange: 模拟超时错误
        const mockError = {
            code: 3, // TIMEOUT
            message: 'Timeout',
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            errorCallback(mockError);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act & Assert
        await expect(getPosition()).rejects.toEqual(mockError);
    });

    /**
     * Test Case 6: 使用自定义选项
     * Scenario: 传递自定义的PositionOptions参数
     */
    it('should use custom options when provided', async () => {
        // Arrange
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const mockPosition = {
            coords: {
                latitude: 40.7128,
                longitude: -74.006,
            },
        } as GeolocationPosition;

        const customOptions: PositionOptions = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 10000,
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            successCallback(mockPosition);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act
        await getPosition(customOptions);

        // Assert: 验证自定义选项被正确传递
        expect(mockGetCurrentPosition).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            customOptions
        );
    });

    /**
     * Test Case 7: 验证选项合并逻辑
     * Scenario: 部分自定义选项，验证默认值被正确合并
     */
    it('should merge custom options with default options', async () => {
        // Arrange
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const mockPosition = {
            coords: {
                latitude: 51.5074,
                longitude: -0.1278,
            },
        } as GeolocationPosition;

        // 只提供部分选项
        const partialOptions: PositionOptions = {
            enableHighAccuracy: true,
            // maximumAge 和 timeout 使用默认值
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            successCallback(mockPosition);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act
        await getPosition(partialOptions);

        // Assert: 验证选项正确合并
        expect(mockGetCurrentPosition).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            {
                enableHighAccuracy: true, // 自定义值
                maximumAge: 0, // 默认值
                timeout: Infinity, // 默认值
            }
        );
    });

    /**
     * Test Case 8: 验证未知错误代码处理
     * Scenario: 处理未预期的错误代码
     */
    it('should handle unknown error codes', async () => {
        // Arrange
        const mockError = {
            code: 999, // 未知错误代码
            message: 'Unknown error',
        };

        const mockGetCurrentPosition = jest.fn((successCallback, errorCallback, options) => {
            errorCallback(mockError);
        });

        Object.defineProperty(navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: mockGetCurrentPosition,
            },
        });

        // Act & Assert
        await expect(getPosition()).rejects.toEqual(mockError);
    });
});
