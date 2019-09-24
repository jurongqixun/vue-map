import cesium from 'cesium/Cesium';

export default class DrawEntity extends cesium.Entity {
    constructor(options) {
        super(options);
    }

    isMovable() {
        return false;
    }

    onMouseClick() {
    }

    onMouseMove() {
    }

    onMouseOver() {
    }

    onMouseOut() {

    }

    getChildren() {
        return this._children;
    }

    addChildren(entities = []) {
        for (let i = 0; i < entities.length; i++) {
            let e = entities[i];
            e.parent = this;
        }
    }

    removeChildren(entities = []) {
        for (let i = 0; i < entities.length; i++) {
            let e = entities[i];
            e.parent = undefined;
        }
    }
}
