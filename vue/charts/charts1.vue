<template>
    <div>
        <h1>charts1</h1>
        <hr>
        <div ref="echartsT" class="e-charts"></div>
    </div>
</template>

<script>
const echarts = require('echarts/lib/echarts');
require("echarts/lib/chart/line");

export default {
	data() {
		return {
			option: {
				title: {
					text: '动态数据',
					subtext: '纯属虚构'
				},

				grid: {
					left: '0%',     //设置canvas图距左的距离
					top: '20%',
					right: '10%',
					bottom: '10%'
                },
                toolbox: {
					show: true,
					feature: {
						dataView: {readOnly: false},
						restore: {},
						saveAsImage: {}
					}
                },
                dataZoom: {
					show: false,
					start: 0,
					end: 100
				},
				xAxis: [
					{
						type: 'category',
                        // boundaryGap: ['20%', '20%'],
                        boundaryGap: false,
						axisLine: {
							symbol: 'line'
						},
						data: (function (){
							var res = [];
							var len = 10;
							while (len--) {
								res.push(10 - len - 1);
							}
							return res;
						})()
					}
				],
				yAxis: [
					{
						type: 'value',
						// scale: true,
						name: '预购量',
						position: 'right',
					}
				],
				series: [
					{
						name:'最新成交价',
						type:'line',
						symbol: 'none',
						smooth: true,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#83bff6'},
										{offset: 0.5, color: '#188df0'},
										{offset: 1, color: '#188df0'}
									]
								)
							},
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: 'rgba(88,160,253,1)'
									}, {
										offset: 0.5, color: 'rgba(88,160,253,0.7)'
									}, {
										offset: 1, color: 'rgba(88,160,253,0)'
									}]
								}
							}
						},
						markLine: {
							symbol: ['none', 'none'],
							data: [
								[
									{
										name: 'from lowest to highest',
										type: 'max',
										valueDim: 'x',
										symbol: 'circle',
										symbolSize: 8,
										value: 'y',
										label: {
											normal: {show: false},
											emphasis: {show: false}
										}
									},
									{
										type: 'max',
										valueDim: 'x',
										symbol: 'none',
										symbolSize: 10,
										label: {
											normal: {show: false},
											emphasis: {show: false}
										}
									}
								],
								{
									name: 'min line on close',
									type: 'min',
									valueDim: 'y'
								},
								{
									name: 'max line on close',
									type: 'max',
									symbolOffset: [100,0],
									valueDim: 'y',
									valueIndex: 0,
								}
							]
						},

						data:(function (){
							var res = [];
							var len = 0;
							while (len < 20) {
								res.push((Math.random()*10 + 5).toFixed(1) - 0);
								len++;
							}
							return res;
						})()
					}
				]
			},

		}
	},
	mounted() {
		let echartsDom = this.$refs.echartsT;
		let myChart = echarts.init(echartsDom);
		let app = {};
		app.count = 11;
        window.onresize = myChart.resize; 
        // window.onresize = myChart.resize; 
		setInterval(() => {
			let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
			var data0 = this.$data.option.series[0].data;
			data0.shift();
			// data0.push(Math.round(Math.random() * 1000)+100);
            let val = Math.round(Math.random() * 1000)+100
			data0.push(val);
            console.log(val)
			this.$data.option.xAxis[0].data.shift();
			this.$data.option.xAxis[0].data.push(axisData);

			myChart.setOption(this.option);
		}, 1000);
	}
}
</script>

<style>
.e-charts{
	width: 100%;
  	height: 509px;
}
</style>
