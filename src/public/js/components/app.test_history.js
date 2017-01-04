/**
 * Created by Ian on 2015/8/18.
 */

(function () {
    window['UI'] = window['UI'] || {};
    window.UI.c$ = window.UI.c$ || {};
})();

(function () {
    var c$ = {};
    c$ = $.extend(window.UI.c$, {});
    var b$ = window.BS.b$;
    var _MC = c$.MessageCenter;

    
    /// 临时历史记录
    c$.TmpHistory = {
        data: [],          // 临时历史的数据容器
        maxCount: 25,      // 临时历史数据最多条数
        
        /// 图表选项
        chartOption: {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        show: true,
                        title: {
                            zoom: 'Regional Scale',
                            back: 'Regional Scale - back'
                        }
                    },
                    dataView: {
                        show: false,
                        title: 'Data View'
                    },
                    magicType: {
                        show: true,
                        title: {
                            line: 'Line Chart',
                            bar: 'Column Chart',
                            stack: 'accumulation',
                            tiled: 'Tile'
                        },
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true,
                        title: 'Restore',
                        color: 'black'
                    },
                    saveAsImage: {
                        show: false,
                        title: 'Save as image'
                    }
                }
            },
            calculable: false,
            legend: {
                data: ['DL(Mbps)', 'UP(Mbps)', 'Ping', 'DL(Max Mbit/s)', 'UP(Max Mbit/s)']
            },
            dataZoom: [{
                type: 'inside'
            }, {
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Mbps',
                    axisLabel: {
                        formatter: '{value} Mbps'
                    }
                },
                {
                    type: 'value',
                    name: 'Response',
                    axisLabel: {
                        formatter: '{value} ms'
                    }
                }
            ],
            series: [
                {
                    name: 'DL(Mbps)',
                    type: 'bar',
                    yAxisIndex: 0,
                    itemStyle:{
                        normal:{
                            color: '#fd7c52'
                        }
                    },
                    data: []
                },
                {
                    name: 'UP(Mbps)',
                    type: 'bar',
                    yAxisIndex: 0,
                    itemStyle:{
                        normal:{
                            color:'#89cdfa'
                        }
                    },
                    data: []
                },
                {
                    name: 'Ping',
                    type: 'line',
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color:'#d367cc'
                        }
                    },
                    data: []
                },
                {
                    name: 'DL(Max Mbit/s)',
                    type:'line',
                    itemStyle:{
                        normal:{
                            color: 'rgba(15, 70, 131, 0.5)'
                        }
                    },
                    smooth:true,
                    sampling: 'average',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(15, 158, 68, 0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(15, 70, 131, 0.5)'
                            }])
                        }
                    },
                    data: []
                },
                {
                    name: 'UP(Max Mbit/s)',
                    type:'line',
                    itemStyle:{
                        normal:{
                            color: 'rgba(125, 70, 50, 0.5)'
                        }
                    },
                    smooth:true,
                    sampling: 'average',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(125, 158, 68, 0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(125, 70, 50, 0.5)'
                            }])
                        }
                    },
                    data: []
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        },
        
        /// 创建图表, 绘制图表
        drawChart: function () {
            var t = this;
            try {
                var ele = $('#history-canvas');
                if (ele.length == 0) return;

                var uiChart = echarts.init(ele[0]);

                t.chartOption.xAxis[0].data = []; // 时间
                t.chartOption.series[0].data = []; // 下载速度
                t.chartOption.series[1].data = []; // 上传速度
                t.chartOption.series[2].data = []; // Ping的响应时间
                t.chartOption.series[3].data = []; // DL(Max)
                t.chartOption.series[4].data = []; // UP(Max)

                $.each(t.data, function (index, obj) {
                    t.chartOption.xAxis[0].data.push(obj.time);      // 时间
                    t.chartOption.series[0].data.push(obj.download); // 下载速度
                    t.chartOption.series[1].data.push(obj.upload);   // 上传速度
                    t.chartOption.series[2].data.push(obj.ping);     // Ping的响应时间
                    t.chartOption.series[3].data.push(obj.dlMax);;   // DL(Max)
                    t.chartOption.series[4].data.push(obj.upMax);    // UP(Max)
                });

                uiChart.setOption(t.chartOption, false);
            } catch (e) {
                console.error(e);
                $.reportErrorInfo(e);
            }
        },
        
        
        /// 添加图表中的数据
        add: function (newObj) {
            var t = this;
            t.data.push(newObj);
            if (t.data.length > t.maxCount) {
                t.data.shift(); // 移除最前面的一个元素
            }
            t.drawChart();
            
            _MC.send("TmpHistory.haveData");
        },
        
        /// 清空图表中的数据
        clear: function () {
            var t = this;
            t.data.length = 0;
            t.drawChart();
        },
        
        /// 打开Windows
        openWindow: function () {
            var t = this;
            var historyWindow = $('#history-window');
            if (!historyWindow.data('kendoWindow')) {
                historyWindow.kendoWindow({
                    actions: ["Close"],
                    title: "Temp History (Most " + t.maxCount + " Records)",
                    modal: false,
                    resizable: false
                });

                var historyTmplate = kendo.template($('#template-window-history').html());
                historyWindow.html(historyTmplate({}));

                t.drawChart();
            }

            var w = historyWindow.data("kendoWindow");
            w.center();
            w.open();
        }
    };
    
    /// 全部历史记录
    c$.FullHistory = {
        data: [],   // 历史的数据容器
       
        /// 图表选项
        chartOption: {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['DL(Mbps)', 'UP(Mbps)', 'DL(Max)', 'UP(Max)']
            },
            toolbox: { /// 图表工具栏选项
                show: true,
                feature: {
                    myClearTool: {
                        show: true,
                        title: 'Clear History',
                        icon: 'path://M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z',
                        onclick: function () {
                            c$.FullHistory.clear();
                        }
                    },
                    dataZoom: {
                        show: true,
                        title: {
                            zoom: 'Regional Scale',
                            back: 'Regional Scale - back'
                        }
                    },
                    dataView: {
                        show: false,
                        title: 'Data View'
                    },
                    magicType: {
                        show: true,
                        title: {
                            line: 'Line Chart',
                            bar: 'Column Chart',
                            stack: 'accumulation',
                            tiled: 'Tile'
                        },
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true,
                        title: 'Restore',
                        color: 'black'
                    },
                    saveAsImage: {
                        show: false,
                        title: 'Save as image'
                    }
                }
            },
            calculable: false,
            dataZoom: [{
                type: 'inside'
            }, {
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'DL/UP Mbps',
                    axisLabel: {
                        formatter: '{value} Mbps'
                    }
                },
                {
                    type: 'value',
                    name: 'Max Mbit/s',
                    axisLabel: {
                        formatter: '{value} Mbit/s'
                    }
                }
            ],
            series: [
                {
                    name: 'DL(Mbps)',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                            color: '#fd7c52'
                        }
                    },
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    },
                    data: []
                },
                {
                    name: 'UP(Mbps)',
                    type: 'bar',
                    itemStyle:{
                      normal:{
                          color:'#89cdfa'
                      }
                    },
                    animationDelay: function (idx) {
                        return idx * 10;
                    },
                    data: []
                },
                {
                    name: 'DL(Max)',
                    type:'line',
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color: 'rgba(15, 70, 131, 0.5)'
                        }
                    },
                    smooth:true,
                    sampling: 'average',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(15, 158, 68, 0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(15, 70, 131, 0.5)'
                            }])
                        }
                    },
                    data: []
                },
                {
                    name: 'UP(Max)',
                    yAxisIndex: 1,
                    type:'line',
                    itemStyle:{
                        normal:{
                            color: 'rgba(125, 70, 50, 0.5)'
                        }
                    },
                    smooth:true,
                    sampling: 'average',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(125, 158, 68, 0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(125, 70, 50, 0.5)'
                            }])
                        }
                    },
                    data: []
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        },
        
        /// 创建图表, 绘制图表
        drawChart: function () {
            var t = this;
            try {
                var ele = $('#fullHistory-canvas');
                if (ele.length == 0) return;

                var uiChart = echarts.init(ele[0]);

                t.chartOption.xAxis[0].data = []; // 时间
                t.chartOption.series[0].data = []; // 下载速度
                t.chartOption.series[1].data = []; // 上传速度
                t.chartOption.series[2].data = []; // dlMax
                t.chartOption.series[3].data = []; // upMax

                $.each(t.data, function (index, obj) {
                    t.chartOption.xAxis[0].data.push(obj.time);      // 时间
                    t.chartOption.series[0].data.push(obj.download); // 下载速度
                    t.chartOption.series[1].data.push(obj.upload);   // 上传速度
                    t.chartOption.series[2].data.push(obj.dlMax);   // 上传速度
                    t.chartOption.series[3].data.push(obj.upMax);   // 上传速度
                });

                uiChart.setOption(t.chartOption, false);
            } catch (e) {
                console.error(e);
                $.reportErrorInfo(e);
            }
        },
        
        /// 添加图表中的数据
        add: function (newObj) {
            var t = this;
            t.data.push(newObj);
            t.drawChart();
            t.save();
            
            _MC.send("FullHistory.haveData");
        },
        
        /// 加载全部历史记录数据
        load: function () {
            var t = this;
            try {
                var historyData = window.localStorage.getItem('fullHistory_speedtest');
                if (historyData) {
                    t.data = JSON.parse(historyData);
                    
                    if(t.data.length > 0){
                        _MC.send("FullHistory.haveData");
                    }
                }
            } catch (e) {
                console.warn(e);
                $.reportErrorInfo(e);
            }
        },
        
        /// 保存全部历史记录数据
        save: function () {
            var t = this;
            try {
                var dataStr = JSON.stringify(t.data);
                window.localStorage.setItem("fullHistory_speedtest", dataStr);
            } catch (e) {
                console.warn(e);
                $.reportErrorInfo(e);
            }
        },
        
        /// 清除全部历史记录数据
        clear: function () {
            var t = this;
            var message = {
                title: "Clear All History ?",
                message: "Are you sure you want to clear all historical data?",
                buttons: ["Clear", "Cancel"],
                alertType: "Alert"
            };

            var result = b$.Notice.alert(message);
            if (result == 0) {
                window.localStorage.removeItem('fullHistory_speedtest');
                t.data = [];
                t.drawChart();
            }
        },
        
        /// 打开Windows
        openWindow: function () {
            var t = this;
            var historyWindow = $('#fullHistory-window');
            if (!historyWindow.data('kendoWindow')) {
                historyWindow.kendoWindow({
                    actions: ["Close"],
                    title: "Full History",
                    modal: false,
                    resizable: false
                });

                var historyTmplate = kendo.template($('#template-window-fullHistory').html());
                historyWindow.html(historyTmplate({}));

                t.drawChart();
            }

            var w = historyWindow.data("kendoWindow");
            w.center();
            w.open();
        }
    };


    //////////////////////////////
    //绑定可识别的消息
    _MC.register("onFullHistoryClick", function(e){c$.FullHistory.openWindow();});
    _MC.register("onTmpHistoryClick", function(e){c$.TmpHistory.openWindow();});
    _MC.register("addInfoToTmpHistory", function(e){c$.TmpHistory.add(e.data);});
    _MC.register("addInfoToFullHistory", function(e){c$.FullHistory.add(e.data);});
    
    _MC.register("FullHistory.haveData.handler", function(e){
        _MC.register("FullHistory.haveData", function(evt){
            var cb = e.data;
            if(typeof cb === "function") cb();
        });
    });
    
    _MC.register("TmpHistory.haveData.handler", function(e){
        _MC.register("TmpHistory.haveData", function(evt){
            var cb = e.data;
            if(typeof cb === "function") cb();
        }); 
    });

    _MC.register("FullHistory.load", function(e){c$.FullHistory.load();});


    window.UI.c$ = $.extend(window.UI.c$, c$);
})();
