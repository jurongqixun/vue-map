import cesium from 'cesium/Cesium';
import DrawEntity from "@/cesium-viewer/util/entities/DrawEntity";

const defined = cesium.defined;
const defaultValue = cesium.defaultValue;
const DeveloperError = cesium.DeveloperError;

class PoiEntity extends DrawEntity {
    constructor(options) {
        super(options);
    }

    isMovable() {
        return false;
    }
}

class PoiAreaEntity extends PoiEntity {
    /**
     * 具体位置地理
     */
    constructor(options) {
        super({});

        if (!defined(options.name)) throw new DeveloperError('must define "name"');
        if (!defined(options.polygon)) throw new DeveloperError('must define "polygon"');

        if (!options.position) {
            let position = options.polygon.hierarchy.getValue().positions;
            let polyCenter = cesium.BoundingSphere.fromPoints(position).center;
            this.position = cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        }

        if (!options.polygon.height || options.polygon.height === 0) {
            options.polygon.height = 1000;
        }

        //options.polygon.arcType = cesium.ArcType.GEODESIC;
        options.polygon.fill = true;

        this.isMouseOver = false;

        this.merge(options);
        this.merge({
            billboard: {
                image: require('@/assets/placeholder/32.png'),
                width: 28,
                height: 28,
                verticalOrigin: cesium.VerticalOrigin.BOTTOM,
            },
            label: {
                text: options.name,
                font: '12px Arial, sans-serif, Verdana, \'微软雅黑\', \'宋体\'',
                showBackground: true,
                pixelOffset: new cesium.Cartesian2(0, 12)
            }
        });
    }

    onMouseOver() {
        if (this.isMouseOver)
            return;

        this.polygon.fill = true;
        this.isMouseOver = true;
    }

    onMouseOut() {
        this.polygon.fill = false;
        this.isMouseOver = false;
    }
}

class PoiPointEntity extends PoiEntity {
    /**
     * 从经纬度转换为 PoiPointEntity
     * @param name
     * @param lng
     * @param lat
     * @param height
     */
    static fromLngLat(name, lng, lat, height = 0) {
        return new PoiPointEntity({
            name,
            position: cesium.Cartesian3.fromDegrees(lng, lat, defaultValue(height, 0))
        });
    }

    /**
     * 具体位置地理
     * @param {Object|cesium.Entity} options or Cesium.Entity
     */
    constructor(options) {
        super({});

        if (!defined(options.name)) throw new DeveloperError('must define "name"');
        if (!defined(options.position)) throw new DeveloperError('must define "position"');

        this.merge(options);
        this.merge({
            billboard: {
                image: require('@/assets/placeholder/29.png'),
                width: 28,
                height: 28,
                verticalOrigin: cesium.VerticalOrigin.BOTTOM,
            },
            label: {
                text: this.name,
                font: '12px Arial, sans-serif, Verdana, \'微软雅黑\', \'宋体\'',
                showBackground: true,
                pixelOffset: new cesium.Cartesian2(0, 12)
            }
        });
    }

    isMovable() {
        return false;
    }
}

export {
    PoiEntity,
    PoiAreaEntity,
    PoiPointEntity
};
