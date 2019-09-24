import cesium from 'cesium/Cesium';
import GeoJson from "../GeoJson.js";
import SharpFileEntity from "./SharpFileEntity";

export default class DrawEntityCollection {
    constructor(viewer, group) {
        this.viewer = viewer;
        this.collection = viewer.entities;
        this.scene = viewer.scene;
        this.handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        this.group = cesium.defaultValue(group, cesium.createGuid());

        this.mousePickedEntity = null;
        this.mouseOverEntity = null;

        let me = this;

        // left down
        this.handler.setInputAction(function (e) {
            let picked = viewer.scene.pick(e.position);
            if (!picked) return;

            let pickedEntity = picked.id;
            if (!pickedEntity.group || pickedEntity.group !== me.group) return;
            if (!pickedEntity.isMovable || !pickedEntity.isMovable()) return;

            viewer.scene.screenSpaceCameraController.enableRotate = false;
            me.mousePickedEntity = pickedEntity;
        }, cesium.ScreenSpaceEventType.LEFT_DOWN);

        // left up
        this.handler.setInputAction(function () {
            if (me.mousePickedEntity === null) return;

            viewer.scene.screenSpaceCameraController.enableRotate = true;
            me.mousePickedEntity = null;
        }, cesium.ScreenSpaceEventType.LEFT_UP);

        // left click
        this.handler.setInputAction(function (e) {
            let picked = viewer.scene.pick(e.position);
            if (!picked) return;

            let pickedEntity = picked.id;
            if (!pickedEntity.group || pickedEntity.group !== me.group) return;

            if (pickedEntity.onMouseClick) {
                pickedEntity.onMouseClick();
            }
        }, cesium.ScreenSpaceEventType.LEFT_CLICK);

        // move
        this.handler.setInputAction(function (e) {
            if (me.mousePickedEntity) {
                let ray = viewer.camera.getPickRay(e.endPosition);
                let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                if (cartesian) {
                    me.mousePickedEntity.position = cartesian;
                    if (me.mousePickedEntity.onMouseMove) {
                        me.mousePickedEntity.onMouseMove(e.endPosition);
                    }
                }
            } else {
                let picked = viewer.scene.pick(e.endPosition);
                if (picked) {
                    let pickedEntity = picked.id;
                    if (!pickedEntity.group || pickedEntity.group !== me.group) return;

                    if (pickedEntity.onMouseOver) {
                        pickedEntity.onMouseOver(e.endPosition);
                        me.mouseOverEntity = pickedEntity;
                    }
                } else {
                    if (me.mouseOverEntity && me.mouseOverEntity.onMouseOut)
                        me.mouseOverEntity.onMouseOut(e.endPosition);
                    me.mouseOverEntity = null;
                }
            }
        }, cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    add(entity) {
        let me = this;

        if (this.group) {
            if (!entity.group) {
                Object.defineProperty(entity, 'group', {
                    get() {
                        return me.group;
                    }
                });
            }
        }

        if (!entity.flyTo) {
            Object.assign(entity, {
                flyTo(options = {}) {
                    me.viewer.flyTo(this, Object.assign({
                        duration: 3,
                        offset: new cesium.HeadingPitchRange(0.0, cesium.Math.toRadians(-180.0))
                    }, options));
                }
            });
        }

        return this.collection.add(entity);
    }

    addAll(entities = []) {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            this.add(entity);
        }
    }

    /**
     *
     * @param {GeoJson} GEO json object
     */
    addFromGeoJson(geoJson) {
        let me = this;
        geoJson.toDataSourceEntities(function (entity) {
            me.add(entity);
        });
    }

    addFromGeoJsonFile(sourceFile, options = {}) {
        let me = this;
        let promise = cesium.GeoJsonDataSource.load(sourceFile, options);
        promise.then(function (entity) {
            me.add(entity);
        });
    }

    addFromShpFile(sourceFile) {
        let me = this;
        let geoJson = GeoJson.fromShpFile(sourceFile);
        geoJson.toDataSourceEntities(function (entity) {
            me.add(new SharpFileEntity(entity));
        });
    }

    remove(entity) {
        if (entity.group === this.group)
            this.collection.remove(entity);
    }

    removeAll() {
        let e = this.collection.values.filter(e => e.group && e.group === this.group);
        for (let i = 0; i < e.length; i++)
            this.collection.removeById(e[i].id);
    }

    getById(id) {
        let entity = this.collection.getById(id);
        if (entity.group && entity.group === this.group)
            return entity;
        return undefined;
    }

    getEntities() {
        return this.collection.values.filter(e => e.group && e.group === this.group);
    }

    destory() {
        this.handler.destroy();
    }
}
