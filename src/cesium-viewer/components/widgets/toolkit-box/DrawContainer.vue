<template>
    <div class="cesium-widget-draw-container">
        <slot/>
        <MouseTooltip ref="tooltip" :show="false" />
    </div>
</template>

<script>
    import './DrawContainer.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import entities from '@/cesium-viewer/util/entities';
    import MouseTooltip from "@/cesium-viewer/components/widgets/toolkit-box/draw-kits/MouseTooltip";
    //import uuid from 'uuid';

    export default {
        name: "DrawContainer",
        components: {MouseTooltip},
        mixins: [CesiumWidgetBase],

        methods: {
            loadFromShp() {

            },

            add(entity) {
                if (this.drawData) {
                    this.drawData.add(entity);
                }
            },

            addAll(entities = []) {
                if (this.drawData) {
                    this.drawData.addAll(entities);
                }
            },
        },

        mounted() {
            let me = this;
            this.registerOnReady(function (viewer) {
                Object.defineProperty(me, 'drawData', {
                    configurable: true,
                    value: new entities.DrawEntityCollection(viewer)
                });
            });
        },

        destoryed() {
            this.drawData.destory();
        }
    }
</script>
