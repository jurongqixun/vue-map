<template>
    <div class="cesium-widget-popover-editor" ref="editor">
        <div class="arrow"></div>
        <div class="cesium-widget-popover-editor-title">
            <i :class="'feather-icon icon-'+this.icon"></i>
            {{this.title}}
            <button type="button" @click="onCloseClick">
                <i class="feather-icon icon-x-square"></i>
            </button>
        </div>
        <div class="cesium-widget-popover-editor-content">
            <slot/>
        </div>
        <div class="cesium-widget-popover-editor-button">
            <button type="button" @click="onSave">保存</button>
            <button type="button" @click="onRemove">删除</button>
        </div>
    </div>
</template>

<script>
    import popper from 'popper.js';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";
    import './PopoverEditor.less';

    export default {
        name: "PopoverEditor",
        mixins: [CesiumWidgetBase],

        props: {
            icon: {type: String, default: "edit"},
            title: {type: String, default: "标记编辑"},
            reference: {type: String, required: true}
        },

        methods: {
            onCloseClick() {
                this.$refs.editor.style.display = 'none';
            },

            onSave() {
                this.$emit("save");
            },

            onRemove() {
                this.$emit("remove");
            }
        },

        mounted() {
            let ref = document.querySelector(this.reference);
            let p = new popper(ref, this.$refs.editor, {
                placement: 'right',
                positionFixed: true,
                eventsEnabled: false,
                removeOnDestroy: true,
            });

            p.scheduleUpdate();

            Object.defineProperty(this, "popper", {
                configurable: true,
                value: p
            });
        },

        destoryed() {
            this.popper.destory();
        }
    }
</script>
