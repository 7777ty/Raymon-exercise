<template>
    <div>
        <button><router-link to="/calculator">跳转至计算器</router-link></button>
        <v-chart :options="chart1"></v-chart>
        <v-chart :options="chart2"></v-chart>
        <v-chart :options="chart3"></v-chart>
    </div>
</template>

<script >
    import ECharts from 'vue-echarts';
    import "echarts/lib/chart/bar";
    import "echarts/lib/chart/pie";
    import "echarts/lib/chart/scatter"
    import "echarts/lib/component/legend"
    import "echarts/lib/component/title"
    import "echarts/lib/component/tooltip"
    export default{
        components:{
            'v-chart':ECharts,
        },
        data(){
          return{
              chart1: {
                  legend: {},
                  tooltip: {show:'true', trigger:'item'},
                  title:{
                      text:"各茶叶历年销货量"
                  },
                  dataset: {
                      source: [
                          ['product', '2015', '2016', '2017','历年合计'],
                          ['普洱', 43.3, 85.8, 93.7,222.8],
                          ['白茶', 83.1, 73.4, 55.1,211.6],
                          ['绿茶', 86.4, 65.2, 82.5,225.1],
                          ['红茶', 72.4, 53.9, 39.1,165.4]
                      ]
                  },
                  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                  xAxis: {type: 'category'},
                  // 声明一个 Y 轴，数值轴。
                  yAxis: {gridIndex: 0},
                  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                  series: [
                      {type: 'bar'},
                      {type: 'bar'},
                      {type: 'bar'},
                  ]

              },
              chart2: {
                  title:{
                      text:'2015到2017年各种茶叶总销货量',
                      textOffsetY:'-10px',
                  },
                  legend: {
                      top:"40"
                  },
                  tooltip: {},
                  dataset: {
                      source: [
                          ['product','历年合计'],
                          ['普洱',222.8],
                          ['白茶',211.6],
                          ['绿茶',225.1],
                          ['红茶',165.4]
                      ]
                  },
                  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                  series: [
                      {
                          color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                          type: 'pie',
                          id: 'pie',
                          radius: '30%',
                          label: {
                              normal: {

                                  position: 'outer',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                                  // {a}指series.name  {b}指series.data的name
                                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
                                  formatter: '{b}{d}%'
                              }
                          },
                          encode: {
                              itemName: 'product',
                              value: '历年合计',
                          }
                      }
                  ]

              },
              chart3:{
                  legend: {},
                  tooltip: {},
                  xAxis: {type: 'category'},
                  // 声明一个 Y 轴，数值轴。
                  yAxis: {},
                  dataset: {
                      source: [
                          ['product', '各茶叶售货量','售价'],
                          ['普洱', 10.0, 8.04],
                          ['白茶', 8.0, 6.95],
                          ['绿茶', 13.0, 7.58],
                          ['红茶', 9.0, 8.81],
                          ['水仙', 11.0, 8.33],
                          ['龙井', 14.0, 9.96],
                          ['大红袍', 6.0, 7.24],
                      ]
                  },
                  series:[
                      {
                          type: 'scatter',
                          symbolSize:  (rawValue)=>{
                              return rawValue[1]*2;
                          },
                      },
                      {
                          type: 'scatter',
                          symbolSize:  (rawValue)=>{
                              return rawValue[2]*2;
                          },
                      },
                  ]
              }
          }
        }
    }
</script>

<style lang='scss' scoped>
    button{
        position: fixed;
        right:30px;
        top:30px;
    }
</style>
