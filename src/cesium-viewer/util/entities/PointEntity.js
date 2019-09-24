import cesium from 'cesium/Cesium';
import DrawEntity from "./DrawEntity";

const DeveloperError = cesium.DeveloperError;
const defined = cesium.defined;
const defaultValue = cesium.defaultValue;

export default class PointEntity extends DrawEntity {
    constructor(options) {
        if (!defined(options.position))
            throw new DeveloperError("options.position must be");

        let name = defaultValue(options.name, '新增标点');
        super({
            name: name,
            position: options.position,
            billboard: {
                image: defaultValue(options.image, require('@/assets/placeholder/1.png')),
                width: defaultValue(options.imageWidth, 32),
                height: defaultValue(options.imageHeight, 32),
                verticalOrigin: cesium.VerticalOrigin.BOTTOM,
            },
            label: {
                text: name,
                font: '12px Arial, sans-serif, Verdana, \'微软雅黑\', \'宋体\'',
                showBackground: true,
                pixelOffset: new cesium.Cartesian2(0, 12)
            }
        });
    }

    isMovable() {
        return true;
    }
}
