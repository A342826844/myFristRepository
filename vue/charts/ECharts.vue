<template>
  <div>
    <!-- <h1>echarts</h1> -->
    <div id="main" ref="echartsT"></div>
  </div>
</template>

<script>

// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// require("echarts/lib/chart/line");
var echarts = require('echarts');
export default {
	data() {
		return {
			option: {
				title: {
					text: '动态数据',
					subtext: '纯属虚构'
				},
				// tooltip: {
				// 	trigger: 'axis',
				// 	axisPointer: {
				// 		type: 'cross',
				// 		label: {
				// 			backgroundColor: '#283b56'
				// 		}
				// 	}
				// },
				legend: {
					data:['最新成交价', '预购队列']
				},
				dataZoom: {
					show: false,
					start: 0,
					end: 100
				},
				grid: {
					left: '0%',     //设置canvas图距左的距离
					top: '20%',
					right: '10%',
					bottom: '10%'
				},
				xAxis: [
					{
						type: 'category',
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
					},
				],
				// xAxis: {
				// 	type: 'time',
				// 	splitLine: {
				// 		show: false
				// 	}
				// },
				yAxis: [
					{
						type: 'value',
						scale: true,	// 脱离0比例
						name: '',
						// max: 1200,
						// min: 0,
						position: 'right',
						// boundaryGap: [0.2, 0.2],
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false
						}
					}
				],
				series: [
					{
						name:'最新成交价',
						type:'line',
						symbol: 'circle',
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
							
							emphasis: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#2378f7'},
										{offset: 0.7, color: '#2378f7'},
										{offset: 1, color: '#83bff6'}
									]
								)
							}
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
										text: '11',
										label: {
											normal: {show: false},
											emphasis: {show: false}
										}
									},
									{
										type: 'min',
										valueDim: 'x',
										symbol: 'none',
										symbolSize: 10,
										value: '0',
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
									name: 'min line on close',
									type: 'max',
									valueDim: 'y'
								},
								// {
								// 	name: 'max line on close',
								// 	type: 'max',
								// 	symbolOffset: [100,0],
								// 	valueDim: 'y',
								// 	valueIndex: 0,
								// }
							]
						},

						data:(function (){
							var res = [];
							var len = 0;
							while (len < 20) {
								// res.push((Math.random()*10 + 5).toFixed(1) - 0);
								res.push('')
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
		console.log(echartsDom)
		let myChart = echarts.init(echartsDom);
		let app = {};
		app.count = 11;
		window.onresize = myChart.resize; 
		setInterval(() => {
			let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
			var data0 = this.$data.option.series[0].data;
			// var data1 = this.$data.option.series[1].data;
			data0.shift();
			// data0.push(Math.round(Math.random() * 1000)+100);
			 let val = Math.round(Math.random() * 1000)+100
			data0.push(val);
            console.log(val)
			// data1.shift();
			// data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

			this.$data.option.xAxis[0].data.shift();
			this.$data.option.xAxis[0].data.push(axisData);
			// this.$data.option.xAxis[1].data.shift();
			// this.$data.option.xAxis[1].data.push(app.count++);

			myChart.setOption(this.option);
		}, 1000);
	}
}
</script>

<style>
#main{
	width: 100%;
  	height: 509px;
}
</style>
