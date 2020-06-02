<template>
    <div class="canvas">
        <button class="routerLink"><router-link to="/">跳转至echarts</router-link></button>
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
                yLabel:['1','2','3','4','5','6','7'],
                xLabel:['猪','羊','牛','马','犬','猫','鼠'],
                bars:['2','3','7','3.5','2.2','4.4','5.8'],
                color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
            }
        },
        methods:{
            init() {
                this.zr = zrender.init(document.getElementById('zrender-canvas'));
                this.group = new zrender.Group();
                this.drawBgRect();
                for(let i=0; i<this.xLabel.length; i++){
                    this.drawXLabels(this.xLabel[i],i)
                    this.drawLegend(i,this.color[i]);
                }
                for(let i=0; i<this.yLabel.length; i++){
                    this.drawYLabels(this.yLabel[i],i)
                }
                for(let i=0; i<this.bars.length; i++){
                    this.drawBar(this.bars[i],i,this.color[i])
                }
                this.zr.add(this.group)
            },
            drawBgRect() {
                const bg = new zrender.Rect({
                    shape:{
                        x:0,
                        y:0,
                        width:500,
                        height:400
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
                        height: 390
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
                        x1:50,
                        y1:380,
                        x2:50,
                        y2:150,
                    },
                    z:2,
                    style:{
                        stroke:'#333',
                    }
                });

                const yline =new zrender.Line({
                    shape:{
                        x1:50,
                        y1:380,
                        x2:480,
                        y2:380,
                    },
                    z:2,
                    style:{
                        stroke:'#333'
                    }
                });
                this.group.add(xline);
                this.group.add(yline);
            },
            drawYLabels(text, i){
                const yLabel =new zrender.Text({
                    style:{
                        fontSize:'18',
                        align:'right',
                        text:text
                    },
                    z:2,
                    position: [30,340-30*i]
                });
                this.group.add(yLabel);
                const yTickLine =new zrender.Line({
                    shape:{
                        x1:46,
                        y1:350-30*i,
                        x2:50,
                        y2:350-30*i,
                    },
                    style:{
                        lineWidth:1,
                        stroke:'#000',
                    }
                });
                this.group.add(yTickLine);
                const ySubLine =new zrender.Line({
                    shape:{
                        x1:50,
                        y1:350-30*i,
                        x2:480,
                        y2:350-30*i,
                    },
                    style:{
                        lineWidth:0.4,
                        stroke:'#a6a6a6',
                    }
                });
                this.group.add(ySubLine);
            },
            drawXLabels(text, i){
                const xLabel =new zrender.Text({
                    style:{
                        fontSize:'18',
                        align:'right',
                        text:text
                    },
                    z:2,
                    position: [78+50*i,385]
                });
                this.group.add(xLabel);

            },
            drawBar(value,i,color){
                const bar = new zrender.Rect({
                    shape:{
                        x:0,
                        y:0,
                        width:30,
                        height:0
                    },
                    style:{
                        text:value,
                        fontSize:16,
                        textPosition:'top',
                        fill:color,
                    },
                    position:[70+50*i,380],

                });
                bar.animate('shape',false).when(1000,{height:-30*value}).done().start();
                bar.on('click',(e)=>{

                    console.log(e);
                    const tooltip = new zrender.Rect({
                        shape:{
                            r:[4,4,4,4],
                            x:0,
                            y:0,
                            width:80,
                            height:50
                        },
                        style:{
                            text:`品类:${this.xLabel[i]}\n数量：${value}`,
                            fontSize:16,
                            textPosition:'inside',
                            fill:'#6F6F6F',
                            fontWeight:'bolder',
                            textFill:'#fff',

                        },

                        position:[e.offsetX,e.offsetY],
                    });
                    this.group.add(tooltip);
                    setTimeout(()=>{
                        this.group.remove(tooltip);
                    },1000)

                });
                this.group.add(bar);
            },
            drawLegend(i,color){
                const bar = new zrender.Rect({
                    shape:{
                        x:0,
                        y:0,
                        width:20,
                        height:15
                    },
                    style:{
                        text:this.xLabel[i],
                        fontSize:12,
                        textPosition:'right',
                        fill:color,
                        radius:2
                    },
                    position:[70+50*i,50],
                });
                this.group.add(bar);
            }

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
.routerLink{
    position: fixed;
    right:30px;
    top:30px;
    z-index:2;
}
</style>
