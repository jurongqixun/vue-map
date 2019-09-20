<template>
    <div class="cesium-widget-geo-search-box-drop-city-list">
        <ul>
            <li v-for="(i, idx) in this.cities" :key="idx">
                <a href="javascript:void(0);" :data-attrs="JSON.stringify(i)" @click="onCityClick(i)">{{i.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "CityList",
        props: {
            cities: Array
        },

        methods: {
            onCityClick(cityObj) {
                this.$emit("click", cityObj);
            }
        }
    }
</script>
