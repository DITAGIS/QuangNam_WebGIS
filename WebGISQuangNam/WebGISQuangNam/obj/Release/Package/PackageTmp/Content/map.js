require([
        "dojo/_base/unload", "dojo/cookie", "dojo/json", "esri/IdentityManager", "esri/toolbars/navigation", // 1
        "dijit/registry", "dojo/on", "esri/map", "esri/dijit/OverviewMap", "esri/layers/FeatureLayer",// 2
        "esri/dijit/AttributeInspector", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/layers/ArcGISDynamicMapServiceLayer", // 3
        "esri/layers/ImageParameters", "esri/layers/ArcGISTiledMapServiceLayer", "esri/tasks/query", "dojo/query", "dojo/parser", // 4
        "dojo/dom-construct", "dijit/form/Button", "esri/tasks/GeometryService", "esri/geometry/Point", "esri/tasks/ProjectParameters", // 5
        "esri/SpatialReference", "esri/tasks/QueryTask", "esri/layers/GraphicsLayer", "esri/geometry/Extent", "esri/geometry/Polygon", // 6
        "esri/dijit/HomeButton", "esri/symbols/SimpleMarkerSymbol", "esri/graphic", "esri/dijit/Scalebar", "esri/arcgis/utils", // 7
        "esri/dijit/LayerList", "esri/dijit/editing/TemplatePicker", "esri/dijit/Legend", "esri/dijit/editing/Editor", "dojo/i18n!esri/nls/jsapi",// 8
        "dojo/keys", "dojo/_base/array", "dojo/dom", "dgrid/OnDemandGrid", "dgrid/Selection", // 9
        "dojo/store/Memory", "dojo/_base/declare", "esri/dijit/Print", "esri/tasks/PrintTemplate", "esri/request", "esri/config", // 10
        "esri/geometry/geometryEngine", "esri/InfoTemplate", "esri/geometry/normalizeUtils", "esri/tasks/BufferParameters", "dojo/_base/lang",
      "esri/dijit/LocateButton", "esri/dijit/BasemapGallery", "esri/layers/Domain",
        "esri/dijit/Search", "esri/SnappingManager", "esri/dijit/Measurement", "dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",

        "esri/toolbars/draw", "dijit/Toolbar", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!" // 12
], function (
       baseUnload, cookie, JSON, esriId, Navigation,
        registry, on, Map, OverviewMap, FeatureLayer,
        AttributeInspector, SimpleLineSymbol, SimpleFillSymbol, Color, ArcGISDynamicMapServiceLayer,
        ImageParameters, ArcGISTiledMapServiceLayer, Query, dojoQuery, parser,
        domConstruct, Button, GeometryService, Point, ProjectParameters,
        SpatialReference, QueryTask, GraphicsLayer, Extent, Polygon,
        HomeButton, SimpleMarkerSymbol, Graphic, Scalebar, arcgisUtils,
        LayerList, TemplatePicker, Legend, Editor, jsapiBundle,
        keys, array, dom, Grid, Selection,
        Memory, declare, Print, PrintTemplate, esriRequest,
        esriConfig, geometryEngine, InfoTemplate, normalizeUtils,
        BufferParameters, lang, LocateButton, BasemapGallery, Domain, Search, SnappingManager, Measurement, Menu, MenuItem, MenuSeparator
) {


    parser.parse();
    // refer to "Using the Proxy Page" for more information:  https://developers.arcgis.com/javascript/jshelp/ags_proxy.html
    esriConfig.defaults.io.proxyUrl = "~/DotNet/proxy.ashx";
    esriConfig.defaults.io.alwaysUseProxy = false;
    //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
    esriConfig.defaults.geometryService = new GeometryService("http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");


    var imageParameters = new ImageParameters();
    imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

    var linkBaseMap = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamBasemap/MapServer";

    var linkGISMap = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamSDD/MapServer";

    var printUrl = "https://sawagis.vn/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

    //var linkQHCT = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/13";
    // var linkQHPK = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/13";
    // var linkThongTinDoAn = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamSDD/MapServer/2";

    var linkQuangNamQHC = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer";
    var linkQuangNamQHPK = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer";
    var linkQuangNamQHCT = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer";
    var linkQuangNamQHV = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer";
    var linkQuangNamQHNT = "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer";


    var sr = new SpatialReference({
        "wkt": 'PROJCS["QUANG NAM_VN2000",GEOGCS["GCS_VN_2000",DATUM["D_Vietnam_2000",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",107.75],PARAMETER["Scale_Factor",0.9999],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
    });

    //var labels = [12500000, 10000000 , 5000000, 2000000 , 1000000, 500000 ,200000 ,100000 , 70000 ,50000 , 20000 , 10000 , 5000 , 2000 ];
    //esri.config.defaults.map.sliderLabel = { liderLabels: labels };

    var startExtent = new Extent(425618.68874842953, 1721185.1070699922, 618764.9083742021, 1796062.3401577917,
         new SpatialReference({ wkid: sr }));

    var map = new Map("mapDiv", {
        spatialReference: sr,
        center: [108.0599533, 15.6474107],
        zoom: 9,
        logo: false,
        basemap: "osm",
        slider: true,
        // extent: startExtent ,
        sliderPosition: "bottom-right",
        sliderStyle: "small",
        autoResize: true,
        showLabels: true
        // ,
        // sliderStyle: "large",
        // sliderLabels: labels
    });


    var baseMap = new ArcGISDynamicMapServiceLayer(linkBaseMap, {
        "imageParameters": imageParameters,
        "id": "Bản đồ nền"
    });

    var gISMap = new ArcGISDynamicMapServiceLayer(linkGISMap, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề"
    });


    var gISMapQuangNamQHC = new ArcGISDynamicMapServiceLayer(linkQuangNamQHC, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề QH Chung"
    });

    var gISMapQuangNamQHPK = new ArcGISDynamicMapServiceLayer(linkQuangNamQHPK, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề QH Phân Khu"
    });

    var gISMapQuangNamQHNT = new ArcGISDynamicMapServiceLayer(linkQuangNamQHNT, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề QH Nông Thôn"
    });

    var gISMapQuangNamQHCT = new ArcGISDynamicMapServiceLayer(linkQuangNamQHCT, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề"
    });

    var gISMapQuangNamQHV = new ArcGISDynamicMapServiceLayer(linkQuangNamQHV, {
        "imageParameters": imageParameters,
        "id": "Bản đồ chuyên đề QH Vùng"
    });

    var SDD_QuangNamQHCSDD = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/14", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });

    var SDD_QuangNamQHCT = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/13", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });

    var SDD_QuangNamQHNT = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/13", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });

    var SDD_QuangNamQHPK = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/13", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });

    var SDD_QuangNamQHV = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/12", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var ThongTinDoAnQuangNamQHCT = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/14", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var ThongTinDoAnQuangNamQHC = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/15", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var ThongTinDoAnQuangNamQHNT = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/14", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var ThongTinDoAnQuangNamQHPK = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/14", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var ThongTinDoAnQuangNamQHV = new esri.layers.FeatureLayer("https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/13", { //Feature 1
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        "opacity": 0.9
    });


    var polySymbolRed = new SimpleFillSymbol(
           SimpleFillSymbol.STYLE_SOLID,
           new SimpleLineSymbol(
             SimpleLineSymbol.STYLE_SOLID,
             new Color([127, 255, 255, 255]), 3
           ),
           new Color([255, 0, 0, 0.25])
         );


    //  var countyLayer = new GraphicsLayer();
    //  countyLayer.setMaxScale(100000);

    map.addLayer(baseMap);
    //map.addLayer(countyLayer);
    map.addLayer(gISMapQuangNamQHV);
    map.addLayer(gISMapQuangNamQHC);
    map.addLayer(gISMapQuangNamQHNT);
    map.addLayer(gISMapQuangNamQHPK);
    map.addLayer(gISMapQuangNamQHCT);

    ThongTinDoAnQuangNamQHV.setSelectionSymbol(polySymbolRed);
    ThongTinDoAnQuangNamQHC.setSelectionSymbol(polySymbolRed);
    ThongTinDoAnQuangNamQHNT.setSelectionSymbol(polySymbolRed);
    ThongTinDoAnQuangNamQHPK.setSelectionSymbol(polySymbolRed);
    ThongTinDoAnQuangNamQHCT.setSelectionSymbol(polySymbolRed);
    SDD_QuangNamQHV.setSelectionSymbol(polySymbolRed);
    SDD_QuangNamQHCSDD.setSelectionSymbol(polySymbolRed);
    SDD_QuangNamQHNT.setSelectionSymbol(polySymbolRed);
    SDD_QuangNamQHPK.setSelectionSymbol(polySymbolRed);
    SDD_QuangNamQHCT.setSelectionSymbol(polySymbolRed);

    map.addLayers([ThongTinDoAnQuangNamQHV, ThongTinDoAnQuangNamQHC, ThongTinDoAnQuangNamQHNT, ThongTinDoAnQuangNamQHPK, ThongTinDoAnQuangNamQHCT
    , SDD_QuangNamQHV, SDD_QuangNamQHCSDD, SDD_QuangNamQHNT, SDD_QuangNamQHPK, SDD_QuangNamQHCT]);


    var homeButton = new HomeButton({
        theme: "HomeButton",
        map: map,
        extent: null,
        visible: false
    }, "HomeButton");
    homeButton.startup();

    $("#home").click(function () {
        homeButton.home();
    });

    var width = $(window).width();
    if (width <= 767) {
        $("#searchButton").css('top', '60px');
    }

    var scalebar = new Scalebar({
        map: map,
        scalebarUnit: "metric",
        attachTo: "bottom-right"
    });


    var layers = [
                     {
                         layer: baseMap, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ nền",// optional
                         title: "Bản đồ nền"
                     },
                     {
                         layer: gISMapQuangNamQHV, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ chuyên đề QH Vùng",// optional
                         title: "Bản đồ chuyên đề QH Vùng"
                     },
                     {
                         layer: gISMapQuangNamQHC, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ chuyên đề QH Chung",// optional
                         title: "Bản đồ chuyên đề QH Chung"
                     },
                     {
                         layer: gISMapQuangNamQHNT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ chuyên đề QH Nông Thôn",// optional
                         title: "Bản đồ chuyên đề QH Nông Thôn"
                     },
                     {
                         layer: gISMapQuangNamQHPK, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ chuyên đề QH Phân Khu",// optional
                         title: "Bản đồ chuyên đề QH Phân Khu"
                     },
                     {
                         layer: gISMapQuangNamQHCT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Bản đồ chuyên đề QH Chi Tiết",// optional
                         title: "Bản đồ chuyên đề QH Chi Tiết"
                     },
                     {
                         layer: ThongTinDoAnQuangNamQHV, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin đồ án QH Vùng",// optional
                         title: "Xem thông tin đồ án QH Vùng"
                     },
                     {
                         layer: ThongTinDoAnQuangNamQHC, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin đồ án QH Chung",// optional
                         title: "Xem thông tin đồ án QH Chung"
                     },
                     {
                         layer: ThongTinDoAnQuangNamQHNT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin đồ án QH Nông Thôn",// optional
                         title: "Xem thông tin đồ án QH Nông Thôn"
                     },
                     {
                         layer: ThongTinDoAnQuangNamQHPK, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin đồ án QH Phân khu",// optional
                         title: "Xem thông tin đồ án QH Phân Khu"
                     },
                     {
                         layer: ThongTinDoAnQuangNamQHCT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin đồ án QH Chi tiết",// optional
                         title: "Xem thông tin đồ án QH Chi tiết"
                     },
                     {
                         layer: SDD_QuangNamQHV, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin QHV Sử dụng đất",// optional
                         title: "Xem thông tin QHV Sử dụng đất"
                     },
                     {
                         layer: SDD_QuangNamQHCSDD, // required unless featureCollection.SDD_QuangNamQHV
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin QHC Sử dụng đất",// optional
                         title: "Xem thông tin QHC Sử dụng đất"
                     },
                     {
                         layer: SDD_QuangNamQHNT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin QHNT Sử dụng đất",// optional
                         title: "Xem thông tin QHNT Sử dụng đất"
                     },
                     {
                         layer: SDD_QuangNamQHPK, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin QHPK Sử dụng đất",// optional
                         title: "Xem thông tin QHPK Sử dụng đất"
                     },
                     {
                         layer: SDD_QuangNamQHCT, // required unless featureCollection.
                         subLayers: true, // optional
                         visibility: true, // optional
                         id: "Xem thông tin QHCT Sử dụng đất",// optional
                         title: "Xem thông tin QHCT Sử dụng đất"
                     }

    ];

    var myWidget = new LayerList({
        map: map,
        layers: layers,
        showLegend: true
    }, "listLayer");
    myWidget.startup();

    if (layers.length > 0) {
        var legendDijit = new Legend({
            map: map,
            layerInfos: layers
        }, "legendDiv");
        legendDijit.startup();
    }

    $("#legendDiv_panel").slideUp();


    var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true,
        map: map
    }, "basemapGalleryDiv");
    basemapGallery.startup();

    basemapGallery.on("load", function () {
    });


    basemapGallery.on("error", function (msg) {
        console.log("basemap gallery error:  ", msg);
    });

    $("#basemapGalleryDiv_panel").slideUp();
    $("#choiceMapData").on("click", function () {
        $(".panel_control").slideUp();
        $("#basemapGalleryDiv_panel").toggle("slide");
    });

    ////////////////////////////////

    var navToolbar;
    navToolbar = new Navigation(map);
    on(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

    registry.byId("zoomin").on("click", function () {
        navToolbar.activate(Navigation.ZOOM_IN);
    });

    registry.byId("zoomout").on("click", function () {
        navToolbar.activate(Navigation.ZOOM_OUT);
    });

    registry.byId("zoomfullext").on("click", function () {
        navToolbar.zoomToFullExtent();
    });

    registry.byId("zoomprev").on("click", function () {
        navToolbar.zoomToPrevExtent();
    });

    registry.byId("zoomnext").on("click", function () {
        navToolbar.zoomToNextExtent();
    });

    registry.byId("pan").on("click", function () {
        navToolbar.activate(Navigation.PAN);
    });

    registry.byId("deactivate").on("click", function () {
        navToolbar.deactivate();
    });

    function extentHistoryChangeHandler() {
        registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
        registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
    }

    $("#maxMapData").on("click", function () {

        var width = $("#mapDiv").width();
        var height = $("#mapDiv").height();

        //alert(width);

        if ($('#headerTop').css('display') == 'none') {
            // true


            $("#headerTop").css("display", "block");
            if (width >= 1366) {
                $("#layerMapData").css("top", "95px");
                $("#maxMapData").css("top", "125px");
            }

            if (width >= 1024 && width < 1366) {
                $("#layerMapData").css("top", "95px");
                $("#maxMapData").css("top", "125px");
            }

            if (width >= 767 && width < 1024) {
                $("#layerMapData").css("top", "80px");
                $("#maxMapData").css("top", "110px");
            }

            var h_header = $("#headerTop").height();
            height = height - h_header;
            // alert(height);
            $("#mapDiv").css("height", height + "px");

        }
        else {

            var h_header = $("#headerTop").height();
            $("#headerTop").css("display", "none");
            if (width >= 1366) {
                var top = 125 - h_header;
                var top2 = top - 30;
                //alert(top);
                $("#layerMapData").css("top", top2 + "px");
                $("#maxMapData").css("top", top + "px");
            }

            if (width >= 1024 && width < 1366) {
                var top = 125 - h_header;
                var top2 = top - 30;
                $("#layerMapData").css("top", top2 + "px");
                $("#maxMapData").css("top", top + "px");
            }

            if (width >= 767 && width < 1024) {
                var top = 110 - h_header;
                var top2 = top - 30;
                $("#layerMapData").css("top", top2 + "px");
                $("#maxMapData").css("top", top + "px");
            }

            height = height + h_header;
            //alert(height);
            $("#mapDiv").css("height", height + "px");

        }


    });


    $("#listLayer_panel").slideUp();
    $("#layerMapData").on("click", function () {
        $(".panel_control").slideUp();
        $("#listLayer_panel").toggle("slide");
    });

    $("#inforMapData").on("click", function () {
        $(".panel_control").slideUp();
        $("#messageBoxInforMap").slideDown();
    });
    $(".closemessageBoxInforMap").on("click", function () {
        $(".panel_control").slideUp();
        $("#messageBoxInforMap").slideUp();
    });


    $("#btfrm_PrintData").on("click", function () {
        $(".panel_control").slideUp();
        $("#printDiv_panel").toggle("slide");
    });

    $(".closePanel").on("click", function () {
        $(".panel_control").slideUp();
    });

    // công bố

    $(".call_bandoquyhoach_congbo").on("click", function () {
        var alt = $(this).attr('title');
        if (alt) {
            zoomThongTinDoAn(alt);
        }
    });

    $(".openGisCongBo").on("click", function () {
        var alt = $(this).attr('alt');
        if (alt) {
            zoomThongTinDoAn(alt);
        }
    });

    /// end công bố

    /// thông tin quy hoạch ////

    $(".call_bandoquyhoach").on("click", function () {
        // $(".panel_control").slideUp();
        var maDoAn = $(this).attr('title');
        //alert(maDoAn);
        if (maDoAn) {
            zoomThongTinDoAn(maDoAn);
        }
    });

    /// end thông tin quy hoạch ///

    /// công bố lấy ý kiến

    $(".call_bandoquyhoach_layykien").on("click", function () {
        //  $(".panel_control").slideUp();

        var alt = $(this).attr('title');
        //  var title = $(this).attr('title');

        // call_layykien_danhmuchoso = alt;
       // alert(alt);
        if (alt) {
            zoomThongTinDoAn(alt);
            //   $("#txtIDMaDoAnLayYKien").val(alt);
        }
        //var package_path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

        //package_path = package_path.replace("/Home", "");

        //package_path += "/Home/LayYKien?madoan=" + alt;

        //$("#linkDongGopYKien").attr("href", package_path);

        //$("#layykien_ttqh_danhmuchs_footer").html(title);
        //getHoSoThongTinQuyHoach_LayYKien(alt);

    });
    //$("#DanhMucHoSoQHLayYKien_panel").slideUp();

    /// end công bố lấy ý kiến


    $("#TraCuuDoAnQuyHoach").on("click", function () {
        $(".panel_control").slideUp();
        $("#TraCuuDoAnQuyHoach_panel").toggle("slide");
    });
    $("#TraCuuDoAnQuyHoach_panel").slideUp();


    $("#TraCuuHoTroCapPhep").on("click", function () {
        $(".panel_control").slideUp();
        $("#TraCuuHoTroCapPhep_panel").toggle("slide");
    });
    $("#TraCuuHoTroCapPhep_panel").slideUp();


    $("#LuaChonDiaDiemDauTu").on("click", function () {
        $(".panel_control").slideUp();
        $("#LuaChonDiaDiemDauTu_panel").toggle("slide");
    });
    $("#LuaChonDiaDiemDauTu_panel").slideUp();

    /// tra cứu ////


    /////// end tra cứu ///////


    var geoLocate = new LocateButton({
        map: map,
        visible: false
    }, "LocateButtonEsri");
    geoLocate.startup();

    $("#LocateButton").click(function () {
        geoLocate.locate();
    });

    var measurement = new Measurement({
        map: map
    }, dom.byId("measurementDiv"));
    measurement.startup();

    $("#measurementDiv_panel").slideUp();


    //// menu ////

    var ctxMenuForMap;

    map.on("load", createToolbarAndContextMenu);

    function createToolbarAndContextMenu() {
        createMapMenu();
    }

    function createMapMenu() {
        // Creates right-click context menu for map
        ctxMenuForMap = new Menu({
            onOpen: function (box) {
                //// Lets calculate the map coordinates where user right clicked.
                //// We'll use this to create the graphic when the user clicks
                //// on the menu item to "Add Point"
                //currentLocation = getMapPointFromMenuPosition(box);
            }
        });

        ctxMenuForMap.addChild(new MenuItem({
            label: "Đo khoảng cách",
            onClick: function (evt) {
                $(".panel_control").slideUp();
                $("#measurementDiv_panel").toggle("slide");
            }
        }));
        ctxMenuForMap.addChild(new MenuItem({
            label: "Chú giải bản đồ",
            onClick: function (evt) {
                $(".panel_control").slideUp();
                $("#legendDiv_panel").toggle("slide");
            }
        }));

        ctxMenuForMap.startup();
        ctxMenuForMap.bindDomNode(map.container);
    }

    // Helper Methods
    function getMapPointFromMenuPosition(box) {
        var x = box.x, y = box.y;
        switch (box.corner) {
            case "TR":
                x += box.w;
                break;
            case "BL":
                y += box.h;
                break;
            case "BR":
                x += box.w;
                y += box.h;
                break;
        }

        var screenPoint = new Point(x - map.position.x, y - map.position.y);
        return map.toMap(screenPoint);
    }



    ////////////////////Print data//////////////////////////////
    // get print templates from the export web map task

    createPrintDijit("Test ok");

    function createPrintDijit(printTitle) {
        var layoutTemplate, templateNames, mapOnlyIndex, templates;

        // create an array of objects that will be used to create print templates
        var layouts = [{
            name: "Letter ANSI A Landscape",
            label: "Định dạng PDF",
            format: "pdf",
            options: {
                legendLayers: [], // empty array means no legend
                scalebarUnit: "Kilometers",
                titleText: "Bản đồ thông tin quy hoạch"
            }
        }, {
            name: "Letter ANSI A Portrait",
            label: "Định dạng ảnh",
            format: "jpg",
            options: {
                legendLayers: [],
                scalebarUnit: "Kilometers",
                titleText: "Bản đồ thông tin quy hoạch"
            }
        }];

        // create the print templates
        var templates = array.map(layouts, function (lo) {
            var t = new PrintTemplate();
            t.layout = lo.name;
            t.label = lo.label;
            t.format = lo.format;
            t.layoutOptions = lo.options;
            return t;
        });

        printer = new Print({
            map: map,
            templates: templates,
            url: printUrl
        }, dom.byId("print_button"));
        printer.startup();
        $("#printDiv_panel").slideUp();
    }


    map.on("layers-add-result", initEditor);
    function initEditor(evt) {

        var map = this;
        var layers = array.map(evt.layers, function (result) {
            return result.layer;
        });

        //var layerInfo = array.map(evt.layers, function (layer, index) {
        //    return { layer: layer.layer, title: layer.layer.name };
        //});
        //if (layerInfo.length > 0) {
        //    var legendDijit = new Legend({
        //        map: map,
        //        layerInfos: layerInfo
        //    }, "legendDiv");
        //    legendDijit.startup();
        //}

        //$("#legendDiv_panel").slideUp();

        //display read-only info window when user clicks on feature 
        var query = new esri.tasks.Query();

        dojo.forEach(layers, function (layer) {
            dojo.connect(layer, "onClick", function (evt) {
                if (map.infoWindow.isShowing) {
                    map.infoWindow.hide();
                }

                var layerInfos = [{
                    'featureLayer': layer,
                    'isEditable': false,
                    'showDeleteButton': false
                }];

                var attInspector = new esri.dijit.AttributeInspector({
                    layerInfos: layerInfos
                }, dojo.create("div"));

                if (evt.graphic) {
                    query.objectIds = [evt.graphic.attributes["OBJECTID"]];
                }
                else {
                    return;
                }

                //alert(layer.name);

                layer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
                    if (features.length > 0) {

                        var inforContent = "";
                        featUpdate = features[0];
                        if (layer.name == ThongTinDoAnQuangNamQHC.name || layer.name == ThongTinDoAnQuangNamQHCT.name
                            || layer.name == ThongTinDoAnQuangNamQHNT.name || layer.name == ThongTinDoAnQuangNamQHPK.name
                            || layer.name == ThongTinDoAnQuangNamQHV.name) {

                            var TrangThaiDoAn = featUpdate.attributes["TrangThaiDoAn"];
                            //if (TrangThaiDoAn == "ThucTe") {

                            inforContent += "<div class='contentPopup' >";

                            inforContent += "<div><span class='lableColName'>Kí hiệu khu vực :</span><span class='lableColValue'> " + featUpdate.attributes["KiHieuKhuVuc"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Mã đồ án :</span><span class='lableColValue'> " + featUpdate.attributes["MaDoAn"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Tên đồ án :</span><span class='lableColValue'> " + featUpdate.attributes["TenDoAn"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Địa điểm : </span><span class='lableColValue'>" + featUpdate.attributes["DiaDiem"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Diện tích :</span><span class='lableColValue'> " + featUpdate.attributes["DienTich"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Chủ đầu tư :</span><span class='lableColValue'> " + featUpdate.attributes["ChuDauTu"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Số quyết định phê duyệt :</span><span class='lableColValue'> " + featUpdate.attributes["SoQuyetDinhPheDuyet"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Ngày phê duyệt :</span><span class='lableColValue'> " + getDateStringFormat(getDateStringData(featUpdate, "NgayPheDuyet")) + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Cơ quan phê duyệt :</span><span class='lableColValue'> " + featUpdate.attributes["CoQuanPheDuyet"] + "</span></div>";
                            inforContent += "<div><span class='lableColName'>Ghi chú :</span> <span class='lableColValue'>" + featUpdate.attributes["GhiChu"] + "</span></div>";

                            inforContent += "</div>";
                            map.infoWindow.setTitle("Kết quả tra cứu");

                            //}
                            //if (TrangThaiDoAn == "LayYKien" || TrangThaiDoAn == "CongBo") {
                            //    inforContent += "<div id=''><h4 id='messageBoxContent' class='messageBoxInforh4'>Bản đồ đang trong thời gian cập nhật</h4> </div>";

                            //    map.infoWindow.setTitle("<h3 class='panel-title messageBoxInforh3'>Bản đồ GIS</h3>");
                            //}


                        }
                        else {
                            inforContent = getInforPopup(layer, featUpdate);
                            map.infoWindow.setTitle("Kết quả tra cứu");
                        }

                        ///

                        inforContent = inforContent.replace(/null/g, " Chưa có thông tin ");

                        map.infoWindow.setContent(inforContent);
                        map.infoWindow.resize(310, 300);
                        map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
                        ////
                    }
                    else {
                        map.infoWindow.hide();
                    }
                });

            });
        });

        map.on("click", function (evt) {
            map.graphics.clear();
        });


        map.on("mouse-move", function (evt) {
        });

        map.infoWindow.on("hide", function (evt) {

            SDD_QuangNamQHCSDD.clearSelection();
            SDD_QuangNamQHCT.clearSelection();
            SDD_QuangNamQHNT.clearSelection();
            SDD_QuangNamQHPK.clearSelection();
            SDD_QuangNamQHV.clearSelection();

            ThongTinDoAnQuangNamQHV.clearSelection();
            ThongTinDoAnQuangNamQHC.clearSelection();
            ThongTinDoAnQuangNamQHNT.clearSelection();
            ThongTinDoAnQuangNamQHPK.clearSelection();
            ThongTinDoAnQuangNamQHCT.clearSelection();
        });
    }


    function getNumberString(feature, field) {
        if (feature.attributes[field] !== null) {
            return new Number(feature.attributes[field]);
        }
    };

    function getDateStringFormat(dateObj) {
        if (dateObj) {
            return [
              dateObj.getUTCDate().toString(),
              (dateObj.getUTCMonth() + 1).toString(),
              dateObj.getUTCFullYear().toString()
            ].join("/");
        }
        else {
            return "";
        }
    }

    function getDateStringData(feature, field) {
        if (feature.attributes[field] !== null) {
            return new Date(feature.attributes[field]);
        }
    };

    $(".closePanelmessageBox").on("click", function () {
        $("#messageBox").css("display", "none");
    });


    $("#LuaChonDiaDiemDauTu_quanhuyen").change(function () {
        var dID = $(this).val();
        getHanhChinhXa(dID, "LuaChonDiaDiemDauTu_phuongxa");
    });


    $("#TraCuuHoTroCapPhep_quanhuyen").change(function () {
        var dID = $(this).val();
        getHanhChinhXa(dID, "TraCuuHoTroCapPhep_phuongxa");
    });


    $("#TraCuuDoAnQuyHoach_quanhuyen").change(function () {
        var dID = $(this).val();
        getHanhChinhXa(dID, "TraCuuDoAnQuyHoach_phuongxa");
    });

    $("#TraCuuHoTroCapPhep_quanhuyen").change(function () {
        var dID = $(this).val();
        getHanhChinhXa(dID, "TraCuuHoTroCapPhep_phuongxa");
    });

    $("#LuaChonDiaDiemDauTu_quanhuyen").change(function () {
        var dID = $(this).val();
        getHanhChinhXa(dID, "LuaChonDiaDiemDauTu_phuongxa");
    });



    $("#TraCuuDoAnQuyHoach_tim").click(function () {
        $("#loadingpageDiv").css("display", "inline-block");
        var url = "/Home/getThongTinDoAn";
        var html = "";

        var maQuanHuyen, maPhuongXa, LoaiQuyHoach, tendoan;

        maQuanHuyen = $("#TraCuuDoAnQuyHoach_quanhuyen").val();
        maPhuongXa = $("#TraCuuDoAnQuyHoach_phuongxa").val();
        LoaiQuyHoach = $("#TraCuuDoAnQuyHoach_loaiquyhoach").val();
        tendoan = $("#TraCuuDoAnQuyHoach_tendoan").val();

        var check = maQuanHuyen.trim() + maPhuongXa.trim() + LoaiQuyHoach.trim() + tendoan.trim();

        if (check.trim().length == 0) {
            alert("Vui lòng chọn điều kiện tìm kiếm");
            $("#loadingpageDiv").css("display", "none");
            return;
        }
        $("#ResultDataSearchContent").html("");
        $("#ResultDataSearchContentType").val("ThongTinDoAn");
        $("#titleTimKiem").html("Đồ án quy hoạch");

        $.ajax({
            type: "POST",
            url: url,
            data: { maQuanHuyen: maQuanHuyen, maPhuongXa: maPhuongXa, LoaiQuyHoach: LoaiQuyHoach, tendoan: tendoan },
            cache: false,
            success: function (results) {
                $("#ResultDataSearchContent").html(results);
                $(".panel_control").slideUp();
                $("#ResultDataSearch").toggle("slide");
                $("#loadingpageDiv").css("display", "none");
            },
            error: function (reponse) {
                alert("error : " + reponse.responseText);
                $("#loadingpageDiv").css("display", "none");
            }
        });
    });

    $("#TraCuuHoTroCapPhep_tim").click(function () {
        $("#loadingpageDiv").css("display", "inline-block");
        var url = "/Home/getThongTinQHCT";
        var html = "";

        var maQuanHuyen, maPhuongXa, LoaiDat, KiHieuKhuDat, KiHieuLoDat, tendoan;

        maQuanHuyen = $("#TraCuuHoTroCapPhep_quanhuyen").val();
        maPhuongXa = $("#TraCuuHoTroCapPhep_phuongxa").val();
        tendoan = $("#TraCuuHoTroCapPhep_tendoan").val();
        LoaiDat = $("#TraCuuHoTroCapPhep_LoaiDat").val();
        KiHieuKhuDat = $("#TraCuuHoTroCapPhep_kyhieukhudat").val();
        KiHieuLoDat = $("#TraCuuHoTroCapPhep_kyhieulodat").val();

        var check = maQuanHuyen.trim() + maPhuongXa.trim() + LoaiDat.trim() + KiHieuKhuDat.trim() + KiHieuLoDat.trim() + tendoan.trim();

        if (check.trim().length == 0) {
            alert("Vui lòng chọn điều kiện tìm kiếm");
            $("#loadingpageDiv").css("display", "none");
            return;
        }

        $("#ResultDataSearchContent").html("");
        $("#ResultDataSearchContentType").val("QHCT");
        $("#titleTimKiem").html("Hỗ trợ xin/cấp phép xây dựng");
        $.ajax({
            type: "POST",
            url: url,
            data: { maQuanHuyen: maQuanHuyen, maPhuongXa: maPhuongXa, LoaiDat: LoaiDat, KiHieuKhuDat: KiHieuKhuDat, KiHieuLoDat: KiHieuLoDat, tendoan: tendoan },
            cache: false,
            success: function (results) {
                $("#ResultDataSearchContent").html(results);
                $(".panel_control").slideUp();
                $("#ResultDataSearch").toggle("slide");
                $("#loadingpageDiv").css("display", "none");
            },
            error: function (reponse) {
                alert("error : " + reponse.responseText);
                $("#loadingpageDiv").css("display", "none");
            }
        });
    });

    $("#LuaChonDiaDiemDauTu_tim").click(function () {
        $("#loadingpageDiv").css("display", "inline-block");
        var url = "/Home/getThongTinQHPK";
        var html = "";

        var maQuanHuyen = "", maPhuongXa = "", LoaiDat = "", KiHieuLoDat = "", dientichtu = -1,
             dientichden = -1, kcTu = -1, kcDen = -1, sovoi = "";

        maQuanHuyen = $("#LuaChonDiaDiemDauTu_quanhuyen").val();
        maPhuongXa = $("#LuaChonDiaDiemDauTu_phuongxa").val();
        LoaiDat = $("#LuaChonDiaDiemDauTu_loaidat").val();
        KiHieuLoDat = $("#LuaChonDiaDiemDauTu_kyhieulodat").val();
        dientichtu = $("#LuaChonDiaDiemDauTu_dientichtu").val();
        dientichden = $("#LuaChonDiaDiemDauTu_dientichden").val();
        kcTu = $("#LuaChonDiaDiemDauTu_khoangcachtu").val();
        kcDen = $("#LuaChonDiaDiemDauTu_khoangcachden").val();
        sovoi = $("#LuaChonDiaDiemDauTu_sovoi").val();

        var check = maQuanHuyen.trim() + maPhuongXa.trim() + LoaiDat.trim() + KiHieuLoDat.trim() + dientichtu.trim() + dientichden.trim() + kcTu.trim() + kcDen.trim() + sovoi.trim();

        if (check.trim().length == 0) {
            alert("Vui lòng chọn điều kiện tìm kiếm");
            $("#loadingpageDiv").css("display", "none");
            return;
        }

        $("#ResultDataSearchContent").html("");
        $("#ResultDataSearchContentType").val("QHPK");
        $("#titleTimKiem").html("Lựa chọn địa điểm đầu tư");
        $.ajax({
            type: "POST",
            url: url,
            data: {
                maQuanHuyen: maQuanHuyen, maPhuongXa: maPhuongXa, LoaiDat: LoaiDat,
                KiHieuLoDat: KiHieuLoDat, dientichtu: dientichtu, dientichden: dientichden,
                kcTu: kcTu, kcDen: kcDen, sovoi: sovoi
            },
            cache: false,
            success: function (results) {
                $("#ResultDataSearchContent").html(results);
                $(".panel_control").slideUp();
                $("#ResultDataSearch").toggle("slide");
                $("#loadingpageDiv").css("display", "none");
            },
            error: function (reponse) {
                alert("error : " + reponse.responseText);
                $("#loadingpageDiv").css("display", "none");
            }
        });
    });


    $("#ResultDataSearchContent").on("click", "span.itemSearch", function () {
        var objectID = $(this).attr('alt');
        var type = $("#ResultDataSearchContentType").val();
        // alert(objectID);
        if (type == "ThongTinDoAn") {
            zoomThongTinDoAn(objectID);
        }
        if (type == "QHPK") {
            zoomQHPK(objectID);
        }
        if (type == "QHCT") {
            zoomQHCT(objectID);
        }
    });




    /////////////////////////////////////////////////////////////////////////////////////////


    function getInforPopup(featureLayer, feature) {
        var html = "<div class='contentPopup' >";
        var fields = featureLayer.fields
        var col;

        if (featureLayer.name == SDD_QuangNamQHPK.name || featureLayer.name == SDD_QuangNamQHCSDD.name ||
            featureLayer.name == SDD_QuangNamQHCT.name || featureLayer.name == SDD_QuangNamQHNT.name ||
            featureLayer.name == SDD_QuangNamQHV.name) {
            col = ["KiHieuKhuDat","KiHieuLoDat", "LoaiDat", "DienTichKhuDat", "GiaiDoanQuyHoach", "TangCao", "MatDoXayDung", "KhoangLuiChinh",
                    "KhoangLuiBien", "HeSoSuDungDat"];
        }

        if (featureLayer.name == ThongTinDoAnQuangNamQHV.name || featureLayer.name == ThongTinDoAnQuangNamQHC.name ||
            featureLayer.name == ThongTinDoAnQuangNamQHNT.name ||
           featureLayer.name == ThongTinDoAnQuangNamQHPK.name || featureLayer.name == ThongTinDoAnQuangNamQHCT.name) {
            col = ["MaDoAn", "TenDoAn", "TrangThaiDoAn", "ChuDauTu", "CoQuanPheDuyet", "NgayPheDuyet", "SoQuyetDinhPheDuyet",
                    "DiaDiem", "DienTich", "DonViCapNhat", "DonViQuanLy", "KiHieuKhuVuc", "LoaiQuyHoach", "MaPhuongXa", "MaQuanHuyen",
                    "NgayCapNhat", "NguoiCapNhat", "GhiChu"];
        }


        if (col) {
            for (var yi = 0 ; yi < col.length ; yi++) {

                var nameCol = col[yi];

                for (var i = 0 ; i < fields.length ; i++) {
                    var field = fields[i];
                    var name = field.name;
                    if (name.startsWith(nameCol) == true) {

                        if (field.domain != null) {
                            var domain = field.domain;
                            var domainData = domain.toJson();
                            var codedValues = domainData.codedValues;
                            var strVal = "";
                            var id = feature.attributes[field.name];
                            for (var x = 0; x < codedValues.length; x++) {
                                var code = codedValues[x].code;
                                if (code == id) {
                                    strVal = codedValues[x].name;
                                    break;
                                }
                            }
                            ////alert(strVal);
                            html += "<div> <span class='lableColName'> " + field.alias +
                            " : </span><span class='lableColValue' > " + strVal + "</span></div>";
                        }
                        else {

                            html += "<div> <span class='lableColName'> " + field.alias +
                                " : </span><span class='lableColValue' > " + feature.attributes[field.name] + "</span></div>";
                        }
                    }
                }
            }
        }
        else {
            for (var i = 0 ; i < fields.length ; i++) {
                var field = fields[i];
                var name = field.name;
                if (name.startsWith("SHAPE") == false) {
                    if (name.startsWith("OBJECTID") == false) {

                        if (field.domain != null) {
                            var domain = field.domain;
                            var domainData = domain.toJson();
                            var codedValues = domainData.codedValues;
                            var strVal = "";
                            var id = feature.attributes[field.name];
                            for (var x = 0; x < codedValues.length; x++) {
                                var code = codedValues[x].code;
                                if (code == id) {
                                    strVal = codedValues[x].name;
                                    break;
                                }
                            }
                            ////alert(strVal);
                            html += "<div> <span class='lableColName'> " + field.alias +
                            " : </span><span class='lableColValue' > " + strVal + "</span></div>";
                        }
                        else {
                            html += "<div> <span class='lableColName'> " + field.alias +
                                " : </span><span class='lableColValue' > " + feature.attributes[field.name] + "</span></div>";
                        }
                    }
                }
            }
        }

        html += "</div>";

        html = html.replace(/null/g, " Chưa có thông tin");

        return html;


    }

    function zoomThongTinDoAn(maDoAn) {

        var mada = maDoAn.split('#')[0];

        var loaimada = maDoAn.split('#')[1];

        var query = new Query();
        query.where = " MaDoAn = '" + mada + "'";

        map.graphics.clear();

        if (map.infoWindow.isShowing) {
            map.infoWindow.hide();
        }

        if (loaimada === "QHCT") {
            ThongTinDoAnQuangNamQHCT.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
                if (results.length > 0) {

                    var statesLayer = results[0].geometry;
                    zoomData(statesLayer);
                }
                else {
                    $("#messageBox").css("display", "inline-block");
                }
            });
        }

        if (loaimada === "QHPK") {

            ThongTinDoAnQuangNamQHPK.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
                if (results.length > 0) {

                    var statesLayer = results[0].geometry;
                    zoomData(statesLayer);
                }
                else {
                    $("#messageBox").css("display", "inline-block");
                }
            });
        }

        if (loaimada === "QHC") {

            ThongTinDoAnQuangNamQHC.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {

                if (results.length > 0) {

                    var statesLayer = results[0].geometry;
                    zoomData(statesLayer);
                }
                else {
                    $("#messageBox").css("display", "inline-block");
                }
            });
        }

        if (loaimada === "QHNT") {

            ThongTinDoAnQuangNamQHNT.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
                if (results.length > 0) {

                    var statesLayer = results[0].geometry;
                    zoomData(statesLayer);
                }
                else {
                    $("#messageBox").css("display", "inline-block");
                }
            });
        }

        if (loaimada === "QHV") {

            ThongTinDoAnQuangNamQHV.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
                if (results.length > 0) {

                    var statesLayer = results[0].geometry;
                    zoomData(statesLayer);
                }
                else {
                    $("#messageBox").css("display", "inline-block");
                }
            });
        }
    }

    function zoomData(geometryData) {
        var graPhicData = new Graphic(geometryData, polySymbolRed);

        //countyLayer.clear();
        //countyLayer.add(graPhicData);

        //ThongTinDoAnQuangNamQHV.clearSelection();
        //ThongTinDoAnQuangNamQHPK.clearSelection();
        //ThongTinDoAnQuangNamQHC.clearSelection();
        //ThongTinDoAnQuangNamQHCT.clearSelection();
        //ThongTinDoAnQuangNamQHNT.clearSelection();

        var stateExtent = geometryData.getExtent().expand(1.0);
        map.setExtent(stateExtent);
    }


    function zoomQHCT(objectid) {

        var query = new Query();
        query.where = " objectid = '" + objectid + "'";

        map.graphics.clear();

        if (map.infoWindow.isShowing) {
            map.infoWindow.hide();
        }
        SDD_QuangNamQHCT.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
            if (results.length > 0) {
                var statesLayer = results[0].geometry;
                var stateExtent = results[0].geometry.getExtent().expand(2.0);
                map.setExtent(stateExtent);

                //var myPolygonCenterLatLon = results[0].geometry.getExtent().getCenter();
                //map.centerAt(myPolygonCenterLatLon);
                // map.setExtent(esri.geometry.getExtentForScale(map, 2500));
            }
            else {
                $("#messageBox").css("display", "inline-block");
            }
        });

    }
    function zoomQHPK(objectid) {

        var query = new Query();
        query.where = " objectid = '" + objectid + "'";

        map.graphics.clear();

        if (map.infoWindow.isShowing) {
            map.infoWindow.hide();
        }
        SDD_QuangNamQHPK.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
            if (results.length > 0) {
                var statesLayer = results[0].geometry;
                var stateExtent = results[0].geometry.getExtent().expand(5.0);
                map.setExtent(stateExtent);
                //var myPolygonCenterLatLon = results[0].geometry.getExtent().getCenter();
                //map.centerAt(myPolygonCenterLatLon);
                // map.setExtent(esri.geometry.getExtentForScale(map, 5000));

            }
            else {
                $("#messageBox").css("display", "inline-block");
            }
        });

    }



    function getHanhChinhXa(maQuanHuyen, cbb) {

        $("#loadingpageDiv").css("display", "inline-block");
        var url = "/Home/getXaByQuanHuyen";
        var html = "<option value=''>Phường / Xã / Thị trấn</option>";
        $.ajax({
            type: "POST",
            url: url,
            data: { maQuanHuyen: maQuanHuyen },
            cache: false,
            success: function (results) {

                //alert(results);

                if (results) {
                    for (var i = 0 ; i < results.length; i++) {
                        html += "<option value='" + results[i].IDHanhChinh + "'>" + results[i].TenHanhChinh + "</option>";
                    }
                    $("#" + cbb + "").html(html);
                }
                else {
                    html = "<option value=''>Phường / Xã / Thị trấn</option>";
                    $("#" + cbb + "").html(html);
                }
                $("#loadingpageDiv").css("display", "none");
            },
            error: function (reponse) {
                alert("error : " + reponse.responseText);
                $("#loadingpageDiv").css("display", "none");
            }
        });
    }

    ///////////////////////////////// End script ///////////////////////////////////////////
});