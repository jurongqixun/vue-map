<template>
    <div class="cesium-widget-search-box-container">
        <div class="cesium-widget-search-box-ctrl">
            <div class="cesium-widget-search-box-city">
                <a href="javascript:void(0);" @click="onCityActive">
                    <span ref="city">全国</span>&nbsp;
                    <i class="feather-icon icon-chevron-down" ref="cityIcon"></i>
                </a>
            </div>
            <div class="cesium-widget-search-box-form">
                <input type="text" ref="searchKeyword" value="" placeholder="搜城市、搜地区、搜地点..." @change="onSearchChanged">
                <button type="button" @click="onSearchClick">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                         stroke-linecap="round" stroke-linejoin="round" color="#fff" class="css-i6dzq1">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="cesium-widget-geo-search-box-drop hide" ref="cityDrop">
            <CityList :cities="this.cityResult" @click="onCityClick"/>
        </div>
        <div class="cesium-widget-geo-search-box-drop hide" ref="searchDrop">
            <ul>
                <li>
                    <a href="javascript:void(0);">
                        北京市
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        北京市-东城区
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import './GeoSearchBox.less';
    import cesium from 'cesium/Cesium';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import CityList from "@/cesium-viewer/components/widgets/geo-search-box/CityList";
    //import GeoJson from "@/cesium-viewer/components/geo-search-box/GeoJson";

    export default {
        name: "GeoSearchBox",
        components: {CityList},
        mixins: [CesiumWidgetBase],
        methods: {
            _fly(lng, lat, height = 500000) {
                if (!this.isCesiumReady()) return;

                let viewer = this.getCesiumInstance();
                if (viewer) {
                    let camera = viewer.camera;
                    camera.flyTo({
                        destination: cesium.Cartesian3.fromDegrees(lng, lat, height)
                    });
                }
            },

            onCityActive() {
                let active = this.$refs.cityIcon.classList.contains("icon-chevron-up");

                this.$refs.searchDrop.classList.replace("show", "hide");
                if (active) {
                    this.$refs.cityIcon.classList.replace("icon-chevron-up", "icon-chevron-down");
                    this.$refs.cityDrop.classList.replace("show", "hide");
                } else {
                    this.$refs.cityIcon.classList.replace("icon-chevron-down", "icon-chevron-up");
                    this.$refs.cityDrop.classList.replace("hide", "show");
                }
            },

            onCityClick(city) {
                this._fly(city.lng, city.lat);
            },

            onSearchChanged() {
                this.onSearchClick();
            },

            onSearchClick() {
                let keyword = this.$refs.searchKeyword.value;

                this.$refs.cityIcon.classList.replace("icon-chevron-up", "icon-chevron-down");
                this.$refs.cityDrop.classList.replace("show", "hide");

                if (keyword.length > 0) {
                    this.$refs.searchDrop.classList.replace("hide", "show");
                } else {
                    this.$refs.searchDrop.classList.replace("show", "hide");
                }
            },

            onSearchResultClick(poi) {
                this._fly(poi.lng, poi.lat);
            }
        },

        data() {
            return {
                cityResult: [],
                searchResult: []
            };
        },

        created() {
            this.cityResult.push({
                name: "汕头市",
                lng: -243.3055400848389,
                lat: 23.368416790604133,
            });
        }
    }
</script>
