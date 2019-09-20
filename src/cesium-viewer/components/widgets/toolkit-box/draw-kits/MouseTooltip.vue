<template>
    <div class="cesium-widget-draw-kit-mouse-tooltip" ref="container"
         :style="this.style">
        <div class="cesium-widget-draw-kit-mouse-tooltip-icon">
            <i :class="'feather-icon icon-' + this.icon"></i>
        </div>
        <div class="cesium-widget-draw-kit-mouse-tooltip-msg">
            <slot/>
        </div>
    </div>
</template>

<script>
    import cesium from 'cesium/Cesium';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import './MouseTooltip.less';

    export default {
        name: "MouseTooltip",
        mixins: [CesiumWidgetBase],

        props: {
            show: {type: Boolean, default: false},
            icon: {type: String, default: "help-circle"}
        },

        data() {
            return {
                init: false,
                top: 0, left: 0
            };
        },

        computed: {
            style() {
                if (this.init === true && this.show === true) {
                    return `top: ${this.top}px; left: ${this.left}px`;
                } else {
                    return "display: none";
                }
            },
        },

        mounted() {
            let me = this;
            this.registerOnReady(function (viewer) {
                let canvas = viewer.scene.canvas;
                let handler = new cesium.ScreenSpaceEventHandler(canvas);
                //let tooltip = me.$refs.container;

                handler.setInputAction(function (evt) {
                    me.init = true;
                    me.top = String(evt.endPosition.y);
                    me.left = String(evt.endPosition.x + 15);
                }, cesium.ScreenSpaceEventType.MOUSE_MOVE);

                Object.defineProperty(me, 'mouseMoveHandler', {
                    configurable: true,
                    value: handler
                });
            });
        },

        destoryed() {
            if (this.mouseMoveHandler)
                this.mouseMoveHandler.destory();
        }
    }
</script>
