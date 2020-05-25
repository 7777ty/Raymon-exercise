<template>
    <div class="canvas">
        <div id="zrender-canvas"></div>

    </div>
</template>

<script>
    import zrender from 'zrender'
    export default{
        data(){
            return {
                zr:null,
                group:null,
            }
        },
        methods:{
            init() {
                this.zr = zrender.init(document.getElementById('zrender-canvas'));
                this.group = new zrender.Group();
                this.drawBgRect();
                this.zr.add(this.group)
            },
            drawBgRect() {
                const bg = new zrender.Rect({
                    shape:{
                        x:0,
                        y:0,
                        width:500,
                        height:300
                    },
                    style:{
                        fill:'blue',

                    },
                    position:[10,10]
                });
                this.group.add(bg);

                const roundRect = new zrender.Rect({
                    shape:{
                        cx:0,
                        cy:0,
                        width:490,
                        height: 290
                    },
                    style: {
                        stroke:'#333',
                        fill:'#fff'
                    },
                    position: [15,15]
                });
                this.group.add(roundRect);

                const xline =new zrender.Line({
                    shape:{
                        x1:30,
                        y1:290,
                        x2:30,
                        y2:50,
                    },
                    style:{
                        stroke:'#333'
                    }
                });
                const yline =new zrender.Line({
                    shape:{
                        x1:30,
                        y1:290,
                        x2:480,
                        y2:290,
                    },
                    style:{
                        stroke:'#333'
                    }
                });
                this.group.add(xline);
                this.group.add(yline);
            },
        },
        mounted() {
            this.init();

        }
    }
</script>

<style lang='scss' scoped>
#zrender-canvas{
    height: 700px;
}
</style>
