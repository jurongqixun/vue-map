<template>
    <div :class="'cesium-widget-' + this.$options.name" style="display: none !important;">
        <slot/>
    </div>
</template>

<script>
    import CesiumViewerChildren from "@/cesium-viewer/CesiumViewerChildren";

    export default {
        name: "CesiumWidgetBase",
        mixins:[CesiumViewerChildren],
    }
</script>
