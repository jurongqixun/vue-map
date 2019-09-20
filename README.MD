# vue earth
Vue 包装 Cesium 的地图库

## Vue 组件说明

## npm runs

package.json scripts：
1. local-data-serve: 本地地图资源的 http 服务。
2. serve-d: 开发模式的 http 服务
3. build-d: 发布
4. serve-p: 产品模式的 http 服务
5. build-to-java: 发布到 java 项目的 webapp 中。

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

在开发模式下，需要本地图片资源的支持，请修改 ./local-data.config.js 中的路径，并启动 (1)local-data-serve 脚本

## useful website

1. [http://geojson.io](http://geojson.io) - getjson / topojson, KML, shp 等工具网站
