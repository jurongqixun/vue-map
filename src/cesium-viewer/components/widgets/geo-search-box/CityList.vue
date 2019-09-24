<template>
    <div class="cesium-widget-geo-search-box-drop-city-list">
        <ul>
            <li v-for="(i, idx) in this.geoLocations" :key="idx">
                <a href="javascript:void(0);" @click="onCityClick(i)">{{i.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import './CityList.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";

    export default {
        name: "CityList",
        mixins: [CesiumWidgetBase],
        data() {
            return {
                geoLocations: []
            }
        },

        created() {
            let me = this;
            this.registerOnReady(function () {
                let locationProvide = me.getOption("geoLocationProvide");
                if (!locationProvide) {
                    locationProvide = function (countryCode = 'CN', callback) {
                        console.log('not found custom provide function');
                        return callback([]);
                    };
                }

                locationProvide('CN', function (ary) {
                    for (let i = 0; i < ary.length; i++)
                        me.geoLocations.push(ary[i]);
                });
                console.log(me.geoLocations);
            });
        },

        methods: {
            onCityClick(entity) {
                this.$parent.poiData.removeAll();
                this.$parent.poiData.add(entity);
                entity.flyTo();
            }
        }
    }
</script>
