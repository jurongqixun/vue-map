<template>
    <MouseTooltip :show="this.active" ref="tip">
        点击地图放置标记，点击鼠标[右键]或[ESC]取消。
    </MouseTooltip>
</template>

<script>
    //https://www.jianshu.com/p/416d432cd83b
    export default {
        name: "DrawLineKit"
    }
</script>

<style scoped>

</style>
