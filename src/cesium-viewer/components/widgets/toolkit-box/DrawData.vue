<template>
    <div class="cesium-widget-toolkit-box-drop-draw-data">
        <div class="cesium-widget-toolkit-box-drop-draw-data-items">
            <ul class="cesium-widget-toolkit-box-drop-draw-data-item">
                <li>
                    <i class="feather-icon icon-map-pin"></i>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
                <li>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
                <li>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
                <li>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
                <li>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
                <li>
                    <a href="javascript:void(0);">标记名称</a>
                    <div>
                        <a href="javascript:void(0);">编辑</a>
                        <a href="javascript:void(0);">删除</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cesium-widget-toolkit-box-drop-draw-data-buttons">
            <a href="javascript:void(0);" @click="onTrashClick">
                <i class="feather-icon icon-trash-2"></i>
                清除所有
            </a>
            <a href="javascript:void(0);" @click="onExportClick">
                <i class="feather-icon icon-share"></i>
                导出数据
            </a>
            <a href="javascript:void(0);" @click="onImportClick">
                <i class="feather-icon icon-download"></i>
                导入数据
            </a>
        </div>
    </div>
</template>

<script>
    import './DrawData.less';
    import CesiumWidgetBase from "@/cesium-viewer/components/CesiumWidgetBase";

    export default {
        name: "DrawData",
        mixins: [CesiumWidgetBase],

        methods: {
            onTrashClick() {

            },

            onImportClick() {

            },

            onExportClick() {

            }
        },
    }
</script>

<style scoped>

</style>
