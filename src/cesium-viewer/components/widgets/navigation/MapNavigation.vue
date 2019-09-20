<script>
    import cesium from 'cesium/Cesium';
    import CesiumNavigation from 'cesium-navigation-es6';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import './MapNavigation.less';

    export default {
        name: "MapNavigation",
        mixins: [CesiumWidgetBase],

        mounted() {
            let me = this;
            let opt = this.getOption("home");

            this.registerOnReady(() => {
                CesiumNavigation(me.getCesiumInstance(), {
                    defaultResetView: cesium.Cartographic.fromDegrees(opt.longitude, opt.latitude, opt.height),
                    enableCompass: true,
                    enableZoomControls: true,
                    enableDistanceLegend: true,
                    enableCompassOuterRing: true,
                });

                let el = document.querySelector(".navigation-control-icon-reset");
                el.innerHTML = "<i class=\"feather-icon icon-home\"></i>";
            });
        }
    }
</script>
