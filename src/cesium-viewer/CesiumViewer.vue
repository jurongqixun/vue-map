<template>
    <div class="cesium-viewer-container" ref="container">
        <GeoSearchBox/>
        <GeoInfo/>
        <ToolkitBox/>
        <MapNavigation />
        <slot/>
    </div>
</template>

<script>
    import 'cesium/Widgets/widgets.css';
    import 'feather-webfont/dist/feather-icons.css';
    import './CesiumViewer.less';

    import cesium from 'cesium/Cesium';
    import GeoSearchBox from "@/cesium-viewer/components/widgets/geo-search-box/GeoSearchBox";
    import GeoInfo from "@/cesium-viewer/components/widgets/geo-info/GeoInfo";
    import ToolkitBox from "@/cesium-viewer/components/widgets/toolkit-box/ToolkitBox";
    import MapNavigation from "@/cesium-viewer/components/widgets/navigation/MapNavigation";

    //const defined = cesium.defined;
    //const DeveloperError = cesium.DeveloperError;

    const createCesiumInstance = (container, options) => {
        options = Object.assign({
            animation: false,
            shouldAnimate: false,
            homeButton: false,
            geocoder: false,
            infoBox: false,
            fullscreenButton: false,
            fullscreenElement: container,
            sceneModePicker: false,
            timeline: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false,
            CreditsDisplay: false,
            imageryProvider: undefined,
            baseLayerPicker: false,
        }, options);

        let $viewer = new cesium.Viewer(container, options);
        $viewer._cesiumWidget._creditContainer.style.display = "none";

        return $viewer;
    };

    export default {
        name: "CesiumViewer",
        components: {MapNavigation, ToolkitBox, GeoInfo, GeoSearchBox},
        data() {
            return {
                options: {},
                preloadFunctions: [],
                readyFunctions: []
            };
        },

        methods: {
            defineOption(name, option) {
                Object.defineProperty(this.options, name, {
                    configurable: true,
                    value: option
                });
            },

            getOption(name) {
                if (this.options[name]) {
                    return this.options[name];
                }
                return {};
            },

            registerOnPreload(fn) {
                this.preloadFunctions.push(fn);
            },

            registerOnReady(fn) {
                this.readyFunctions.push(fn);
            },
        },

        mounted() {
            let options = {};
            if (this.preloadFunctions) {
                for (let i = 0; i < this.preloadFunctions.length; i++) {
                    let opt = this.preloadFunctions[i]();
                    if (opt)
                        options = Object.assign(options, opt);
                }
            }

            let $viewer = createCesiumInstance(this.$refs.container, options);

            Object.defineProperties(this, {
                isReady: {
                    get: () => true
                },
                cesiumViewer: {
                    get: () => $viewer
                }
            });

            if (this.readyFunctions) {
                for (let i = 0; i < this.readyFunctions.length; i++) {
                    this.readyFunctions[i](this.cesiumViewer);
                }
            }

            this.$emit("ready", this.cesiumViewer);
        },

        destoryed() {
            if (this.cesiumViewer) {
                this.cesiumViewer.destory();
            }
        }
    }
</script>
