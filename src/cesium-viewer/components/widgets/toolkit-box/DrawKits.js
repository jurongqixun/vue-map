import cesium from 'cesium/Cesium';

function createMouseTooltip(viewer, ico, msg) {
    let icon = document.createElement("i");
    icon.setAttribute("class", "drawingTooltips-ico feather-icon icon-" + ico);

    let message = document.createElement("div");
    message.setAttribute("class", "drawingTooltips-msg");
    message.innerHTML = msg;

    let tooltip = document.createElement("div");
    tooltip.setAttribute("class", "drawingTooltips");
    tooltip.setAttribute("style", "top:0;left:0;");
    tooltip.appendChild(icon);
    tooltip.appendChild(message);
    viewer.container.appendChild(tooltip);

    let handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (evt) {
        tooltip.style.top = String(evt.startPosition.y + 10) + "px";
        tooltip.style.left = String(evt.startPosition.x + 10) + "px";
    }, cesium.ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
        handler.destory();
    };
}

function drawPoint(viewer, callback) {
    let positions = [];
    let handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    let tooltip = createMouseTooltip(viewer, "map-pin", "点击地图放置标记，点击鼠标[右键]或[ESC]取消。");

    //单击鼠标左键画点
    handler.setInputAction(function (movement) {
        let cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);

        positions.push(cartesian);
        viewer.entities.add({
            position: cartesian,
            point: {
                color: cesium.Color.RED,
                pixelSize: 5,
                heightReference: cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
    }, cesium.ScreenSpaceEventType.LEFT_CLICK);

    //单击鼠标右键结束画点
    handler.setInputAction(function () {
        handler.destroy();
        tooltip();
        callback(positions);
    }, cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

export default {
    drawPoint
}
