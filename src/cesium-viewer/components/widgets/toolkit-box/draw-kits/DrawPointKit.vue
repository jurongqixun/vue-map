<template>
    <MouseTooltip :show="this.active" ref="tip">
        点击地图放置标记，点击鼠标[右键]或[ESC]取消。
    </MouseTooltip>
</template>

<script>
    import cesium from 'cesium/Cesium';
    import MouseTooltip from "@/cesium-viewer/components/widgets/toolkit-box/draw-kits/MouseTooltip";
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";

    export default {
        name: "DrawPointKit",
        mixins: [CesiumWidgetBase],
        components: {MouseTooltip},

        data() {
            return {
                active: false
            };
        },

        methods: {
            enable(bEnable = true) {
                this.active = bEnable;
            },

            onDrawComplete(viewer, position) {
                viewer.entities.add({
                    position: position,
                    billboard: {
                        image: require('@/assets/placeholder/1.png'),
                        verticalOrigin: cesium.VerticalOrigin.BOTTOM,
                        width: 32,
                        height: 32
                    },
                    label: {
                        text: '新增的标点',
                        font: '12px Arial, sans-serif, Verdana, \'微软雅黑\', \'宋体\'',
                        showBackground: true,
                        pixelOffset: new cesium.Cartesian2(0, 12)
                    }
                });
            }
        },

        created() {
            let me = this;
            this.registerOnReady(function (viewer) {
                let handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

                //单击鼠标左键画点
                handler.setInputAction(function (movement) {
                    if (!me.active) return;

                    let cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
                    me.onDrawComplete(viewer, cartesian);
                    me.active = false;
                }, cesium.ScreenSpaceEventType.LEFT_CLICK);

                //单击鼠标右键结束画点
                handler.setInputAction(function () {
                    me.active = false;
                }, cesium.ScreenSpaceEventType.RIGHT_CLICK);

                Object.defineProperty(this, 'mouseHandler', {
                    configurable: true,
                    value: handler
                });
            });
        },

        destoryed() {
            if (this.mouseHandler) {
                this.mouseHandler.destory();
            }
        }
    }
</script>
