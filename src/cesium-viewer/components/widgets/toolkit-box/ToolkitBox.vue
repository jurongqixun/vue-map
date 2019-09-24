<template>
    <div class="cesium-widget-toolkit-box">
        <div class="cesium-widget-toolkit-box-buttons">
            <a href="javascript:void(0);" class="cesium-widget-toolkit-box-button" title="标记工具" @click="onMapToolClick">
                <i class="feather-icon icon-briefcase"></i>
                工具
            </a>
            <i class="splitter"></i>
            <a href="javascript:void(0);" class="cesium-widget-toolkit-box-button" title="地图标记数据"
               @click="onMapDataClick">
                <i class="feather-icon icon-database"></i>
                数据
                <span class="badge" v-if="this.markData.length">{{this.markData.length}}</span>
            </a>
            <i class="splitter"></i>
            <a href="javascript:void(0);" class="cesium-widget-toolkit-box-button" title="选择地图源" @click="onLayerClick">
                <i class="feather-icon icon-layers"></i>
                图源
            </a>
            <i class="splitter" v-if="this.fullscreenSupport"></i>
            <a href="javascript:void(0);"
               style="font-size: 14px"
               class="cesium-widget-toolkit-box-button"
               title="全屏"
               v-if="this.fullscreenSupport"
               @click="this.onFullscreenClick">
                &nbsp;<i class="feather-icon icon-maximize" ref="fullscreenIcon"></i>&nbsp;
            </a>
            <i class="splitter"></i>
            <a href="javascript:void(0);"
               style="font-size: 14px"
               class="cesium-widget-toolkit-box-button" title="视图模式" @click="onSwitchSceneMode">
                <strong ref="sceneModeText">3D</strong>
            </a>
        </div>

        <div class="cesium-widget-toolkit-box-drop hide" ref="mapData">
            <div class="cesium-widget-toolkit-box-drop-title">
                <i class="feather-icon icon-briefcase"></i>
                地图数据
                <button type="button" @click="onDropButtonClick">
                    <i class="feather-icon icon-x-square"></i>
                </button>
            </div>
            <DrawData/>
        </div>

        <div class="cesium-widget-toolkit-box-drop hide" ref="mapTool">
            <div class="cesium-widget-toolkit-box-drop-title">
                <i class="feather-icon icon-briefcase"></i>
                地图工具
                <button type="button" @click="onDropButtonClick">
                    <i class="feather-icon icon-x-square"></i>
                </button>
            </div>
            <DrawKits/>
        </div>

        <div class="cesium-widget-toolkit-box-drop hide" ref="providers">
            <div class="cesium-widget-toolkit-box-drop-title">
                <i class="feather-icon icon-layers"></i>
                地图源
                <button type="button" @click="onDropButtonClick">
                    <i class="feather-icon icon-x-square"></i>
                </button>
            </div>
            <ImageryProviderDrop/>
        </div>

        <DrawContainer />
    </div>
</template>

<script>
    import cesium from 'cesium/Cesium';
    import './ToolkitBox.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import ImageryProviderDrop from "@/cesium-viewer/components/widgets/toolkit-box/ImageryProviderDrop";
    import DrawKits from "@/cesium-viewer/components/widgets/toolkit-box/DrawKits";
    import DrawData from "@/cesium-viewer/components/widgets/toolkit-box/DrawData";
    import DrawContainer from "@/cesium-viewer/components/widgets/toolkit-box/DrawContainer";

    const Fullscreen = cesium.Fullscreen;

    export default {
        name: "ToolkitBox",
        components: {DrawContainer, DrawData, DrawKits, ImageryProviderDrop},
        mixins: [CesiumWidgetBase],

        data() {
            return {
                fullscreenSupport: Fullscreen.supportsFullscreen(),
                markData: []
            };
        },

        methods: {
            hideDropBoxes() {
                let dropBoxes = [this.$refs.mapData, this.$refs.mapTool, this.$refs.providers];
                for (let i = 0; i < dropBoxes.length; i++) {
                    dropBoxes[i].classList.replace("show", "hide");
                }
            },

            onMapToolClick() {
                this.hideDropBoxes();
                this.$refs.mapTool.classList.replace("hide", "show");
            },

            onMapDataClick() {
                this.hideDropBoxes();
                this.$refs.mapData.classList.replace("hide", "show");
            },

            onLayerClick() {
                this.hideDropBoxes();
                this.$refs.providers.classList.replace("hide", "show");
            },

            onFullscreenClick() {
                if (!this.isCesiumReady()) return;
                if (Fullscreen.fullscreen) {
                    Fullscreen.exitFullscreen();
                    this.$refs.fullscreenIcon.classList.replace("icon-minimize", "icon-maximize");
                } else {
                    Fullscreen.requestFullscreen(this.getCesiumInstance().container);
                    this.$refs.fullscreenIcon.classList.replace("icon-maximize", "icon-minimize");
                }
            },

            onSwitchSceneMode() {
                if (!this.isCesiumReady()) return;

                let is3D = this.$refs.sceneModeText.innerText === '3D';
                let s = this.getCesiumInstance().scene;
                let c = this.getCesiumInstance().camera;
                let opt = this.getOption("home");
                let completeEvent = function () {
                    c.flyTo({destination: opt.cartesian3});
                };

                let eventHelper = new cesium.EventHelper();
                eventHelper.add(s.morphComplete, completeEvent());

                if (is3D) {
                    this.$refs.sceneModeText.innerText = '2D';
                    s.morphTo2D(1);
                } else {
                    this.$refs.sceneModeText.innerText = '3D';
                    s.morphTo3D(1);
                }
            },

            onDropButtonClick() {
                this.hideDropBoxes();
            }
        },
    }
</script>
