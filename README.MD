# vue earth
Vue 包装 Cesium 的地图库

## Vue 组件说明

## npm runs

package.json scripts：
1. local-data-serve: 本地地图资源的 http（http://localhost:9090） 服务，用于开发调试。
2. serve-d: 开发模式的 http 服务
3. build-d: 发布到 dist 目录
4. serve-p: 产品模式的 http 服务

## example

```vue
<template>
    <div id="app">
        <CesiumViewer ref="viewer" @ready="ready">
            <Home locate="true" longitude="111" latitude="35"/>
            <LayerProviders default-imagery-provider="OpenStreetMap">
                <PlainImageryProvider name="本地" thumbnail-image="http://localhost:9090/logo.png" path="http://localhost:9090/" file-extension="jpg" maximum-level="10"/>
                <OpenStreetMapImageryProvider name="OpenStreetMap" thumbnail-image="http://localhost:9090/openStreetMap.png"/>
            </LayerProviders>
        </CesiumViewer>
    </div>
</template>
```

更多的例子请参考 [./src/App.vue](./src/App.vue)

## useful website

1. [http://geojson.io](http://geojson.io) - geo json / topo json, KML, shp 等工具网站
2. [https://mapshaper.org/](https://mapshaper.org/) - convert shp file to geo json, topo json, cvs..
