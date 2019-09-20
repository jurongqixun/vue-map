<script>
    import cesium from 'cesium/Cesium';
    import CesiumOptionBase from "@/cesium-viewer/options/CesiumOptionBase";

    export default {
        name: "BaseImageryProvider",
        mixins: [CesiumOptionBase],

        props: {
            name: {
                type: String,
                required: true,
            },

            thumbnailImage: String
        },

        methods: {
            /**
             * plz override in extended classes
             */
            getProvider() {
                return cesium.createOpenStreetMapImageryProvider({url: 'https://a.tile.openstreetmap.org/'});
            },
        },

        created() {
            if (this.$parent && this.$parent.$options.name === 'LayerProviders') {
                let opt = {
                    name: this.name,
                    thumbnailImage: this.thumbnailImage,
                    createProvider: this.getProvider
                };
                this.$parent.addImageryProvider(opt);
                //console.log(opt);
            }
        }
    }
</script>
