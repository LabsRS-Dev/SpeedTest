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

    /// 定义速度测试，用户操作的历史记录器
    c$.$_p_SpeedTest_op_history = {
        idx: -1,
        dic: {},

        record: function(info){
            var t$ = this;
            t$.dic[++t$.idx] = info;
        },

        result:function(){
            var t$ = this;
            return t$.dic;
        }
    };

    /// 定义与速度测试核心的回调函数，统一入口
    c$.$_p_CallSpeedTest_callback = function (obj) {
        var t$ = this;

        //var fireType = obj.type;
        var msgPackage = obj.data;

        try {
            if (_.has(msgPackage, 'content')) {
                var pyMsgObj = msgPackage.content;

                if (_.isString(pyMsgObj)){
                    try{
                        pyMsgObj = JSON.parse(pyMsgObj);
                    }catch(e){
                        var wantReport = true;
                        if(_.has(msgPackage, 'msg_type')){
                            if(msgPackage['msg_type'] === "s_err_progress"){
                                $.reportInfo({
                                    pythonServer: true,
                                    errorMessage: obj
                                });
                                wantReport = false;
                            }
                        }

                        //// 处理未知的问题
                        if(wantReport){
                            console.error(e);
                            $.reportErrorInfo(e, {'msgPackage':msgPackage});
                        }
                    }
                }
                if (false == _.isObject(pyMsgObj)) {
                    console.error('pyMsgObj must be json object.'); return;
                }
                var contType = pyMsgObj.type;
                var info2 = pyMsgObj.info;

                try{
                    c$.$_p_SpeedTest_op_history.record(contType || "UNKOWN");
                }catch(e){}

                /// 加入状态跟踪. 方便为用户调试问题
                if(contType && contType != "RTS_DL" && contType != "RTS_UL"){
                    $.reportInfo({"SYS_state": contType || "", "SYS_data": info2 || ""});
                }

                if (contType == "SYSTEM_runError"){
                    try{
                        var dataInfo = {
                            pythonServer: true,
                            errorMessage: obj
                        };
                        $.reportInfo(dataInfo);
                    }catch(e){
                        console.error(e);
                    }
                } else if (contType == "RetrievingRemoteConfig") {
                    _MC.send('resetSpeedTestUI');
                    _MC.send("triggerOneTaskIsRunning");
                    _MC.send("AutoTestCtronl.onSubTestIsStart");
                    _MC.send("UI_ProgressBar.updateUI", {message:'Retrieving remote server config ...', value:10});
                } else if (contType == "RetrievingRemoteConfig_Error") {
                    b$.App.setOptions_RateAppClose(true);
                    _MC.send("reportError",info2);
                    _MC.send("show_Dlg",info2);
                    _MC.send("UI_ProgressBar.updateUIWithMaxValue", {message:'[error] Retrieving remote server config failed...'});
                    _MC.send("AutoTestCtronl.onSubTestHasError", info2);
                    _MC.send("triggerOneTaskStoped");
                } else if (contType == "RetrievingServerList") {
                    _MC.send("UI_ProgressBar.updateUI", {
                        message: 'Retrieving all server list data, may take several minutes. ...',
                        value: 30
                    });
                } else if (contType == "GetAllServersInfo") {
                    _MC.send("ctrlServerDrawerUI.saveAllTestServersData",info2);
                } else if (contType == "GetClosestServersInfo") {
                    _MC.send("ctrlServerDrawerUI.saveClosestTestServersData",info2);
                } else if (contType == "GetClientInfo") {
                    _MC.send("ctrlTempClientAndServerInfo.updateClientInfo",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'Getting client detail information ...', value:10});

                } else if (contType == "AutoSelectBestServer") {
                    _MC.send("UI_ProgressBar.updateUI", {message:'Auto select best server ...', value:10});
                } else if (contType == "GetBestServerInfo") {
                    _MC.send("ctrlTempClientAndServerInfo.updateServerInfo",info2);
                    _MC.send("ctrlSpeedTestUI.setPingTimes",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'Getting best server detail information ...', value:10});
                } else if (contType == "GetBestServerInfoError") {
                    b$.App.setOptions_RateAppClose(true);
                    _MC.send("reportError",info2);
                    _MC.send("show_Dlg",info2);
                    _MC.send("UI_ProgressBar.updateUIWithMaxValue", {message:'[error] Retrieving remote server config failed...'});
                    _MC.send("AutoTestCtronl.onSubTestHasError", info2);
                    _MC.send("triggerOneTaskStoped");
                } else if (contType == "StartTestDownloadSpeed") {
                    _MC.send("UI_ProgressBar.updateUI", {message:'Starting download speed test ...', value:5});
                } else if (contType == "RTS_DL") {
                    _MC.send("ctrlSpeedTestUI.setDownloadSpeed",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'download speed test ...', value:1});
                } else if (contType == "GetDownloadSpeed") {
                    _MC.send("ctrlSpeedTestUI.setDownloadSpeed",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'complete download speed test ...', value:5});
                } else if (contType == "StartTestUploadSpeed") {
                    _MC.send("UI_ProgressBar.updateUI", {message:'Starting upload speed test ...', value:5});
                } else if (contType == "RTS_UL") {
                    _MC.send("ctrlSpeedTestUI.setUploadSpeed",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'upload speed test ...', value:1});
                } else if (contType == "GetUploadSpeed") {
                    _MC.send("ctrlSpeedTestUI.setUploadSpeed",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'complete upload speed test ...', value:5});
                } else if (contType == "SpeedTestEnd") {
                    b$.App.setOptions_RateAppClose(false);
                    _MC.send("ctrlSpeedTestUI.processSpeedTestResult",info2);
                    _MC.send("UI_ProgressBar.updateUI", {message:'save test result ...', value:2});
                } else if (contType == "Cancelling") {
                    _MC.send("UI_ProgressBar.updateUI", {message:'Cancelling, please waiting ...', value:2});
                    _MC.send("AutoTestCtronl.onSubTestIsCancel");
                } else if (contType == "SocketTimeOut") {
                    b$.App.setOptions_RateAppClose(true);
                    _MC.send("UI_ProgressBar.updateUIWithMaxValue", {message:'SocketTimeOut ...'});
                    _MC.send("triggerOneTaskStoped");
                    _MC.send("reportError",info2);
                    _MC.send("show_Dlg",info2);
                    _MC.send("AutoTestCtronl.onSubTestHasError", info2);
                } else if (contType == "FinallyRunEnd"){
                    _MC.send("UI_ProgressBar.updateUIWithMaxValue", {message:'...'});

                    if(info2.isCancel){
                        _MC.send('resetSpeedTestUI');
                    }

                    _MC.send("triggerOneTaskStoped");
                    _MC.send("AutoTestCtronl.onSubTestIsFinished");
                }
            }
        } catch (e) {
            console.error(e);
            $.reportErrorInfo(e, obj);
        }
    };

    /// 启动核心的SpeedTest计算模块
    c$.CallSpeedTest = function (e) {
        var t$ = this;

        // 检查当前的Python运行环境，是否具备启动标准
        if(c$.python.isPyWSisRunning){
            c$.python.configDebugLog(false);

            /// 调用核心SpeedTest方法
            c$.pythonAddon.common_service('speedtestHelper', {'method':'prc_speedTest','parameters':{}}, c$.$_p_CallSpeedTest_callback);

            if($.isFunction(e.data)){
                var cb = e.data;
                cb && cb();
            }
        }else{
            var msg = "Starting the test engine service, please wait...";

            // 告知服务器
            $.reportErrorInfo(msg);

            // 通知客户
            b$.Notice.alert({
                title: "Information",
                message:msg
            });

            /// 一定时间间隔内，尝试启动
            setTimeout(function(){
                // 尝试重新启动
                c$.python.startPyWebServer();
            }, 3000);

        }

    };
    
    /// 停止测试触发机制
    c$.CallSpeedTestStop = function(){
        try {
            /// 调用核心SpeedTest方法
            c$.pythonAddon.common_service('speedtestHelper', {'method':'prc_stop_run','parameters':{}}, c$.$_p_CallSpeedTest_callback);
        } catch (e) {
            console.log(e);
            $.reportErrorInfo(e);
        }
    };

    /// 添加特殊消息处理函数
    c$.pythonAddon.helper.addMessageSubscribers(function(obj){
        try{
            if (_.has(obj, 'type')){
                var fireType = obj.type;
                if(fireType === 'python_server_onclose'){ /// 测试引擎服务被中断
                    var msg = {"Type": fireType};
                    _MC.send('resetSpeedTestUI');
                    _MC.send("triggerOneTaskStoped");

                    $.reportErrorInfo(obj, c$.$_p_SpeedTest_op_history.result()); // 告知服务器
                }
            }
        }catch(e){
            console.error(e);
            $.reportErrorInfo(e, obj);
        }
    });

    // 自动任务监视器
    c$.TaskWatcher = {
        Observer: function(){return new kendo.Observable()}(),
        eventType:{
            EVENT_ONETASK_START:"oneTask_start",
            EVENT_ONETASK_FINISHED:"oneTask_finished",
            EVENT_ALLTASKS_FINISHED:"allTasks_finished",
            EVENT_NOTICE_NEXTTASK_READY:"nextTask_ready",

            EVENT_USER_START_ONE_TASK:"user_start_oneTask",
            EVENT_USER_TRIGGER_TASK_RUNNING:"user_trigger_task_running",
            EVENT_USER_STOP_ONE_TASK:"user_stop_oneTask",
            EVENT_USER_TRIGGER_TASK_STOPED:"user_trigger_task_stoped",
            EVENT_USER_START_AUTO:"user_start_auto",
            EVENT_USER_STOP_AUTO:"user_stop_auto"

        },

        taskUIIntervalHandler:null,// 任务UI界面调度器ID
        taskTimeHandler:null,      // 任务调度器的ID
        total_taskRepeatTimes:0,   // 任务调度总的要求的执行次数
        cur_taskRepeatTimes:0,     // 当前任务执行了几次
        enableAuto:false,          // 是否启动了自动化任务
        sign_terminate_Auto:null,  // 终止自动化任务的信号
        fire_date_time_list:[],    // 自动化点火任务队列


        // 获取自动化任务是否正在运行
        getAutoRunning:function(){
            var t = this;
            if(t.total_taskRepeatTimes == 0) return false;

            if(t.enableAuto){
                return t.cur_taskRepeatTimes <= t.total_taskRepeatTimes
            }

            return false;
        },


        ////////////////////////////////////////////////////////////////////////
        //////// 核心处理部分 /////////////
        // 触发启动单次任务(用户或者系统)
        triggerStartOneTask:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_START_ONE_TASK);
        },

        // 触发任务已经处于启动状态
        triggerOneTaskIsRunning:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_TRIGGER_TASK_RUNNING);
        },

        // 触发停止任务，标记任务已经被停止
        triggerOneTaskStoped:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_TRIGGER_TASK_STOPED);
        },

        // 触发停止单个任务
        triggerStopOneTask:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_STOP_ONE_TASK);
        },
        ///////////////////////////////////////////////////////////////////////

        // 通知下一个任务进入准备点火状态
        triggerNoticeNextTaskReady:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_NOTICE_NEXTTASK_READY);
        },

        // 触发启动自动任务(用户操作)
        triggerStartAutoTask:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_START_AUTO);
        },

        // 停止自动任务(用户操作)
        triggerStopAutoTask:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_USER_STOP_AUTO);
        },


        // 触发单次任务开始(系统)
        triggerOneTaskStart:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_ONETASK_START);
        },

        // 触发单次任务结束(系统)
        triggerOneTaskFinished:function(){
            var t = this;
            if(t.enableAuto)
                t.cur_taskRepeatTimes++;
            t.Observer.trigger(t.eventType.EVENT_ONETASK_FINISHED);
            var compare = t.cur_taskRepeatTimes >= t.total_taskRepeatTimes;
            if(t.enableAuto && compare){
                t.triggerAllTasksFinished();
            }else if(t.enableAuto){
                t.triggerNoticeNextTaskReady();
            }
        },

        // 触发所有任务结束(系统)
        triggerAllTasksFinished:function(){
            var t = this;
            t.Observer.trigger(t.eventType.EVENT_ALLTASKS_FINISHED);
        }
    };

    // 绑定TaskWatcher事件
    c$.bindTaskWatcherEvent = function(){

        var tw = c$.TaskWatcher;
        var obs = tw.Observer;
        var evType = tw.eventType;

        // 单个任务被启动
        obs.bind(evType.EVENT_ONETASK_START, function(e){
            c$.UI_ProgressBar.updateUI('start the test...',1);

            if(tw.enableAuto){
                var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
                var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
                var times_No = tw.cur_taskRepeatTimes + 1;
                var total = tw.total_taskRepeatTimes;
                var info = 'Auto test is running. current is No.' + times_No + ' times. (' + times_No + ' / ' + total + ')';
                ui_runningInfo.text(info);
                ui_autoBtn.text('Stop run');
            }
        });

        // 单个任务完成
        obs.bind(evType.EVENT_ONETASK_FINISHED, function(e){
            // 更新进度条
            var progressUI = $("#progress").data('kendoProgressBar');
            c$.UI_ProgressBar.updateUI('...',progressUI.options.max);

            if(tw.enableAuto && tw.sign_terminate_Auto){
                try{
                    tw.enableAuto = false;
                    tw.sign_terminate_Auto = null;

                    var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
                    var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
                    var info = 'Cancel the auto test running...\nYou can run new auto test now';
                    ui_runningInfo.text(info);
                    ui_autoBtn.text('Auto Run');
                }catch(e){console.error(e)}
            }

        });

        // 自动化部分，接收到下一个任务进入准备阶段
        obs.bind(evType.EVENT_NOTICE_NEXTTASK_READY, function(e){
            var curTime = new Date();
            var fireTime = tw.fire_date_time_list[tw.cur_taskRepeatTimes];

            // 计算该点火点什么时候启动
            var msecs_start = fireTime - curTime;
            if(msecs_start <= 500) msecs_start = 500;

            // AutoUI 变化
            var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
            var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();

            var times_No = tw.cur_taskRepeatTimes + 1;
            var total = tw.total_taskRepeatTimes;

            var remindMsecs = msecs_start;
            var info = 'No.' + times_No + ' test will run after ' + Math.floor(remindMsecs/1000) + '\", Total: ' + total + ' times ...';
            ui_runningInfo.text(info);
            ui_autoBtn.text('Stop run');

            // 启动UI界面刷新
            tw.taskUIIntervalHandler = setInterval(function(){
                remindMsecs = remindMsecs - 1000;
                var info = 'No.' + times_No + ' test will run after ' + Math.floor(remindMsecs/1000) + '\", Total: ' + total + ' times ...';
                ui_runningInfo.text(info);
            },1000);

            // 触发
            tw.taskTimeHandler = setTimeout(function(){
                tw.taskUIIntervalHandler && clearInterval(tw.taskUIIntervalHandler);
                tw.triggerStartOneTask();
            }, msecs_start)
        });

        // 自动化部分，所有任务完成
        obs.bind(evType.EVENT_ALLTASKS_FINISHED, function(e){
            var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
            var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();

            var info = 'Complete run auto test, total: (' + tw.total_taskRepeatTimes + ') times. \n You can try again!';
            ui_runningInfo.text(info);
            ui_autoBtn.text('Auto Run');

            tw.enableAuto = false;
        });

        // 触发单个任务启动(用户或者系统)
        obs.bind(evType.EVENT_USER_START_ONE_TASK, function(e){
            _MC.send("onStartTestClick");
        });

        obs.bind(evType.EVENT_USER_TRIGGER_TASK_RUNNING, function(e){
            _MC.send("onSpeedTestRunning");
        });

        obs.bind(evType.EVENT_USER_TRIGGER_TASK_STOPED, function(e){
            _MC.send("onSpeedTestStoped");
        });

        // 触发单个任务的停止(用户或者系统)
        obs.bind(evType.EVENT_USER_STOP_ONE_TASK, function(e){
            _MC.send("onStopTestClick");
        });

        // 触发自动化任务启动
        obs.bind(evType.EVENT_USER_START_AUTO, function(e){
            _MC.send("AutoTestCtronl.start");
        });

        // 触发自动化任务中断
        obs.bind(evType.EVENT_USER_STOP_AUTO, function(e){
            tw.taskTimeHandler && clearTimeout(tw.taskTimeHandler);
            tw.taskUIIntervalHandler && clearInterval(tw.taskUIIntervalHandler);
            tw.sign_terminate_Auto = true;

            if(tw.getAutoRunning()) {
                tw.triggerStopOneTask();
            }else{
                var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
                var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
                var info = 'Auto test is canceled! \n You can try again!';
                ui_runningInfo.text(info);
                ui_autoBtn.text('Auto Run');
            }

        });


    };

    //////////////////////////////
    // 绑定观察器
    c$.bindTaskWatcherEvent();

    //绑定可识别的消息
    _MC.register("triggerStartOneTask", function(e){c$.TaskWatcher.triggerStartOneTask()});
    _MC.register("triggerStopOneTask", function(e){c$.TaskWatcher.triggerStopOneTask()});
    _MC.register("triggerOneTaskIsRunning", function(e){c$.TaskWatcher.triggerOneTaskIsRunning()});
    _MC.register("triggerOneTaskStoped", function(e){c$.TaskWatcher.triggerOneTaskStoped()});
    _MC.register("triggerNoticeNextTaskReady", function(e){c$.TaskWatcher.triggerNoticeNextTaskReady()});
    _MC.register("triggerStartAutoTask", function(e){c$.TaskWatcher.triggerStartAutoTask()});
    _MC.register("triggerStopAutoTask", function(e){c$.TaskWatcher.triggerStopAutoTask()});
    _MC.register("triggerOneTaskStart", function(e){c$.TaskWatcher.triggerOneTaskStart()});
    _MC.register("triggerOneTaskFinished", function(e){c$.TaskWatcher.triggerOneTaskFinished()});
    _MC.register("triggerAllTasksFinished", function(e){c$.TaskWatcher.triggerAllTasksFinished()});
    
    // 核心测试代码
    _MC.register("CallSpeedTest", function(e){c$.CallSpeedTest(e)});
    _MC.register("CallSpeedTestStop", function(e){c$.CallSpeedTestStop()});



    window.UI.c$ = $.extend(window.UI.c$, c$);
})();
