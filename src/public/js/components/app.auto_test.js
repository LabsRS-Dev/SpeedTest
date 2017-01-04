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

    c$.UI_AutoConfig = {
        getUI_autoBtn:function(){
            return $("#autoTestConfig-window > .settings-panel .k-footer .k-button:first-child");
        },

        getUI_runningInfo:function(){
            return $("#autoTestConfig-window > .settings-panel .runningInfo");
        },

        getUI_closeBtn:function(){
            return $("#autoTestConfig-window > div.settings-panel > div.k-footer > button:nth-child(2)");
        }

    };

    c$.openAutoConfigWindow = function(e){
        var autoTestConfigWindow = $("#autoTestConfig-window");
        if(!autoTestConfigWindow.data('kendoWindow')){
            autoTestConfigWindow.kendoWindow({
                actions: ["Close"],
                title: "Auto Repeat Test Config",
                width: '420px',
                height: '240px',
                model:true,
                resizable: true
            });

            var autoConfigTemplate = kendo.template($('#template-window-auto-test').html());
            autoTestConfigWindow.html(autoConfigTemplate({}));

            // 初始化配置选项
            $('#auto-app-ui-pre-minutes').kendoNumericTextBox({
                min:5,
                max: 24*60,
                format: 'n0',
                value:c$.settingsConfig_default.autoPreMinutes_min,
                step:1
            });

            $('#auto-app-ui-start-time').kendoDateTimePicker({
                value:new Date()
            });

            $('#auto-app-ui-end-time').kendoDateTimePicker({
                value:new Date()
            });

            // 绑定事件
            var ctrlBtn = c$.UI_AutoConfig.getUI_autoBtn();
            ctrlBtn.kendoButton({
                click:function(){
                    var tw = c$.TaskWatcher;
                    // 检查当前状态，如果自动化模式正在运行，那么进入停止，否则自动启动
                    if(tw.getAutoRunning()){
                        tw.triggerStopAutoTask();
                    }else{
                        tw.triggerStartAutoTask();
                    }
                }
            });


            c$.UI_AutoConfig.getUI_closeBtn().on('click', function(event){
                autoTestConfigWindow.data('kendoWindow').close();
            });
        }

        var w = autoTestConfigWindow.data("kendoWindow");
        w.center();
        w.open();
    };
    
    /// 自动化测试控制器
    c$.AutoTestCtronl = {
        enableAuto: false,          // 是否启动了自动化任务
        total_taskRepeatTimes: 0,   // 任务调度总的要求的执行次数
        cur_taskRepeatTimes: 0,     // 当前任务执行了几次
        fire_date_time_list: [],    // 自动化点火任务队列
        taskUIIntervalHandler: null,// 任务UI界面调度器ID
        taskTimeHandler: null,      // 任务调度器的ID
        sign_terminate_Auto:null,   // 终止自动化任务的信号
        

        
        // Methods
        getAutoTestIsRunning:function(){ /// 检查当前自动化测试是否正在运行中
            var t = this;
            if(t.total_taskRepeatTimes == 0) return false;
            if (t.enableAuto) {
                return t.cur_taskRepeatTimes <= t.total_taskRepeatTimes
            }

            return false;
        },
        
        start:function(){ /// 启动自动化测试
            var t = this;
            var preMinutes = $('#auto-app-ui-pre-minutes').data("kendoNumericTextBox").value();
            var startDate = $('#auto-app-ui-start-time').data("kendoDateTimePicker").value();
            var endDate = $('#auto-app-ui-end-time').data("kendoDateTimePicker").value();
            
            // 检查时间
            if ((endDate.getTime() - parseInt(preMinutes) * 60 * 1000) < startDate.getTime()) {
                alert('End time is greater than the start time of at least ' + preMinutes + ' minutes');
                return;
            }
            
            // 计算间隔
            var interval = parseInt(preMinutes) * 60 * 1000;
            var totalTimes = parseInt((endDate.getTime() - startDate.getTime()) / interval);
            
            t.enableAuto = true;                  //启动了自动化任务
            t.total_taskRepeatTimes = totalTimes; //任务调度总的要求的执行次数
            t.cur_taskRepeatTimes = 0;            //当前任务执行了几次初始化
            t.fire_date_time_list = [];           //自动化点火任务队列初始化
            
            // 计算启动时间
            var curMsecs = (new Date()).getTime();
            var msecs_start = startDate.getTime() - curMsecs;
            if (msecs_start <= 500) msecs_start = 500;
            
            // 计算点火时间
            for (var i = 0; i < totalTimes; ++i) {
                var fire = i * interval + msecs_start + curMsecs;
                t.fire_date_time_list.push(fire);
            }
            
            // AutoUI 变化
            var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
            var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();

            var total = t.total_taskRepeatTimes;

            var remindMsecs = msecs_start;
            var info = 'Auto test will run after ' + Math.floor(remindMsecs / 1000) + '\", Total: ' + total + ' times ...';
            ui_runningInfo.text(info);
            ui_autoBtn.text('Stop run');

            // 启动UI界面刷新
            t.taskUIIntervalHandler = setInterval(function () {
                remindMsecs = remindMsecs - 1000;
                var info = 'Auto test will run after ' + Math.floor(remindMsecs / 1000) + '\", Total: ' + total + ' times ...';
                ui_runningInfo.text(info);
            }, 1000);

            // 设置启动时间
            t.taskTimeHandler = setTimeout(function () {
                t.taskUIIntervalHandler && clearInterval(t.taskUIIntervalHandler);
                //启动速度测试
                _MC.send("onStartTestClick");
            }, msecs_start);

        },
        
        stop:function(){ /// 关闭自动化测试
            var t = this;
            t.taskTimeHandler && clearTimeout(t.taskTimeHandler);
            t.taskUIIntervalHandler && clearInterval(t.taskUIIntervalHandler);
            t.sign_terminate_Auto = true;
            
            if(t.getAutoTestIsRunning()){
                ///TODO: 发送终止一切运行的任务
                _MC.send("onStopTestClick");
            }
        },
        
        onTestCancel:function(){ /// 当自动化测试被取消时候，更新UI
            var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
            var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
            var info = 'Auto test is canceled! \n You can try again!';
            ui_runningInfo.text(info);
            ui_autoBtn.text('Auto Run'); 
        },
        
        onSubTestIsStart:function(){ /// 当自动化测试中子任务开始被启动
           var t = this;
           if (t.enableAuto){
               var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
               var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
               var times_No = t.cur_taskRepeatTimes + 1;
               var total = t.total_taskRepeatTimes;
               var info = 'Auto test is running. current is No.' + times_No + ' times. (' + times_No + ' / ' + total + ')';
               ui_runningInfo.text(info);
               ui_autoBtn.text('Stop run');
           } 
        },
        
        onSubTestHasError:function(){ /// 当自动化测试中子任务发现Error
            
        },
        
        onSubTestIsCancel:function(){  /// 当自动化测试中子任务被取消
            var t = this;
            t.private_NextSubTestGoToReady();
        },
        
        onSubTestIsFinished:function(){ /// 当自动化测试中子任务完成
            var t = this;
            if(t.enableAuto && t.sign_terminate_Auto){
                t.enableAuto = false;
                t.sign_terminate_Auto = null;

                var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
                var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();
                var info = 'Cancel the auto test running...\nYou can run new auto test now';
                ui_runningInfo.text(info);
                ui_autoBtn.text('Auto Run');
            }else if(t.enableAuto){
                t.private_NextSubTestGoToReady();
            }
        },
        
        private_NextSubTestGoToReady:function(){ /// 自动化部分,接收到下一个任务进入准备阶段
            var t = this;
            if (t.enableAuto){
                var curTime = new Date();
                var fireTime = t.fire_date_time_list[t.cur_taskRepeatTimes];

                // 计算该点火点什么时候启动
                var msecs_start = fireTime - curTime;
                if (msecs_start <= 500) msecs_start = 500;

                // AutoUI 变化
                var ui_runningInfo = c$.UI_AutoConfig.getUI_runningInfo();
                var ui_autoBtn = c$.UI_AutoConfig.getUI_autoBtn();

                var times_No = t.cur_taskRepeatTimes + 1;
                var total = t.total_taskRepeatTimes;

                var remindMsecs = msecs_start;
                var info = 'No.' + times_No + ' test will run after ' + Math.floor(remindMsecs / 1000) + '\", Total: ' + total + ' times ...';
                ui_runningInfo.text(info);
                ui_autoBtn.text('Stop run');

                // 启动UI界面刷新
                t.taskUIIntervalHandler = setInterval(function () {
                    remindMsecs = remindMsecs - 1000;
                    var info = 'No.' + times_No + ' test will run after ' + Math.floor(remindMsecs / 1000) + '\", Total: ' + total + ' times ...';
                    ui_runningInfo.text(info);
                }, 1000);

                // 触发
                t.taskTimeHandler = setTimeout(function () {
                    t.taskUIIntervalHandler && clearInterval(t.taskUIIntervalHandler);
                    //启动速度测试
                    _MC.send("onStartTestClick");
                }, msecs_start)
            }
        }
    };

    //////////////////////////////
    //绑定可识别的消息
    _MC.register("openAutoConfigWindow", function(e){c$.openAutoConfigWindow();});
    _MC.register("AutoTestCtronl.start", function(e){c$.AutoTestCtronl.start();});
    _MC.register("AutoTestCtronl.stop", function(e){c$.AutoTestCtronl.stop();});
    
    ///{sub} 控制状态的变化绑定
    _MC.register("AutoTestCtronl.onTestCancel", function(e){c$.AutoTestCtronl.onTestCancel();});
    _MC.register("AutoTestCtronl.onSubTestIsStart", function(e){c$.AutoTestCtronl.onSubTestIsStart();});
    _MC.register("AutoTestCtronl.onSubTestIsCancel", function(e){c$.AutoTestCtronl.onSubTestIsCancel();});
    _MC.register("AutoTestCtronl.onSubTestIsFinished", function(e){c$.AutoTestCtronl.onSubTestIsFinished();});
    _MC.register("AutoTestCtronl.onSubTestHasError", function(e){c$.AutoTestCtronl.onSubTestHasError();});
    


    window.UI.c$ = $.extend(window.UI.c$, c$);
})();
