<template>
    <PopoverEditor :reference="this.reference" :icon="this.icon" title="标记编辑" @save="onSave" @remove="onRemove">
        <table>
            <tr>
                <th>名称</th>
                <td>
                    <input type="text" maxlength="20" ref="name" value="" placeholder="请输入标记名称">
                </td>
                <td rowspan="3"></td>
            </tr>
            <tr>
                <th>说明</th>
                <td>
                    <textarea rows="5" ref="remark" placeholder="请输入标记说明"></textarea>
                </td>
            </tr>
            <tr>
                <th>图标</th>
                <td>
                    <div class="scroll-selector" style="width: 270px;">
                        <div class="scroll-selector-content">
                            <img src="@/assets/placeholder/1.png" width="16" height="16" @click="onPointSelect">
                            <img src="@/assets/placeholder/2.png" width="16" height="16" @click="onPointSelect">
                            <img src="@/assets/placeholder/3.png" width="16" height="16" @click="onPointSelect">
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </PopoverEditor>
</template>

<script>
    import cesium from 'cesium/Cesium';
    import PopoverEditor from "@/cesium-viewer/components/widgets/toolkit-box/draw-editor/PopoverEditor";

    class PointEntity extends cesium.Entity {
        constructor(pointerImage) {
            super();
        }
    }

    export default {
        name: "PointEditor",
        components: {PopoverEditor},

        props: {
            reference: String,
            icon: String,
            title: String,
            data: String
        },

        methods: {
            onPointSelect(event) {
                let src = event.target.getAttribute("src");

            },

            onSave() {

            },

            onRemove() {

            }
        }
    }
</script>
