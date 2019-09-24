import cesium from 'cesium/Cesium';
import DrawEntity from "./DrawEntity";

export default class SharpFileEntity extends DrawEntity {
    constructor(loadedEntity) {
        super();
        this.merge(loadedEntity);
        this.onMouseOut();
    }

    onMouseOver() {
        if (this.polygon) {
            this.polygon.outline = true;
            this.polygon.outlineColor = cesium.Color.SKYBLUE;
        }
    }

    onMouseOut() {
        if (this.polygon) {
            this.polygon.outline = false;
            this.polygon.outlineColor = cesium.Color.SKYBLUE;
        }
    }
}
