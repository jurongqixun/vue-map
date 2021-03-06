import cesium from 'cesium/Cesium';
//import shp from 'shp';
import Shapefile from '@inlog/js-shapefile-to-geojson/shapefile'

/**
 * GeoJson 工具类
 */
export default class GeoJson {
    /**
     * 转换 shp 文件为 Geo JSON
     * @param sourceFile
     * @returns {GeoJson}
     */
    static fromShpFile(sourceFile, callback) {
        // let geoData = {};
        //
        // shp.readFileSync(sourceFile, function (error, data) {
        //     console.log(error);
        //     console.log(JSON.stringify(data));
        //
        //     geoData = data;
        // });
        //
        // return new GeoJson(geoData);

        new Shapefile(sourceFile, function (data) {
            callback(new GeoJson(data.geojson));
        });
    }

    static fromLngLat(lng, lat, properties = {}) {
        let json = new GeoJson();
        json.addPoint(lng, lat, properties);
        return json;
    }

    /**
     *
     * @param initial
     */
    constructor(initial = {}) {
        this.json = Object.assign({
            type: "FeatureCollection",
            features: [],
        }, initial);
    }

    addFeature(type, properties = {}) {
        let me = this.json;
        let feature = {
            type: "Feature",
            properties,
            geometry: {
                type: type,
                coordinates: [],
            },
        };

        let m = {
            addCoordinate(lng, lat) {
                if (type === "Point") {
                    if (feature.geometry.coordinates.length === 0) {
                        feature.geometry.coordinates.push(lng, lat);
                    } else {
                        console.error("feature.geometry.type is 'Point', cannot add more coordinate.");
                    }

                    return m;
                } else {
                    feature.geometry.coordinates.push([lng, lat]);
                    return m;
                }
            },

            confirm(properties) {
                if (properties) {
                    me.features.push(Object.assign(feature, {properties}));
                } else {
                    me.features.push(feature);
                }
            }
        };

        return m;
    }

    /**
     * 添加经纬度点
     * @param lng 经度
     * @param lat 纬度
     * @param properties 扩展内容
     */
    addPoint(lng, lat, properties = {}) {
        this.addFeature("Point", properties).addCoordinate(lng, lat).confirm();
    }

    /**
     * 添加直线
     * @param lng
     * @param lat
     * @param properties
     * @returns {*|{confirm(*=): void, addCoordinate(*=, *=): (*)}}
     */
    addLineString(lng, lat, properties = {}) {
        return this.addFeature("LineString", properties).addCoordinate(lng, lat);
    }

    /**
     * 添加多边形
     * @param lng
     * @param lat
     * @param properties
     * @returns {*|{confirm(*=): void, addCoordinate(*=, *=): (*)}}
     */
    addPolygon(lng, lat, properties = {}) {
        return this.addFeature("Polygon", properties).addCoordinate(lng, lat);
    }

    /**
     * to cesium GeoJsonDataSource
     * @param name name of GeoJsonDataSource
     * @param options options of GeoJsonDataSource
     * @returns {Promise}
     */
    toDataSource(name = 'SimpleGeoJson', options = {}) {
        let dataSource = new cesium.GeoJsonDataSource(name);
        return dataSource.load(this.json, options);
    }

    /**
     * to cesium entity data from GeoJsonDataSource.load
     * @param options GeoJsonDataSource options
     * @param promiseCallback
     */
    toDataSourceEntities(options = {}, promiseCallback = () => {}) {
        let dataSource = new cesium.GeoJsonDataSource();
        let promise = dataSource.load(this.json, options);

        promise.then(function (dataSource) {
            let entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
                promiseCallback(entities[i]);
            }
        });
    }

    /**
     * json stringify
     * @returns {string}
     */
    toString() {
        return JSON.stringify(this.json);
    }
}
