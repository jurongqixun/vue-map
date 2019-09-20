<template>
    <div class="cesium-widget-toolkit-box-drop-draw-kits">
        <a href="javascript:void(0);" @click="onDrawClick('Point')">
            <i class="feather-icon icon-map-pin"></i>
            标点
        </a>
        <a href="javascript:void(0);" @click="onDrawClick('LineString')">
            <i class="feather-icon icon-edit-3"></i>
            划线
        </a>
        <a href="javascript:void(0);" @click="onDrawClick('Polygon')">
            <i class="feather-icon icon-hexagon"></i>
            多边形
        </a>
        <a href="javascript:void(0);" @click="onDrawClick('Rectangle')">
            <i class="feather-icon icon-square"></i>
            矩形
        </a>
        <a href="javascript:void(0);" class="splitter" @click="onDrawClick('Circle')">
            <i class="feather-icon icon-circle"></i>
            圆形
        </a>

        <DrawPointKit ref="pointKit" />
    </div>
</template>

<script>
    import './DrawKits.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import DrawPointKit from "@/cesium-viewer/components/widgets/toolkit-box/draw-kits/DrawPointKit";

    export default {
        name: "DrawKits",
        components: {DrawPointKit},
        mixins: [CesiumWidgetBase],

        methods: {
            onDrawClick(type) {
                if (!this.isCesiumReady()) return;

                //let container = this.getCesiumInstance().container;
                switch (type) {
                    case 'Point':
                        this.$refs.pointKit.enable();
                        break;

                    case 'LineString':
                        break;
                }
            },
        },
    }
</script>
