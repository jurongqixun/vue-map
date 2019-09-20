<script>
    import cesium from 'cesium/Cesium';
    import BaseImageryProvider from "@/cesium-viewer/options/layer-provider/imagery/BaseImageryProvider";

    const defaultValue = cesium.defaultValue;
    const WebMercatorTilingScheme = cesium.WebMercatorTilingScheme;
    const UrlTemplateImageryProvider = cesium.UrlTemplateImageryProvider;

    export default {
        name: "PlainImageryProvider",
        mixins: [BaseImageryProvider],
        props: {
            path: {type: String, required: true},

            fileExtension: {type: String, default: 'png'},
            tileWidth: {type: [String, Number], default: 256},
            tileHeight: {type: [String, Number], default: 256},

            minimumLevel: {type: [String, Number], default: 0},
            maximumLevel: {type: [String, Number], default: 10},
        },
        methods: {
            getProvider() {
                let urlPath = this.path;
                if (!urlPath.endsWith("/")) {
                    urlPath += "/";
                }

                let fileExtension = defaultValue(this.fileExtension, 'png');
                let tileWidth = defaultValue(this.tileWidth, 256);
                let tileHeight = defaultValue(this.tileHeight, 256);
                let minimumLevel = defaultValue(this.minimumLevel, 0);
                let maximumLevel = defaultValue(this.maximumLevel, 8);
                let tilingScheme = new WebMercatorTilingScheme({});
                let rectangle = tilingScheme.rectangle;

                return new UrlTemplateImageryProvider({
                    url: urlPath + "{z}/{x}/{reverseY}." + fileExtension,
                    tilingScheme: tilingScheme,
                    rectangle: rectangle,

                    tileWidth: tileWidth,
                    tileHeight: tileHeight,
                    minimumLevel: minimumLevel,
                    maximumLevel: maximumLevel,
                });
            }
        },
    }
</script>
