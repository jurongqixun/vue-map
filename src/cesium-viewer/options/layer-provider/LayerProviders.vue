<script>
    import CesiumOptionBase from "@/cesium-viewer/options/CesiumOptionBase";

    export default {
        name: "LayerProviders",
        mixins: [CesiumOptionBase],

        props: {
            defaultImageryProvider: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                imageryProviders: [],
                terrainProviders: []
            };
        },

        methods: {
            addImageryProvider(o) {
                this.imageryProviders.push(o);
            },

            addTerrainProvider(o) {
                this.terrainProviders.push(o);
            }
        },

        created() {
            this.defineOption("layerProviders", {
                defaultImageryProvider: this.defaultImageryProvider,
                imageryProviders: this.imageryProviders,
                terrainProviders: this.terrainProviders
            });

            let me = this;
            this.registerOnPreload(function () {
                let imageryProvider;

                if (me.imageryProviders && me.imageryProviders.length) {
                    let provider = me.imageryProviders.find(p => p.name === me.defaultImageryProvider);
                    if (!provider) {
                        imageryProvider = me.imageryProviders[0].createProvider();
                    } else {
                        imageryProvider = provider.createProvider();
                    }
                }

                if (imageryProvider) {
                    return {
                        imageryProvider,
                    };
                }

                return {};
            });
        }
    }
</script>
