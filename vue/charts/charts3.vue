<template>
    <div>
        <!-- <h1>echarts</h1> -->
        <div id="main" ref="echartsT"></div>
    </div>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        const  that = this;
        return {
            data:  [],
            now:  +new Date(1997, 9, 3),
            oneDay:  24 * 3600 * 1000,
            value:  Math.random() * 1000,
            option: {
                title: {
                    text: '动态数据 + 时间坐标轴'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: that.date
                }]
            }
        }
    },
    mounted() {
        let echartsDom = this.$refs.echartsT;
        let myChart = echarts.init(echartsDom);
        for (var i = 0; i < 1000; i++) {
            this.data.push(this.randomData());
        }
        myChart.setOption(this.$data.option);
        setInterval( () => {

            for (var i = 0; i < 1; i++) {
                this.data.shift();
                this.data.push(this.randomData());
            }

            myChart.setOption({
                series: [{
                    data: this.data
                }]
            });
        }, 100);
    },
    methods: {
        randomData() {
            this.now = new Date(+this.now + this.oneDay);
            this.value = this.value + Math.random() * 21 - 10;
            return {
                name: this.now.toString(),
                value: [
                    [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
                    Math.round(this.value)
                ]
            }
        }
    }
}
</script>

<style>
#main{
	width: 100%;
  	height: 509px;
}
</style>