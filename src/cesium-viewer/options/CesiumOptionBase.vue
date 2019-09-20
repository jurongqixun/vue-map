<template>
    <i :class="'cesium-option cesium-option-'+this.$options.name" ref="option">
        <slot/>
    </i>
</template>

<script>
    import CesiumViewerChildren from "@/cesium-viewer/CesiumViewerChildren";

    export default {
        name: "CesiumOptionBase",
        mixins: [CesiumViewerChildren],
    }
</script>
