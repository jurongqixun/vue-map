<template>
    <div class="cesium-widget-geo-info">
        <div class="cesium-widget-geo-info-item">
            经度：<span ref="longitude">{{longitude}}</span>
        </div>
        <div class="cesium-widget-geo-info-item">
            纬度：<span ref="latitude">{{latitude}}</span>
        </div>
        <div class="cesium-widget-geo-info-item">
            高度：<span ref="altitude">{{altitude}}</span>
        </div>
        <div class="cesium-widget-geo-info-item">
            海拔：<span ref="elevation">{{elevation}}</span>
        </div>
    </div>
</template>

<script>
    import cesium from 'cesium/Cesium';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import './GeoInfo.less';

    //const defined = cesium.defined;
    //const defaultValue = cesium.defaultValue;
    const math = cesium.Math;

    export default {
        name: "GeoInfo",
        mixins: [CesiumWidgetBase],

        data() {
            return {
                longitude: 'N/A',
                latitude: 'N/A',
                altitude: 'N/A',
                elevation: 'N/A',
            };
        },

        methods: {
            setLongitude(val) {
                this.longitude = val ? String(val.toFixed(4)) : 'N/A';
            },

            setLatitude(val) {
                this.latitude = val ? String(val.toFixed(4)) : 'N/A';
            },

            setAltitude(val) {
                this.altitude = val ? String(val.toFixed(0)) : 'N/A';
            },

            setElevation(val) {
                this.elevation = val ? String(val.toFixed(0)) + "米" : 'N/A';
            }
        },

        created() {
            let widgetControls = this;
            this.registerOnReady(function ($viewer) {
                let scene = $viewer.scene;
                let camera = $viewer.camera;

                let canvas = scene.canvas;
                let ellipsoid = scene.globe.ellipsoid;
                let handler = new cesium.ScreenSpaceEventHandler(canvas);

                handler.setInputAction(function (evt) {
                    let c = camera.pickEllipsoid(evt.endPosition, ellipsoid);
                    if (c) {
                        let cartographic = scene.globe.ellipsoid.cartesianToCartographic(c);

                        widgetControls.setLongitude(math.toDegrees(cartographic.longitude));
                        widgetControls.setLatitude(math.toDegrees(cartographic.latitude));
                        widgetControls.setAltitude(Math.ceil(camera.positionCartographic.height));
                        widgetControls.setElevation(scene.globe.getHeight(cartographic));
                    }
                }, cesium.ScreenSpaceEventType.MOUSE_MOVE);
            });
        },
    }
</script>
