<template>
    <div class="cesium-widget-toolkit-box-drop-provider">
        <a v-for="(i,idx) in this.providers" :key="idx"
           href="javascript:void(0);"
           @click="onProviderClick(i.name)"
           :title="i.name"
           :class="checkActive(i.name) ? 'active' : ''">
            <img :src="i.thumbnailImage" :alt="i.name"/>
            <label>{{i.name}}</label>
        </a>
    </div>
</template>

<script>
    import './ImageryProviderDrop.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";

    export default {
        name: "ImageryProviderDrop",
        mixins: [CesiumWidgetBase],
        methods: {
            onProviderClick(name) {
                if (!this.isCesiumReady()) return;

                let layerProviders = this.getOption("layerProviders");
                let defaultProvider = layerProviders.defaultImageryProvider;

                if (defaultProvider !== name) {
                    let selectedProvider = layerProviders.imageryProviders.find(p => p.name === name);
                    let imageryLayers = this.getCesiumInstance().scene.imageryLayers;

                    if (selectedProvider && imageryLayers) {
                        imageryLayers.removeAll();
                        imageryLayers.addImageryProvider(selectedProvider.createProvider());
                        this.activeImagery = layerProviders.defaultImageryProvider = selectedProvider.name;
                    }
                }
            },

            checkActive(name) {
                return this.activeImagery === name;
            }
        },

        data() {
            return {
                activeImagery: '',
                providers: []
            };
        },

        mounted() {
            let layerProviders = this.getOption("layerProviders");
            if (layerProviders.imageryProviders) {
                for (let i = 0; i < layerProviders.imageryProviders.length; i++) {
                    let imagery = layerProviders.imageryProviders[i];
                    this.providers.push({name: imagery.name, thumbnailImage: imagery.thumbnailImage});
                }
            }

            if (layerProviders.defaultImageryProvider)
                this.activeImagery = layerProviders.defaultImageryProvider;
        }
    }
</script>
