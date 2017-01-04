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

    // 设置配置选项
    c$.settingsConfig_default = {
        pingScale:360,
        downloadScale:512,
        uploadScale:64,

        //{自动化选项}
        autoPreMinutes_min:5,  // 每5分钟执行一次，最低频率
        autoStartTime:function(){return new Date()}, // 自动化启动时间
        autoEndTime:function(){return new Date()}    // 自动化停止时间
    };

    c$.settingsConfig = {
        current: function(){
            return c$.settingsConfig_default;
        }(),

        load:function(){
            var settings = window.localStorage.getItem('settings_speedtest') || null;
            if(settings){
                var obj = JSON.parse(settings);
                c$.settingsConfig.current = obj;

                // 关联到UI SpeedTest设置选项
                c$.ctrlSpeedTestUI.updateScale(c$.settingsConfig.current);
            }
        },

        save:function(){
            if(c$.settingsConfig.current){

                // 关联到UI SpeedTest设置选项
                c$.ctrlSpeedTestUI.updateScale(c$.settingsConfig.current);

                var dataStr = JSON.stringify(c$.settingsConfig.current);
                window.localStorage.setItem('settings_speedtest', dataStr);
            }
        }
    };

    c$.openSettingsWindow = function(e){
        var settingsWindow = $('#settings-window');
        var currentSettings = c$.settingsConfig.current;
        if(!settingsWindow.data('kendoWindow')){
            settingsWindow.kendoWindow({
                actions: ["Close"],
                title: "Preferences",
                width: '360px',
                height: '220px',
                resizable: false,
                model:true
            });


            var contentTemplate = kendo.template($('#template-window-settings').html());
            settingsWindow.html(contentTemplate({}));

            //初始化配置选项
            $('#settings-app-ui-ping').kendoNumericTextBox({
                min:6,
                max:6000,
                format: 'n0',
                value:currentSettings.pingScale,
                step:6
            });
            $('#settings-app-ui-download').kendoNumericTextBox({
                min:4,
                max:2200,
                format: 'n0',
                value:currentSettings.downloadScale,
                step:4
            });
            $('#settings-app-ui-upload').kendoNumericTextBox({
                min:2,
                max:2200,
                format: 'n0',
                value:currentSettings.uploadScale,
                step:2
            });

            //绑定事件
            $("#settings-window > .settings-panel .k-footer .k-button:first-child").on('click', function(event){
                c$.settingsConfig.current = $.objClone(c$.settingsConfig_default);
                var current = c$.settingsConfig.current;
                $('#settings-app-ui-ping').data("kendoNumericTextBox").value(current.pingScale);
                $('#settings-app-ui-download').data("kendoNumericTextBox").value(current.downloadScale);
                $('#settings-app-ui-upload').data("kendoNumericTextBox").value(current.uploadScale);
                c$.settingsConfig.save();
            });

            $("#settings-window > div.settings-panel > div.k-footer > button:nth-child(2)").on('click', function(event){
                // 设置选项
                c$.settingsConfig.current = {
                    pingScale: function(){
                        return $('#settings-app-ui-ping').data("kendoNumericTextBox").value()
                    }(),
                    downloadScale:function(){
                        return $('#settings-app-ui-download').data("kendoNumericTextBox").value()
                    }(),
                    uploadScale:function(){
                        return $('#settings-app-ui-upload').data("kendoNumericTextBox").value()
                    }()
                };
                c$.settingsConfig.save();
                settingsWindow.data('kendoWindow').close();
            });
        }

        var w = settingsWindow.data("kendoWindow");
        w.center();
        w.open();
    };

    //////////////////////////////
    //绑定可识别的消息
    _MC.register("openSettingsWindow", function(e){c$.openSettingsWindow()});
    _MC.register("settingsConfig.load", function(e){c$.settingsConfig.load()});
    _MC.register("settingsConfig.save", function(e){c$.settingsConfig.save()});

    window.UI.c$ = $.extend(window.UI.c$, c$);
})();

