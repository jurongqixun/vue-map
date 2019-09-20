<template>
    <div id="app">
        <CesiumViewer ref="viewer" @ready="ready">
            <Home locate="true" longitude="111" latitude="35"/>
            <LayerProviders default-imagery-provider="OpenStreetMap">
                <PlainImageryProvider
                    name="本地" thumbnail-image="http://localhost:9090/logo.png"
                    path="http://localhost:9090/" file-extension="jpg" maximum-level="10"/>
                <OpenStreetMapImageryProvider
                    name="OpenStreetMap"
                    thumbnail-image="http://localhost:9090/openStreetMap.png"/>
            </LayerProviders>
        </CesiumViewer>
    </div>
</template>

<script>
    import CesiumViewer from "@/cesium-viewer/CesiumViewer";
    import Home from "@/cesium-viewer/options/home/Home";
    import LayerProviders from "@/cesium-viewer/options/layer-provider/LayerProviders";
    import PlainImageryProvider from "@/cesium-viewer/options/layer-provider/imagery/PlainImageryProvider";
    import OpenStreetMapImageryProvider
        from "@/cesium-viewer/options/layer-provider/imagery/OpenStreetMapImageryProvider";

    export default {
        name: 'app',
        components: {
            Home, OpenStreetMapImageryProvider, PlainImageryProvider, LayerProviders, CesiumViewer
        },

        methods: {
            ready(viewer) {

            }
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif, Verdana, '微软雅黑', '宋体';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }
</style>
