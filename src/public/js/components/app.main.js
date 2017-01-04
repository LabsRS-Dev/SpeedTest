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
    var _MC = c$.MessageCenter; //

    c$.g_AppDisplayName = "Romanysoft Speed19X" + '  Ver.' + b$.App.getAppVersion();

    c$.ctrlToolbar = {
        // 让HistoryBtn 可用
        enableHistoryBtn: function(enable){
            if(enable){
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-history");
                $('#toolBtn-history').css({"-webkit-animation":"twinkling 1.5s 5 ease-in-out"});
            }else{
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-history", false);
            }
        },

        enableFullHistoryBtn: function(enable){
            if(enable){
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-fullHistory");
            }else{
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-fullHistory", false);
            }
        },

        hideFeedbackAndReviewBtn:function(hide){
            if(hide){
                $("#toolBtn-feedback").css('visibility','hidden');
                $("#toolBtn-review").css('visibility','hidden');
            }else{
                $("#toolBtn-feedback").css('visibility','visible');
                $("#toolBtn-review").css('visibility','visible');
            }
        },

        hideIPBtn:function(hide){
            if(hide){
                $("#toolBtn-ip").css('visibility','hidden');
            }else{
                $("#toolBtn-ip").css('visibility','visible');
            }
        },

        // 控制IP按钮
        enableIPBtn:function(enable){
            if(enable){
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-ip");
            }else{
                $('#toolbar').data("kendoToolBar").enable("#toolBtn-ip", false);
            }
        },

        // 控制开始按钮
        enableStartBtn: function(enable){
            if(enable){
                $('#btnStart').data("kendoButton").options['canStop'] = false;
                $('#btnStart').text("Start");
            }else{
                $('#btnStart').data("kendoButton").options['canStop'] = true;
                $('#btnStart').text('Stop');
            }
        }
    };

    // 初始化测试界面{选项及页面设置}
    c$.UI_speed_option = {
        backgroundColor: '#1b1b1b',
        //backgroundColor: 'transparent',
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show : false,
            feature : {
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'Ping',
                type:'gauge',
                center : ['12%', '55%'],    // 默认全局居中
                radius : '50%',
                min:0,
                max:360,
                endAngle:45,
                splitNumber:3,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        fontSize: 12,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                    // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 0, name: 'ms'}]
            },
            {
                name:'Download Speed',
                type:'gauge',
                center : ['35%', '50%'],    // 默认全局居中
                min:0,
                max:512,
                splitNumber:16,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, '#7EC0EE'],[0.82, '#EEC900'],[1, '#ff4500']],
                        width: 3,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :25,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    formatter:'{value}',
                    //backgroundColor: 'rgba(30,144,255,0.6)',
                    //borderWidth: 1,
                    //borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    offsetCenter: [0, '55%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff',
                        fontSize: 24
                    }
                },
                data:[{value: 0, name: 'Mbps'}]
            },
            {
                name:'Upload Speed',
                type:'gauge',
                center : ['65%', '50%'],    // 默认全局居中
                min:0,
                max:128,
                splitNumber:16,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.82, '#FFA54F'],[0.90, '#1e90ff'],[1, '#ff4500']],
                        width: 3,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :25,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    formatter:'{value}',
                    //backgroundColor: 'rgba(30,144,255,0.2)',
                    //borderWidth: 1,
                    //borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 2,
                    offsetCenter: [0, '55%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff',
                        fontSize: 24
                    }
                },
                data:[{value: 0, name: 'Mbps'}]
            },
            {
                name:'Running',
                type:'gauge',
                center : ['88%', '55%'],    // 默认全局居中
                radius : '50%',
                min:0,
                max:100,
                startAngle:135,
                //endAngle:45,
                splitNumber:2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    },
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return '0';
                            case '1' : return '50%';
                            case '2' : return '1';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:2,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    show: false
                },
                detail : {
                    show: true,
                    formatter:'C',
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    offsetCenter: [0, '5%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 9,
                        color: '#fff'
                    }
                },
                data:[{value: 0, name: 'step'}]
            }
        ]
    };


    // 初始化测试服务器界面{选项及页面设置}
    c$.UI_servers_legendTypes = {
        eTestTrace: 'Test Trace',
        eClosestServers: 'Closest Servers'
    };

    c$.UI_servers_options = {
        backgroundColor: '#1b1b1b',
        //backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                try{
                    if (params.value === undefined || params.value === null)
                        return "";

                    var data = params.data;
                    var html = "";

                    if (data.type === "server"){

                        var isBest = data.id === c$.testServerInfo.id;
                        if(isBest){
                            data = c$.testServerInfo;
                        }

                        html += data.name + (isBest? " [Best Server] ":"") +'<br/>';
                        html += data.sponsor + '<br/>';
                        html += data.country + " (" + data.cc + ") " + '<br/>';
                        html += "lat: " + data.lat + " ,lon: " + data.lon + '<br/>';
                        html += "Distance:" + c$.tmp_funcFormatFloat(data.d,2) + " KM <br/>";

                        //// 查找地点一样的Server
                        try{
                            if($.RTYUtils.isArray(c$.testAllServers)){
                                var hasTitle = false;
                                $.each(c$.testAllServers, function(index, server){
                                    if(server.lat === data.lat && server.lon === data.lon && server.id !== data.id){
                                        if(!hasTitle){
                                            html += "<hr/><strong>Similar Location Servers:</strong><br/>";
                                            hasTitle = true;
                                        }

                                        var isBest = server.id === c$.testServerInfo.id;
                                        html += server.name + (isBest? " [Best Server] ":"") +'<br/>';
                                        html += server.sponsor + '<br/>';
                                        html += '<br/>';
                                    }
                                });
                            }
                        }catch(e){

                        }

                        return html;
                    }else if (data.type === "client"){
                        html += data.name + '<br/>';
                        html += "IP: " + data.ip + '<br/>';
                        html += "lat: " + data.lat + " ,lon: " + data.lon + '<br/>';
                        html += "ISP: " + data.isp + '<br/>';
                        return html;
                    }
                }catch(e) {
                    console.error(e);
                }
            }
        },
        legend:{
            orient: 'vertical',
            top: 'center',
            left: 'left',
            data: (function(){
                var list = [];
                $.each(Object.keys(c$.UI_servers_legendTypes), function(index, key){
                    list.push(c$.UI_servers_legendTypes[key]);
                });
                return list;
            })(),
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            itemSize:30,
            feature: {
                dataZoom: {
                    show: false,
                    title: {
                        zoom: 'Regional Scale',
                        back: 'Regional Scale - back'
                    }
                },
                restore: {
                    show: true,
                    title: 'Restore'
                },
                saveAsImage: {
                    show: false,
                    title: 'Save as image'
                }
            }
        },
        geo: {
            map: 'world',
            silent: true,
            label: {
                emphasis: {
                    show: false,
                    areaColor: '#eee'
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#404a59'
                }
            },
            roam: true,  // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            scaleLimit:{
                min:1,
                max:5000
            }
        },
        series: []
    };

    c$.createSpeedTestUI = function(){
        _MC.send('initToolbar');
        _MC.send("FullHistory.haveData.handler", function(){c$.ctrlToolbar.enableFullHistoryBtn(true);});
        _MC.send("TmpHistory.haveData.handler", function(){c$.ctrlToolbar.enableHistoryBtn(true);});
        _MC.send("FullHistory.load");

        // 基于准备好的dom，初始化echarts图表
        c$.UI_speed = echarts.init(document.getElementById('speed-canvas'));
        // 为echarts对象加载数据
        c$.UI_speed.setOption(c$.UI_speed_option);


        // 获取地图数据，然后初步绘制地图
        $.get('common/echarts/map/world.json', function (worldJson) {
            echarts.registerMap('world', worldJson);
            c$.UI_server_drawer = echarts.init(document.getElementById('servers-canvas'));
            c$.UI_server_drawer.setOption(c$.UI_servers_options);
        });


        // 创建进度条
        c$.UI_ProgressBar.createUI();

        // 重置当前SpeedTest状态
        c$.resetSpeedTestUI();

        // 配置启动按钮
        $("#btnStart").kendoButton({
            canStop:false,
            click: function(){
                var t$ = this;
                if(t$.options['canStop']){
                    _MC.send('triggerStopOneTask');
                }else{
                    /**
                     *  防止双击，或者多次点击，启动测试，这样数据会变乱
                     */
                    t$.enable(false);
                    _MC.send('triggerStartOneTask');
                    setTimeout(function(){
                        t$.enable(true);
                    },2000);
                }
            }
        });
    };


    // 进度条部分操作
    c$.UI_ProgressBar = {
        createUI: function(){
            var testProgress = $("#progress").kendoProgressBar({
                type: "percent",
                max: 300,
                value: 0,
                animation: false,
                customMessage:'',
                change:function(e){
                    $("#progress").css({'opacity':1});
                    var message = this.options.customMessage;
                    var percent = Math.floor(e.value * 100/this.options.max);
                    this.progressStatus.text(message + '\t (' + percent + '%)');
                },
                complete:function(e){
                    $("#progress").css({'opacity':0});
                }
            }).data("kendoProgressBar");

            $("#progress").css({'opacity':0});
        },

        private_updateUI:function(message, value){
            var progressUI = $("#progress").data('kendoProgressBar');
            if(progressUI){
                if(value == progressUI.value()){
                    var percent = Math.floor(value * 100/progressUI.options.max);
                    progressUI.progressStatus.text(message + '\t (' + percent + '%)');
                }else{
                    progressUI.options.customMessage = message;
                    progressUI.value(value);
                }
            }

            $("#progress").css({'opacity': (value === 0) ? 0 : 1});
        },
        
        resetUI:function(message, value){
            this.private_updateUI(message, value);
        },
        
        updateUI:function(message, addon){
            var progressUI = $("#progress").data('kendoProgressBar');
            var currentValue = progressUI.value();
            this.private_updateUI(message, currentValue + addon);
        },

        updateUIWithMaxValue:function(message){
            var max = this.getOptionsMaxValue();
            this.private_updateUI(message, max);
        },
        

        getOptionsMaxValue:function(){
            var progressUI = $("#progress").data('kendoProgressBar');
            return progressUI.options.max;
        }
    };


    // 重置SpeedTestUI页面
    c$.resetSpeedTestUI = function(){
        c$.ctrlSpeedTestUI.setPingTimes({latency:0});
        c$.ctrlSpeedTestUI.setDownloadSpeed({speed:0, unit:'Mbps'});
        c$.ctrlSpeedTestUI.setUploadSpeed({speed:0, unit:'Mbps'});
        c$.ctrlSpeedTestUI.setRunningValue(false);

        c$.tmp_speed_dl_max = 0;
        c$.tmp_speed_up_max = 0;

        // 进度条的处理
        _MC.send('UI_ProgressBar.resetUI',{message:'', value:0});

        // 地图部分
        _MC.send("ctrlTempClientAndServerInfo.resetAllInfo");
        _MC.send("ctrlServerDrawerUI.resetAllTestData");
    };

    c$.tmp_funcFormatFloat = function(f, size){
        var tf = f * Math.pow(10,size);
        tf = Math.round(tf + 0.000000001);
        tf = tf / Math.pow(10, size);
        return tf;
    };
    c$.tmp_funcFormatSpeedValue = function(speed){
        var currentValue = 0;
        if(speed >= 1){
            currentValue = c$.tmp_funcFormatFloat(speed, 2);
        }
        else if(speed * 1000 >= 1){
            currentValue = c$.tmp_funcFormatFloat(speed, 5);
        }
        else if(speed * (1000*1000) >= 1){
            currentValue = c$.tmp_funcFormatFloat(speed, 8);
        }
        else if(speed * (1000*1000*1000) >= 1){
            currentValue = c$.tmp_funcFormatFloat(speed, 11);
        }else{
            currentValue = 0;
        }

        return currentValue;
    };

    /// 存储临时速度测试的峰值
    c$.tmp_speed_dl_max = 0;
    c$.tmp_speed_up_max = 0;
    // 控制SpeedTestUI的数据
    c$.ctrlSpeedTestUI = {
        // 更新Scale
        updateScale:function(data){
            try{
                if (c$.UI_speed_option){
                    c$.UI_speed_option.series[0].max = data.pingScale;
                    c$.UI_speed_option.series[1].max = data.downloadScale;
                    c$.UI_speed_option.series[2].max = data.uploadScale;

                    if (c$.UI_speed){
                        c$.UI_speed.setOption(c$.UI_speed_option, true);
                    }
                }
            } catch(e){
                console.error(e);
                $.reportErrorInfo(e);
            }
        },

        // 设置Ping的时间
        setPingTimes:function(data){
            try {
                if (c$.UI_speed_option){
                    var si = 0;
                    var numObj = new Number(data.latency);
                    var currentValue = c$.UI_speed_option.series[si].data[0].value = numObj.toFixed(2);
                    c$.UI_speed_option.series[si].data[0].name = '\n BestServer \nPing (ms)';

                    if (c$.UI_speed){
                        c$.UI_speed.setOption(c$.UI_speed_option, true);
                    }
                }

            }catch(e){
                console.error(e);
                $.reportErrorInfo(e);
            }
        },

        // 设置下载速度
        setDownloadSpeed:function(data){
            try{
                if (c$.UI_speed_option){
                    var si = 1;

                    var currentValue = 0;
                    currentValue = c$.tmp_funcFormatSpeedValue(data.speed);
                    c$.tmp_speed_dl_max = Math.max(currentValue, c$.tmp_speed_dl_max);

                    currentValue = c$.tmp_funcFormatSpeedValue(data.speed * 8);
                    c$.UI_speed_option.series[si].data[0].value = currentValue;

                    var currentUnit = '\n Download \n ' + 'Mbps';
                    c$.UI_speed_option.series[si].data[0].name = currentUnit;

                    if (c$.UI_speed){
                        c$.UI_speed.setOption(c$.UI_speed_option, true, true);
                    }
                }

            }catch(e){
                console.error(e);
                $.reportErrorInfo(e);
            }

        },

        // 设置上传速度
        setUploadSpeed:function(data){
            try{
                if (c$.UI_speed_option){
                    var si = 2;
                    var currentValue = 0;
                    currentValue = c$.tmp_funcFormatSpeedValue(data.speed);
                    c$.tmp_speed_up_max = Math.max(currentValue, c$.tmp_speed_up_max);

                    currentValue = c$.tmp_funcFormatSpeedValue(data.speed * 8);
                    c$.UI_speed_option.series[si].data[0].value = currentValue;

                    var currentUnit = '\n Upload \n ' + 'Mbps';
                    c$.UI_speed_option.series[si].data[0].name = currentUnit;

                    if (c$.UI_speed){
                        c$.UI_speed.setOption(c$.UI_speed_option, true, true);
                    }
                }

            }catch (e){
                console.error(e);
                $.reportErrorInfo(e);
            }
        },

        // 设置Running的数据
        setRunningValue:function(wantStart){
            function startRunning(){
                c$.running_timeTicket = setInterval(function(){
                    try{
                        if (c$.UI_speed_option){
                            var numObj = new Number(Math.random()*100);
                            c$.UI_speed_option.series[3].data[0].value = numObj.toFixed(2) - 0;
                            c$.UI_speed_option.series[3].detail.formatter = "C";

                            if (c$.UI_speed){
                                c$.UI_speed.setOption(c$.UI_speed_option, true, true);
                            }
                        }
                    }catch (e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }

                },1000)
            }

            function stopRunning(){
                try{
                    if (c$.UI_speed_option){
                        c$.UI_speed_option.series[3].data[0].value = 0;
                        c$.UI_speed_option.series[3].detail.formatter = "C";

                        if (c$.UI_speed){
                            c$.UI_speed.setOption(c$.UI_speed_option, true, true);
                        }
                    }

                }catch(e){
                    console.error(e);
                    $.reportErrorInfo(e);
                }

            }

            if(wantStart == false){
                c$.running_timeTicket && clearInterval(c$.running_timeTicket);
                c$.running_timeTicket = null;
                stopRunning();
                return;
            }


            if($.RTYUtils.isUndefinedOrNull(c$.running_timeTicket)){
                if(c$.state_isRunning) startRunning();
            }else{
                if(c$.state_isRunning == false){
                    clearInterval(c$.running_timeTicket);
                    c$.running_timeTicket = null;
                    stopRunning();
                }
            }
        },

        // 处理统计信息.最后的计算结果
        processSpeedTestResult:function(data){
            try{
                var pingTime = data.Server.latency;
                var dl = data.DLSpeed;
                var ul = data.ULSpeed;

                dl_f = c$.tmp_funcFormatSpeedValue(dl * 8);
                ul_f = c$.tmp_funcFormatSpeedValue(ul * 8);
                um_f = c$.tmp_funcFormatSpeedValue(c$.tmp_speed_up_max);
                dm_f = c$.tmp_funcFormatSpeedValue(c$.tmp_speed_dl_max)

                var curTime = $.getMyDateStr("yyyy/MM/dd HH:mm:ss");
                _MC.send("addInfoToTmpHistory", {
                    time:curTime,
                    dlMax: dm_f,
                    upMax: um_f,
                    upload: ul_f,
                    download: dl_f,
                    ping: c$.tmp_funcFormatSpeedValue(pingTime)
                });
                _MC.send("addInfoToFullHistory", {
                    time:curTime,
                    dlMax: dm_f,
                    upMax: um_f,
                    download: dl_f,
                    upload: ul_f
                });

                ///通知服务器，用户测试速度使用成功
                $.reportInfo({
                    "SYS_state": "Speed test system running normally!",
                    "DL_Mbps": dl * 8,
                    "DL_MBit/s": dm_f,
                    "UL_Mbps": ul * 8,
                    "UL_MBit/s": um_f,
                    "pingTime": pingTime,
                    "client": c$.testClientInfo || "",
                    "server": c$.testServerInfo || ""
                });

                /// 在这里更新数据
                _MC.send("ctrlServerDrawerUI.updateAllTestServersData");
                _MC.send("ctrlServerDrawerUI.updateClosestTestServersData");
                _MC.send("ctrlServerDrawerUI.updateLocalToBestServerData");

            }catch(e){
                console.error(e);
                $.reportErrorInfo(e);
            }
        }
    };

    // 控制ServerDrawerUI的数据
    c$.ctrlServerDrawerUI = {
        options:{
            client:{
                symbolSize: 60
            },
            server:{
                symbolSize: 36
            }
        },

        /// 临时数据
        tmp_allTestServersData: null,
        tmp_closestTestServersData: null,

        // 重置所有的数据
        resetAllTestData: function(){
            if(c$.UI_server_drawer){
                c$.UI_servers_options.series = [];
                c$.UI_server_drawer.setOption(c$.UI_servers_options, true, true);
            }
        },

        // 存储所有服务器信息数据
        saveAllTestServersData: function(data){
            var t$ = this;
            t$.tmp_allTestServersData = data;
        },
        saveClosestTestServersData:function(data){
            var t$ = this;
            t$.tmp_closestTestServersData = data;
        },
        saveLocalToBestServerData:function(){

        },


        // 显示所有服务器信息
        updateAllTestServersData: function () {
            var t$ = this;
            var data = t$.tmp_allTestServersData;

            //Note: 整理出数据来了
            /***
             *
             cc:"CH"
             country:"China"
             d:41.526252265168516
             host:"speedtest1.139life.com:8080"
             id:"3927"
             lat:"31.3167"
             lon:"120.6000"
             name:"Suzhou"
             sponsor:"China Mobile Jiangsu Co., Ltd."
             url:"http://speedtest1.139life.com/speedtest/upload.aspx"
             url2:"http://speedtest2.139life.com/speedtest/upload.aspx"
             *
             */

            try{
                var legend = c$.UI_servers_legendTypes.eTestTrace;

                _MC.register("p.ctrlServerDrawerUI.updateAllTestServersData", function(e){
                    try{
                        function _fnc(data){
                            c$.testAllServers = data;
                            _MC.send("p.ctrlServerDrawerUI.updateClosestTestServersData");
                            _MC.send("p.ctrlServerDrawerUI.draw.AllServers");
                        }

                        if($.RTYUtils.isString(data)){
                            $.getJSON(data, function(res){
                                try{
                                    var data = res.info;
                                    _fnc(data);
                                }catch(e){
                                    console.error(e);
                                    $.reportErrorInfo(e);
                                }
                            })
                        }else{
                            _fnc(data);
                        }
                    }catch(e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }
                }, true);

                _MC.register("p.ctrlServerDrawerUI.draw.AllServers", function(e){

                    try{
                        if(c$.UI_servers_options){
                            // 将新的数据添加进去
                            c$.UI_servers_options.series.push(
                                {
                                    name: legend,
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    zlevel: 2,
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    symbolSize: function (val) {
                                        return val[2] / 8;
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#a6c84c'
                                        }
                                    },
                                    data: c$.testAllServers
                                }
                            );

                            if(c$.UI_server_drawer){
                                c$.UI_server_drawer.setOption(c$.UI_servers_options, false, true);
                            }
                        }
                    }catch(e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }

                }, true)

                if (c$.testAllServers.length === 0){
                    _MC.send("p.ctrlServerDrawerUI.updateAllTestServersData");
                }else{
                    _MC.send("p.ctrlServerDrawerUI.draw.AllServers");
                }
            }catch(e){
                console.error(e);
                $.reportErrorInfo(e);
            }
        },

        // 显示最近的服务器信息
        updateClosestTestServersData: function () {
            var t$ = this;
            var data = t$.tmp_closestTestServersData;
            try{
                var legend = c$.UI_servers_legendTypes.eClosestServers;

                _MC.register("p.ctrlServerDrawerUI.updateClosestTestServersData", function(e){
                    try{
                        function _fnc(data){
                            _MC.send("p.ctrlServerDrawerUI.draw.ClosestTestServers",data);
                        }

                        if($.RTYUtils.isString(data)){
                            $.getJSON(data, function(res){
                                try{
                                    var data = res.info;
                                    _fnc(data);
                                }catch(e){
                                    console.error(e);
                                    $.reportErrorInfo(e);
                                }
                            })
                        }else{
                            _fnc(data);
                        }
                    }catch(e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }


                }, true);

                _MC.register("p.ctrlServerDrawerUI.draw.ClosestTestServers", function(e){

                    try{
                        var serverData = e.data;

                        if(c$.UI_servers_options){
                            // 将新的数据添加进去
                            c$.UI_servers_options.series.push(
                                {
                                    name: legend,
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    zlevel: 2,
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'right',
                                            formatter: '{b}'
                                        }
                                    },
                                    symbolSize: function (val) {
                                        return val[2] / 16;
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#FF8C00'
                                        }
                                    },
                                    data: [c$.testClientInfo]
                                },
                                {
                                    name: legend,
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    zlevel: 2,
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    symbolSize: function (val) {
                                        return val[2] / 8;
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#a6c84c'
                                        }
                                    },
                                    data: serverData
                                }
                            );

                            if(c$.UI_server_drawer){
                                c$.UI_server_drawer.setOption(c$.UI_servers_options, false, true);
                            }
                        }

                    }catch(e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }

                }, true);

                if(c$.testAllServers.length > 0){
                    _MC.send("p.ctrlServerDrawerUI.updateClosestTestServersData");
                }

            }catch (e){
                console.error(e);
                $.reportErrorInfo(e);
            }

        },

        // 更新测试时候，本地位置到最佳服务器的处理方式
        updateLocalToBestServerData:function () {
            //return;
            try{
                var legend = c$.UI_servers_legendTypes.eTestTrace;
                var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                var color = ['#a6c84c', '#ffa022', '#46bee9'];


                var client = c$.testClientInfo,
                    server = c$.testServerInfo;
                c$.UI_servers_options.series.push(
                    {
                        name: legend,
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: planePath,
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: color[0],
                                width: 1,
                                opacity: 0.4,
                                curveness: 0.2
                            }
                        },
                        data: [{
                            fromName:client.name,
                            toName:server.name,
                            coords:[client.coord, server.coord]
                        }]
                    },
                    {
                        name: legend,
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: planePath,
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: "red",
                                width: 1,
                                opacity: 0.4,
                                curveness: 0.2
                            }
                        },
                        data: [{
                            fromName:client.name,
                            toName:server.name,
                            coords:[server.coord, client.coord]
                        }]
                    },
                    {
                        name: legend,
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] / 16;
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF8C00'
                            }
                        },
                        data: [client]
                    },
                    {
                        name: legend,
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] / 8;
                        },
                        itemStyle: {
                            normal: {
                                color: '#a6c84c'
                            }
                        },
                        data: [server]
                    }
                );


                c$.UI_server_drawer.setOption(c$.UI_servers_options, true, true);

            }catch(err){
                console.error(err);
                $.reportErrorInfo(e);
            }
        }
    };

    // 控制及储存测试的客户端及相应服务器信息
    c$.testClientInfo = null;
    c$.testServerInfo = null;
    c$.testAllServers = [];
    c$.ctrlTempClientAndServerInfo = {
        resetAllInfo:function (wantRestAllServers) {
            c$.testClientInfo = null;
            c$.testServerInfo = null;
            if(wantRestAllServers === true)
                c$.testAllServers = [];
        },

        updateClientInfo: function (data) {
            c$.testClientInfo = data;
            c$.testClientInfo["name"] = "LocalHost";
            c$.testClientInfo["type"] = "client";
            c$.testClientInfo["value"] = [
                Number(data.lon),
                Number(data.lat),
                c$.ctrlServerDrawerUI.options.client.symbolSize
            ];
            c$.testClientInfo.coord = [
                Number(data.lon),
                Number(data.lat)
            ]
        },

        updateServerInfo: function (data) {
            c$.testServerInfo = data;
            c$.testServerInfo["type"] = "server";
            c$.testServerInfo["name"] = "No." + data.id + " - " + data.name;
            c$.testServerInfo["isBest"] = true;
            c$.testServerInfo["value"] = [
                Number(data.lon),
                Number(data.lat),
                c$.ctrlServerDrawerUI.options.server.symbolSize
            ];
            c$.testServerInfo.coord = [
                Number(data.lon),
                Number(data.lat)
            ]
        }

    };

    c$.state_isRunning = false;       // 当前状态，是否正在运行
    c$.state_isAutoRunning = false;   // 当前运行模式是否为自动模式
    c$.timeHandler_autoTest = null;   // 自动模式的时间戳,
    c$.signal_cancel_autoTest = null; // 信号：取消自动化测试
    c$.actions = {
        curSpeedTestTaskId:null,  // 当前任务ID
        // 启动测试网速
        onStartSpeedTestClick:function(e){
            console.log('onStartSpeedTestClick.........');
            try{
                if(c$.state_isRunning == true) return;
                _MC.send("CallSpeedTest", function(){
                    try{
                        $('#toolBtn-history').css({"-webkit-animation":"none"});
                    }catch(e){
                        console.error(e);
                        $.reportErrorInfo(e);
                    }
                });

            }catch(e){
                console.log(e);
                $.reportErrorInfo(e);
            }
        },

        // 停止测试
        onStopSpeedTestClick:function(e){
            console.log('onStopSpeedTestClick.........');
            _MC.send("CallSpeedTestStop");
        },
        
        // 开启Running状态
        onSpeedTestRunning:function(e){
            // 启动Running状态
            c$.state_isRunning = true;
            c$.ctrlSpeedTestUI.setRunningValue(true);
            c$.ctrlToolbar.enableStartBtn(false);            
        },
        
        // 关闭Running状态
        onSpeedTestStoped:function(e){
            // 关闭Running状态
            c$.state_isRunning = false;
            c$.ctrlSpeedTestUI.setRunningValue(false);
            c$.ctrlToolbar.enableStartBtn(true);
        },

        // 获取IP信息
        onGetIPInfoClick:function(e, cb){
            //同步得到真实的插件数据
            c$.UI_ipinfo_data = [];

            //本地IP地址
            try{
                var localIP = BS.b$.App.getLocalIP();
                c$.UI_ipinfo_data.push({key:'', value:'Local IP info', groupClass:'item-group', enableLocation:false});
                c$.UI_ipinfo_data.push({key:'IP:  ', value:localIP, groupClass:'', enableLocation:false});
            }catch(e){console.error(e)}


            //处理外部IP地址,参照http://www.telize.com/
            $.getJSON('http://www.telize.com/geoip?callback=?', function(data){
                if(typeof data == 'object'){
                    try{
                        c$.UI_ipinfo_data.push({key:'', value:'External IP info', groupClass:'item-group', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'IP:  ', value:data["ip"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'City:  ', value:data["city"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'PostalCode:  ', value:data["postal_code"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'RegionCode:  ', value:data["region_code"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'Region:  ', value:data["region"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'CountryCode:  ', value:data["country_code"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'Country:  ', value:data["country"], groupClass:'', enableLocation:false});
                        //c$.UI_ipinfo_data.push({key:'Metro_code:  ', value:data["metro_code"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'Area_code:  ', value:data["area_code"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'Latitude:  ', value:data["latitude"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'Longitude:  ', value:data["longitude"], groupClass:'', enableLocation:false});

                        var ll = data["latitude"] + ',' + data["longitude"];
                        c$.UI_ipinfo_data.push({key:'[lat,lon]:  ', value:ll, groupClass:'', enableLocation:true});
                        c$.UI_ipinfo_data.push({key:'ISP:  ', value:data["isp"], groupClass:'', enableLocation:false});
                        c$.UI_ipinfo_data.push({key:'TimeZone:  ', value:data["timezone"], groupClass:'', enableLocation:false});

                        cb && cb();

                    }catch(e){console.error(e)}

                }
            });



        },

        onLocationClick:function(e){
            var message = {
                title:"Do you want to location?",
                message:"Do you want to location use system 'Maps' app",
                buttons:["Ok","Cancel"],
                alertType:"Information"
            };
            var alertResult = b$.Notice.alert(message);
            if(alertResult == 1){
                var latlon = $(e).data('rtyll');
                c$.actions.onMapWithLatLng(latlon);
            }
        },

        // 启动MapKit进行定位,latlng, eg. 21.0010,12.2329
        onMapWithLatLng:function(latlon){
            try{
                BS.b$.App.open('http://maps.apple.com/?ll='+latlon);
            }catch(e){console.error(e)}
        }

    };

    //////////////////////////////
    //绑定可识别的消息
    /// 主界面
    _MC.register("createSpeedTestUI", function(e){c$.createSpeedTestUI()});
    _MC.register("resetSpeedTestUI", function(e){c$.resetSpeedTestUI()});

    /// 界面上的按钮功能
    _MC.register("onFeedbackClick", function(e){b$.App.open("https://github.com/Romanysoft/SpeedTest/issues");});
    _MC.register("onReviewClick", function(e){
        b$.App.open('macappstores://itunes.apple.com/us/app/speed-test-now-check-your/id721474844?l=zh&ls=1&mt=12');
        try{
            b$.ServiceCheckRateApp.setRateActive(true);
        }catch(e){console.error(e)}
    });
    _MC.register("onHomePageClick", function(e){b$.App.open("https://romanysoft.github.io/SpeedTest/");});

    /// 进度条的控制
    _MC.register("UI_ProgressBar.updateUI", function(e){var data = e.data;c$.UI_ProgressBar.updateUI(data.message, data.value);});
    _MC.register("UI_ProgressBar.updateUIWithMaxValue",function(e){var data = e.data;c$.UI_ProgressBar.updateUIWithMaxValue(data.message);});
    _MC.register("UI_ProgressBar.resetUI",function(e){var data = e.data;c$.UI_ProgressBar.resetUI(data.message, data.value);});

    /// 控制SpeedTestUI的数据
    _MC.register("ctrlSpeedTestUI.updateScale", function(e){var data = e.data;c$.ctrlSpeedTestUI.updateScale(data);});
    _MC.register("ctrlSpeedTestUI.setPingTimes", function(e){var data = e.data;c$.ctrlSpeedTestUI.setPingTimes(data);});
    _MC.register("ctrlSpeedTestUI.setDownloadSpeed", function(e){var data = e.data;c$.ctrlSpeedTestUI.setDownloadSpeed(data);});
    _MC.register("ctrlSpeedTestUI.setUploadSpeed", function(e){var data = e.data;c$.ctrlSpeedTestUI.setUploadSpeed(data);});
    _MC.register("ctrlSpeedTestUI.setRunningValue", function(e){var data = e.data;c$.ctrlSpeedTestUI.setRunningValue(data);});
    _MC.register("ctrlSpeedTestUI.processSpeedTestResult", function(e){var data = e.data;c$.ctrlSpeedTestUI.processSpeedTestResult(data);});

    /// 控制地图UI的数据显示
    _MC.register("ctrlServerDrawerUI.resetAllTestData", function(e){c$.ctrlServerDrawerUI.resetAllTestData();});

    _MC.register("ctrlServerDrawerUI.saveAllTestServersData", function(e){var data = e.data;c$.ctrlServerDrawerUI.saveAllTestServersData(data);});
    _MC.register("ctrlServerDrawerUI.saveClosestTestServersData", function(e){var data = e.data;c$.ctrlServerDrawerUI.saveClosestTestServersData(data);});


    _MC.register("ctrlServerDrawerUI.updateAllTestServersData", function(e){var data = e.data;c$.ctrlServerDrawerUI.updateAllTestServersData(data);});
    _MC.register("ctrlServerDrawerUI.updateClosestTestServersData", function(e){var data = e.data;c$.ctrlServerDrawerUI.updateClosestTestServersData(data);});
    _MC.register("ctrlServerDrawerUI.updateLocalToBestServerData", function(e){c$.ctrlServerDrawerUI.updateLocalToBestServerData();});

    /// 控制及储存测试的客户端及相应服务器信息
    _MC.register("ctrlTempClientAndServerInfo.updateClientInfo", function(e){var data = e.data;c$.ctrlTempClientAndServerInfo.updateClientInfo(data);});
    _MC.register("ctrlTempClientAndServerInfo.updateServerInfo", function(e){var data = e.data;c$.ctrlTempClientAndServerInfo.updateServerInfo(data);});
    _MC.register("ctrlTempClientAndServerInfo.resetAllInfo", function(e){c$.ctrlTempClientAndServerInfo.resetAllInfo();});


    /// 内置的功能
    _MC.register("onStartTestClick", function(e){c$.actions.onStartSpeedTestClick();});
    _MC.register("onStopTestClick", function(e){c$.actions.onStopSpeedTestClick();});
    _MC.register("onSpeedTestRunning", function(e){c$.actions.onSpeedTestRunning();});
    _MC.register("onSpeedTestStoped", function(e){c$.actions.onSpeedTestStoped();});



    window.UI.c$ = $.extend(window.UI.c$, c$);
})();