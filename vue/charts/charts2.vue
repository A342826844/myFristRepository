<template>
  <div>
    <!-- <h1>echarts</h1> -->
        <h1>charts</h1>
        <hr>
    <div id="main" ref="echartsT"></div>
  </div>
</template>

<script>

// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// require("echarts/lib/chart/line");
import {throttling1, throttling2} from './tools.js'
var echarts = require('echarts');
export default {
	data() {
		return {
            websock: null,
            myChart: null,
            timer: null,
			option: {
				dataZoom: {
					show: true,
					start: 0,
					end: 100
				},
				grid: {
					left: '0%',     //设置canvas图距左的距离
					top: '10%',
					right: '10%',
					bottom: '10%'
				},
				xAxis: [
					{
						type: 'category',
						// boundaryGap: true,
                        // boundaryGap: [0,'10%'],
						axisLine: {
                            symbol: 'line',
                            // lineStyle:{color:'#dfdfdf'},   // x轴坐标轴颜色
                            // showMaxLabel: true  // 显示最大值
                        },
                        axisTick: {
                            inside: true,
                            alignWithLabel: true
                        },
						data: (function (){
							var res = [];
							var len = 30;
							while (len--) {
                                // res.push(10 - len - 1);
                                res.push('')
							}
							return res;
						})()
					},
				],
				yAxis: [
					{
						type: 'value',
						scale: true,	// 脱离0比例
                        name: '',
                        // show: false,
                        nameGap: 100,
                        position: 'right',
                        showMaxLabel: true,  // 显示最大值                        
						axisLine: {
                            show: false,
                            showMaxLabel: true
                        },
                        axisLabel: {
                            margin: 2,
                        },
						axisTick: {
							show: false
						}
					}
				],
				series: {
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
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
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
                                    type: 'max',
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
                        ]
                    },

                    data: []
                }
			},
		}
    },
    created() {
        this.initWebSocket("wss://i.cg.net/wi/ws");
    },
	mounted() {
		let echartsDom = this.$refs.echartsT;
        console.log(echartsDom)
        // this.myChart.hideLoading();
		this.myChart = echarts.init(echartsDom);
		let app = {};
		app.count = 11;
        window.onresize = this.myChart.resize; 
        this.myChart.setOption(this.option);     
        this.timer = setInterval(() => {
            if(this.websock.readyState === 1) {
                this.websocketsend({event:"subscribe", channel:"xbtc_usdt.index"})
            }
        }, 1000);
        setTimeout(() => {
            this.websock && this.websock.close()
        },60000)
    },
    methods: {
        changeChartsHandle(data) {
            let time = (new Date(data.time)).toLocaleTimeString().replace(/^\D*/,'');
            // let data0 = this.$data.option.series.data.push(data.price);
            // console.log(data,'data')
            this.$data.option.xAxis[0].data.shift();
            this.$data.option.xAxis[0].data.push(time);
            if(this.$data.option.series.data.length > 50) {
                this.$data.option.series.data.shift();
            }
            this.$data.option.series.data.push(data.price);
            this.myChart.setOption(this.$data.option);
        },
        initWebSocket(wsurl) {
            console.log("启动中");
            // let wsurl = "你的websockt url";
            this.websock = new WebSocket(wsurl);
            this.websock.onopen = this.websocketonopen; //连接成功
            this.websock.onmessage = this.websocketonmessage; //广播成功
            this.websock.onerror = this.websocketonerror; //连接断开，失败
            this.websock.onclose = this.websocketclose; //连接关闭
        }, //初始化weosocket
        websocketonopen() {
            console.log("连接成功");
            // this.heatBeat();
            // this.websocketsend({ event: "subscribe", channel: "xbtc_usdt.ticker" });
            // this.websocketsend({ event: "subscribe", channel: "xbtc_usdt.deep" });
            // this.websocketsend({event:"subscribe", channel:"xbtc_usdt.index"})
            // this.websocketsend({event:"subscribe", channel:"xbtc_usdt.trade"})
            // this.websocketsend({event:"subscribe", channel:"btc_usdt.candle.M15"})
            
        }, //连接成功
        websocketonerror() {
            console.log("连接失败");
        }, //连接失败
        websocketclose() {
            console.log("断开连接");
        }, //各种问题导致的 连接关闭
        //数据接收
        websocketonmessage(data) {
            var resdata = JSON.parse(data.data);
            // 指数价
            if(resdata["type"] === "xbtc_usdt.index") {
                // console.log(resdata,'index')
                this.websocketsend({event:"unsubscribe", channel:"xbtc_usdt.index"})
                this.changeChartsHandle(resdata.data)
                // throttling1(() => {
                //     this.changeChartsHandle(resdata.data)
                // },5000)
            } 
            // console.log(this)
            // console.log(resdata)
        },
            //数据发送
        websocketsend(data) {
            this.websock.send(JSON.stringify(data));
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
