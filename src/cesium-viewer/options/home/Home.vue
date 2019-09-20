<script>
    import cesium from 'cesium/Cesium';
    import CesiumOptionBase from "@/cesium-viewer/options/CesiumOptionBase";

    // note: has error
    //
    // async function getGeoLocation() {
    //     //let lng = 111, lat = 35;
    //     let result = await new Promise(resolve => {
    //         if (window && window.navigator && window.navigator.geolocation) {
    //             console.log("window.navigator.geolocation.getCurrentPosition()=>");
    //             window.navigator.geolocation.getCurrentPosition(
    //                 // success
    //                 position => {
    //                     let lng = position.coords.longitude;
    //                     let lat = position.coords.latitude;
    //                     console.log(`promise lng=${lng}  lat=${lat}`);
    //                     resolve({success: true, lng: lng, lat: lat});
    //                 },
    //                 // error
    //                 error => {
    //                     console.log(error);
    //                     resolve({success: false, lng: 0, lat: 0});
    //                 });
    //         } else {
    //             resolve({success: false, lng: 0, lat: 0});
    //         }
    //     });
    //
    //     console.log(result);
    //     return result;
    // }

    export default {
        name: "Home",
        mixins: [CesiumOptionBase],

        props: {
            locate: {type: [String, Boolean], default: false},
            longitude: {type: [String, Number], default: 0},
            latitude: {type: [String, Number], default: 0},
            height: {type: [String, Number], default: 5000000.0}
        },

        created() {
            //let locate = Boolean(this.locate);
            let height = Number(this.height);
            let lng = Number(this.longitude);
            let lat = Number(this.latitude);
            let cartesian3 = cesium.Cartesian3.fromDegrees(lng, lat, height);

            // if (locate) {
            //     let o = getGeoLocation();
            //     lng = o.lng;
            //     lat = o.lat;
            // }

            this.defineOption("home", {
                longitude: lng,
                latitude: lat,
                height: height,
                cartesian3: cartesian3,
                locate: {
                    longitude: lng,
                    latitude: lat,
                    success: false,
                }
            });

            this.registerOnReady(function (viewer) {
                // viewer.camera.flyTo({
                //     destination: cartesian3
                // });
                viewer.scene.camera.setView({
                    destination: cartesian3
                });
            })
        },

        mounted() {
            if (Boolean(this.locate) && window && window.navigator && window.navigator.geolocation) {
                let opt = this.getOption("home");
                window.navigator.geolocation.getCurrentPosition(
                    position => {
                        let lng = position.coords.longitude;
                        let lat = position.coords.latitude;

                        opt.locate.longitude = lng;
                        opt.locate.latitude = lat;
                        opt.locate.success = true;
                    });
            }
        }
    }
</script>
