<script>
    import CesiumOptionBase from "@/cesium-viewer/options/CesiumOptionBase";

    export default {
        name: "GeoSearchProvider",
        mixins: [CesiumOptionBase],

        props: {
            custom: {
                type: Function,
                default() {
                    return (keyword) => {
                        console.debug(keyword);
                        return [];
                    };
                }
            }
        },

        methods: {
            provide(country = '') {
                if (this.custom) {
                    return this.custom(country);
                }

                return [];
            }
        },

        created() {
            this.defineOption("geoSearchProvide", this.provide);
        }
    }
</script>
