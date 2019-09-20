<script>
    import cesium from 'cesium/Cesium';
    import BaseImageryProvider from "@/cesium-viewer/options/layer-provider/imagery/BaseImageryProvider";

    export default {
        name: "OpenStreetMapImageryProvider",
        mixins: [BaseImageryProvider],

        methods: {
            getProvider() {
                return cesium.createOpenStreetMapImageryProvider({url: 'https://a.tile.openstreetmap.org/'});
            }
        },
    }
</script>
