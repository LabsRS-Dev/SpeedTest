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

    /**
     * 初始化Toolbar
     *
     */
    c$.initToolbar = function(){
        var tplStr = '<div><img src="images/logo_64.png" width="36" onclick="'+ "window.UI.c$.MessageCenter.send('onHomePageClick')" +'"/><span data="version">Ver ' + b$.App.getAppVersion()+ "</span></div>";

        $('#toolbar').kendoToolBar({
            items:[
                { type: "button", id:'toolBtn-setting', text: "Preferences", enable: true, click: function(){_MC.send('openSettingsWindow');}},
                //{ type: "button", id:'toolBtn-auto', text: "Auto Test", enable: true, click: function(){_MC.send('openAutoConfigWindow');}},
                //{ type: "button", id:'toolBtn-ip', text: "Show IP", enable: true, click:function(){_MC.send('openIpInfoWindow');}},
                { type: "button", id:'toolBtn-history', text: "Temp History", enable: false, click: function(){_MC.send('onTmpHistoryClick');}},
                { type: "button", id:'toolBtn-fullHistory', text: "Full History", enable: false, click: function(){_MC.send('onFullHistoryClick');}},
                { type: "button", id:'toolBtn-faq', text: "FAQ",click: function(){_MC.send('onFeedbackClick');}},
                { type: "button", id:'toolBtn-feedback', text: "Feedback",click: function(){_MC.send('FeedBackDialog.show');}},
                b$.App.getSandboxEnable() == true ? { type: "button", id:'toolBtn-review', text: "Rate App",click: function(){_MC.send('onReviewClick');}} : {},
                { type: "separator", spriteCssClass: "flex-width" },
                {template: tplStr }
            ]
        });

    };

    //////////////////////////////
    //绑定可识别的消息
    _MC.register("initToolbar", function(e){c$.initToolbar()});


    window.UI.c$ = $.extend(window.UI.c$, c$);
})();