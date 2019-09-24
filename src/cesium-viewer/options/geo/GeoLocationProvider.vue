<script>
    import CesiumOptionBase from "@/cesium-viewer/options/CesiumOptionBase";

    export default {
        name: "GeoLocationProvider",
        mixins: [CesiumOptionBase],

        props: {
            custom: Function,
        },

        methods: {
            provide() {
                if (this.custom && this.custom instanceof Function) {
                    return this.custom;
                }

                return (countryCode = "CN", callback) => {
                    console.debug(countryCode);
                    if (callback) callback([]);
                }
            }
        },

        created() {
            this.defineOption("geoLocationProvide", this.provide());
        },
    }
</script>
