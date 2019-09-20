<template>
    <div style="display: none !important;">
        <slot />
    </div>
</template>

<script>
    export default {
        name: "CesiumViewerChildren",
        methods: {
            getViewer() {
                let p = this.$parent;
                do {
                    if (p.$options.name === 'CesiumViewer') {
                        return p;
                    }

                    p = p.$parent;
                }
                while (p);
                return undefined;
            },

            isCesiumReady() {
                let p = this.getViewer();
                return p && p.cesiumViewer && p.isReady;
            },

            getCesiumInstance() {
                let p = this.getViewer();
                if (p && p.cesiumViewer && p.isReady) {
                    return p.cesiumViewer;
                }

                return undefined;
            },

            registerOnPreload(fn) {
                let p = this.getViewer();
                if (p && p.registerOnPreload) {
                    p.registerOnPreload(fn);
                }
            },

            registerOnReady(fn) {
                let p = this.getViewer();
                if (p && p.registerOnReady) {
                    p.registerOnReady(fn);
                }
            },

            getOption(name) {
                let p = this.getViewer();
                if (p)
                    return p.getOption(name);
                return {};
            },

            defineOption(name, option) {
                let p = this.getViewer();
                if (p)
                    p.defineOption(name, option);
            }
        },
    }
</script>
