import cesium from 'cesium/Cesium';

export default (function () {
    const _collectionGroup = "__traffic_info__";

    function TrafficInfo(viewer) {
        this._viewer = viewer;
        this._collection = viewer.entities;
    }

    TrafficInfo.prototype.load = function () {
        let json = require('./traffic-example.json'); // for example

        for (let i = 0; i < json.result.traffic.trendInfo.length; i++) {
            let trendInfo = json.result.traffic.trendInfo[i];
            //let trendText = json.result.traffic.trafficText[i]; // 路况信息

            for (let j = 1; j < trendInfo.length; j++) {
                let trendInfoPrev = trendInfo[j - 1];
                let trendInfoItem = trendInfo[j];
                let trendColor = cesium.Color.GREEN;

                switch (trendInfoItem.TT) {
                    default:
                    case 1:
                        trendColor = cesium.Color.GREEN;
                        break;

                    case 2:
                        trendColor = cesium.Color.YELLOW;
                        break;

                    case 3:
                        trendColor = cesium.Color.ORANGE;
                        break;

                    case 4:
                        trendColor = cesium.Color.GRAY;
                        break;

                    case 5:
                        trendColor = cesium.Color.RED;
                        break;
                }
                //1:畅通,2:缓行,3:拥堵,4:无路况,5: 严重拥堵

                let e = this.addEntity(
                    trendInfoPrev.IL, trendInfoPrev.IB,
                    trendInfoItem.IL, trendInfoItem.IB,
                    trendInfoPrev.IN, trendColor);
                if (i === 0 && j === 0) {
                    e.flyTo();
                }
            }
        }
    };

    TrafficInfo.prototype.addEntity = function (lngS, latS, lngE, latE, text, color) {
        console.log("TrafficInfo.prototype.addEntity");
        if (!lngS || !latS || !lngE || !latE) {
            throw new cesium.DeveloperError('lng lat cannot null');
        }

        let me = this;
        let entity = new cesium.Entity({
            name: text,
            position: cesium.Cartesian3.fromDegrees(lngS, latS, 500),

            polyline: {
                positions: [cesium.Cartesian3.fromDegrees(lngS, latS, 500), cesium.Cartesian3.fromDegrees(lngE, latE, 500)],
                width: 50,
                material: color,
                clampToGround: true,
            },

            label: {
                text: text,
                font: '18px sans-serif',
                style: cesium.LabelStyle.FILL_AND_OUTLINE,
                showBackground: true,
            }
        });

        Object.defineProperty(entity, "group", {
            get() {
                return _collectionGroup;
            }
        });

        Object.assign(entity, {
            flyTo() {
                let options = {
                    duration: 3,
                    offset: new cesium.HeadingPitchRange(0.0, cesium.Math.toRadians(-180.0))
                };

                me._viewer.flyTo(this, options);
            }
        });

        this._collection.add(entity);
        return entity;
    };

    TrafficInfo.prototype.clear = function () {
        let e = this._collection.values.filter(e => e.group && e.group === _collectionGroup);
        for (let i = 0; i < e.length; i++)
            this._collection.removeById(e[i].id);
    };

    return TrafficInfo;
})();
