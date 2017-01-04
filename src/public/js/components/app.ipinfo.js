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

    c$.openIpInfoWindow = function(e){
        var ipInfoWindow = $('#ipinfo-window');
        if(!ipInfoWindow.data('kendoWindow')){
            ipInfoWindow.kendoWindow({
                actions: ["Close"],
                title: "IP Information",
                width: '410px',
                height: '340px',
                model:true,
                resizable: false
            });

            var ipinfoTemplate = kendo.template($('#template-window-ipinfo').html());
            ipInfoWindow.html(ipinfoTemplate({}));

            //create ipinfo data and refreshUI
            c$.ctrlIpInfoUI.createIpInfoList();
            c$.ctrlIpInfoUI.refreshUI();
        }

        c$.ctrlIpInfoUI.refreshUI();
        var w = ipInfoWindow.data("kendoWindow");
        w.center();
        w.open();
    };

    c$.UI_ipinfo_data = [
//        {key:'', value:'Local IP info', groupClass:'item-group', enableLocation:false}
//        ,{key:'ip', value:'127.0.0.1', groupClass:'', enableLocation:false}
    ];

    c$.ctrlIpInfoUI = {
        createIpInfoList:function(){
            c$.ds_ipInfo = kendo.data.DataSource.create({
                data:c$.UI_ipinfo_data
            });

            $('#ip-grid').kendoGrid({
                dataSource:c$.ds_ipInfo,
                height: 300,
                scrollable: true,
                selectable: "row",
                rowTemplate: kendo.template($("#viewTemplate-ipinfo-item").html()),
                columns:[
                    {hidden: true, field:"key"}
                ]
            })
        },

        updateIpInfoData:function(IPInfoDataList){
            c$.ds_ipInfo = IPInfoDataList;
        },

        refreshUI:function(){
            var old_ds_ipInfo = c$.ds_ipInfo;
            delete old_ds_ipInfo;

            c$.ds_ipInfo = kendo.data.DataSource.create({
                data:c$.UI_ipinfo_data
            });


            $('#ip-grid').data('kendoGrid').setDataSource(c$.ds_ipInfo);
        }
    };

    // 初始化，或者检测IP信息
    c$.checkIPInfo = function(){
        c$.actions.onGetIPInfoClick();
    };

    //////////////////////////////
    //绑定可识别的消息
    c$.MessageCenter.register("openIpInfoWindow", function(e){c$.openIpInfoWindow()});


    ////////////////////////////

    window.UI.c$ = $.extend(window.UI.c$, c$);
})();
