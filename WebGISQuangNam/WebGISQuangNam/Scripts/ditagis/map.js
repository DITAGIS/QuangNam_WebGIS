require([
    // ditagis require
    "ditagis/widgets/Report",
    "ditagis/configs",
    "ditagis/api/TimKiemThongTin",

    "esri/toolbars/navigation", // 1
    "dijit/registry", "dojo/on", "esri/map", "esri/layers/FeatureLayer",// 2
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
    "esri/dijit/Search", "esri/SnappingManager", "esri/dijit/Measurement", "esri/units",
    "dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",

    "esri/toolbars/draw", "dijit/Toolbar", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",


    "dojo/domReady!" // 12


], function (
    // ditagis function
    Report, configs, TimKiemThongTin,

    Navigation,
    registry, on, Map, FeatureLayer,
    AttributeInspector, SimpleLineSymbol, SimpleFillSymbol, Color, ArcGISDynamicMapServiceLayer,
    ImageParameters, ArcGISTiledMapServiceLayer, Query, dojoQuery, parser,
    domConstruct, Button, GeometryService, Point, ProjectParameters,
    SpatialReference, QueryTask, GraphicsLayer, Extent, Polygon,
    HomeButton, SimpleMarkerSymbol, Graphic, Scalebar, arcgisUtils,
    LayerList, TemplatePicker, Legend, Editor, jsapiBundle,
    keys, array, dom, Grid, Selection,
    Memory, declare, Print, PrintTemplate, esriRequest,
    esriConfig, geometryEngine, InfoTemplate, normalizeUtils,
    BufferParameters, lang, LocateButton, BasemapGallery, Domain, Search, SnappingManager, Measurement, Units, Menu, MenuItem, MenuSeparator,



    ) {


        parser.parse();
        // refer to "Using the Proxy Page" for more information:  https://developers.arcgis.com/javascript/jshelp/ags_proxy.html
        esriConfig.defaults.io.proxyUrl = "~/DotNet/proxy.ashx";
        esriConfig.defaults.io.alwaysUseProxy = false;
        //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
        esriConfig.defaults.geometryService = new GeometryService("http://112.78.4.175:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");


        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.
        var printUrl = "https://sawagis.vn/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

        var sr = new SpatialReference({
            "wkt": 'PROJCS["QUANG NAM_VN2000",GEOGCS["GCS_VN_2000",DATUM["D_Vietnam_2000",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",107.75],PARAMETER["Scale_Factor",0.9999],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
        });

        var loaiHoSo = [
            {
                Name: "I. Hồ sơ pháp lý",
                ID: "PhapLy"
            },
            {
                Name: "II. Bản vẽ",
                ID: "BanVe"
            },
            {
                Name: "III. Thuyết minh",
                ID: "ThuyetMinh"
            }];

        var map = new Map("mapDiv", {
            spatialReference: sr,
            center: [108.0599533, 15.6474107],
            zoom: 9,
            logo: false,
            basemap: "osm",
            slider: true,
            sliderPosition: "bottom-right",
            sliderStyle: "small",
            autoResize: true,
            showLabels: true
        });


        var layers = [];

        for (const key in configs.gisMapServerLayers) {
            let layercf = configs.gisMapServerLayers[key];
            var arcGISDynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(layercf.url, {
                "imageParameters": imageParameters,
                "id": layercf.id
            });
            var layer = {
                layer: arcGISDynamicMapServiceLayer, // required unless featureCollection.
                subLayers: true, // optional
                visibility: true, // optional
                title: layercf.title
            };
            layers.push(layer);
            map.addLayer(arcGISDynamicMapServiceLayer);

        }
        var featureLayers = [];
        var polySymbolRed = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([127, 255, 255, 255]), 3
            ),
            new Color([255, 0, 0, 0.25])
        );
        for (const key in configs.layers) {
            let layercf = configs.layers[key];
            let featureLayer = new esri.layers.FeatureLayer(layercf.url, {
                mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"],
                "opacity": 0.9,
                id: layercf.id
            });
            if (layercf.displayFields) {
                featureLayer.displayFields = layercf.displayFields;
            }
            featureLayer.typeSelectFeature = layercf.typeSelectFeature;
            featureLayer.setSelectionSymbol(polySymbolRed);
            featureLayers.push(featureLayer);
            var layer = {
                layer: featureLayer, // required unless featureCollection.
                subLayers: true, // optional
                visibility: true, // optional
                title: layercf.title
            };
            layers.push(layer);


        }
        map.addLayers(featureLayers);
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
            $(".left-panel").slideUp();
        });
        $("#close-measure").on("click", function () {
            measurement.clearResult();
            measurement.setTool("distance", false);
        });

        /// thông tin quy hoạch ////
        $(".call_bandoquyhoach_congbo").on("click", function () {
            $("#panel_QHC").slideDown();
            var mdoan = $(this).attr('mdoan');
            var maCode = $(this).attr('maCode');
            if (maCode) {
                zoomThongTinDoAn(maCode);
            }
            getHoSoDoAn(mdoan);
        });
        $(".call_bandoquyhoach").on("click", function () {
            $("#panel_QHC").slideDown();
            var mdoan = $(this).attr('mdoan');
            var maCode = $(this).attr('maCode');
            getHoSoDoAn(mdoan, maCode);
        });

        /// end thông tin quy hoạch ///

        /// công bố lấy ý kiến

        $(".call_bandoquyhoach_layykien").on("click", function () {
            $("#panel_QHC").slideDown();
            var maCode = $(this).attr('maCode');
            var mdoan = $(this).attr('mdoan');
            getHoSoDoAn(mdoan, maCode);
        });


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
            map: map,
            defaultLengthUnit: Units.METERS,
            defaultAreaUnit: Units.SQUARE_METERS,
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


            //display read-only info window when user clicks on feature 
            var query = new esri.tasks.Query();

            dojo.forEach(layers, (layer) => {
                dojo.connect(layer, "onClick", (feature) => {
                    if (measurement.getTool()) return;
                    if (map.infoWindow.isShowing) {
                        map.infoWindow.hide();
                    }
                    if (feature.graphic) {
                        query.objectIds = [feature.graphic.attributes["OBJECTID"]];
                    }
                    else {
                        return;
                    }

                    layer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
                        if (features.length > 0) {
                            featUpdate = features[0];
                            var inforContent = getInforPopup(layer, featUpdate);
                            map.infoWindow.setTitle("Kết quả tra cứu");
                            map.infoWindow.setContent(inforContent);
                            map.infoWindow.resize(310, 300);
                            map.infoWindow.show(feature.screenPoint, map.getInfoWindowAnchor(feature.screenPoint));
                        }
                        else {
                            map.infoWindow.hide();
                        }
                    });

                });
            });
            map.infoWindow.on("hide", (evt) => {
                for (const featureLayer of featureLayers) {
                    featureLayer.clearSelection();
                }

            });
        }



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



            var maQuanHuyen, maPhuongXa, loaiQuyHoach, tenDoAn;

            maQuanHuyen = $("#TraCuuDoAnQuyHoach_quanhuyen").val();
            maPhuongXa = $("#TraCuuDoAnQuyHoach_phuongxa").val();
            loaiQuyHoach = $("#TraCuuDoAnQuyHoach_loaiquyhoach").val();
            tenDoAn = $("#TraCuuDoAnQuyHoach_tendoan").val();

            var check = maQuanHuyen.trim() + loaiQuyHoach.trim() + tenDoAn.trim();

            if (check.trim().length == 0) {
                alert("Vui lòng chọn điều kiện tìm kiếm");
                $("#loadingpageDiv").css("display", "none");
                return;
            }
            $("#ResultDataSearchContentType").val("ThongTinDoAn");
            $("#titleTimKiem").html("Đồ án quy hoạch");
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "ThongTinDoAn"
            });
            TimKiemThongTin.ThongTinDoAn(maQuanHuyen, maPhuongXa, loaiQuyHoach, tenDoAn)
                .then((results) => {
                    report.showTable(featureLayer, results);
                    $(".panel_control").slideUp();
                    $("#ResultDataSearch").toggle("slide");
                    $("#loadingpageDiv").css("display", "none");
                })
                .catch(function (reponse) {
                    alert("error : " + reponse);
                    $("#loadingpageDiv").css("display", "none");
                });
        });

        $("#TraCuuHoTroCapPhep_tim").click(function () {
            $("#loadingpageDiv").css("display", "inline-block");
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QHCT"
            });
            var maQuanHuyen, maPhuongXa, loaiDat, kiHieuKhuDat, kiHieuLoDat, tenDoAn;

            maQuanHuyen = $("#TraCuuHoTroCapPhep_quanhuyen").val();
            maPhuongXa = $("#TraCuuHoTroCapPhep_phuongxa").val();
            tenDoAn = $("#TraCuuHoTroCapPhep_tendoan").val();
            loaiDat = $("#TraCuuHoTroCapPhep_LoaiDat").val();
            kiHieuKhuDat = $("#TraCuuHoTroCapPhep_kyhieukhudat").val();
            kiHieuLoDat = $("#TraCuuHoTroCapPhep_kyhieulodat").val();

            var check = maQuanHuyen.trim() + loaiDat.trim() + kiHieuKhuDat.trim() + kiHieuLoDat.trim() + tenDoAn.trim();

            if (check.trim().length == 0) {
                alert("Vui lòng chọn điều kiện tìm kiếm");
                $("#loadingpageDiv").css("display", "none");
                return;
            }

            $("#ResultDataSearchContentType").val("QHCT");
            $("#titleTimKiem").html("Hỗ trợ xin/cấp phép xây dựng");
            TimKiemThongTin.ThongTinQHCT(maQuanHuyen, maPhuongXa, loaiDat, kiHieuKhuDat, kiHieuLoDat, tenDoAn)
                .then((results) => {
                    report.showTable(featureLayer, results);
                    $(".panel_control").slideUp();
                    $("#ResultDataSearch").toggle("slide");
                    $("#loadingpageDiv").css("display", "none");
                })
                .catch(function (reponse) {
                    alert("error : " + reponse);
                    $("#loadingpageDiv").css("display", "none");
                });
        });
        var report = new Report(map);
        $("#LuaChonDiaDiemDauTu_tim").click(() => {
            $("#loadingpageDiv").css("display", "inline-block");
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QHPK"
            });
            var maQuanHuyen = "", maPhuongXa = "", loaiDat = "", kiHieuLoDat = "", dienTichTu = -1,
                dienTichDen = -1, kcTu = -1, kcDen = -1, soVoi = "";

            maQuanHuyen = $("#LuaChonDiaDiemDauTu_quanhuyen").val();
            maPhuongXa = $("#LuaChonDiaDiemDauTu_phuongxa").val();
            loaiDat = $("#LuaChonDiaDiemDauTu_loaidat").val();
            kiHieuLoDat = $("#LuaChonDiaDiemDauTu_kyhieulodat").val();
            dienTichTu = $("#LuaChonDiaDiemDauTu_dientichtu").val();
            dienTichDen = $("#LuaChonDiaDiemDauTu_dientichden").val();
            kcTu = $("#LuaChonDiaDiemDauTu_khoangcachtu").val();
            kcDen = $("#LuaChonDiaDiemDauTu_khoangcachden").val();
            soVoi = $("#LuaChonDiaDiemDauTu_sovoi").val();

            var check = maQuanHuyen.trim() + loaiDat.trim() + kiHieuLoDat.trim() + dienTichTu.trim() + dienTichDen.trim() + kcTu.trim() + kcDen.trim() + soVoi.trim();

            if (check.trim().length == 0) {
                alert("Vui lòng chọn điều kiện tìm kiếm");
                $("#loadingpageDiv").css("display", "none");
                return;
            }

            $("#ResultDataSearchContentType").val("QHPK");
            $("#titleTimKiem").html("Lựa chọn địa điểm đầu tư");
            TimKiemThongTin.ThongTinQHPK(maQuanHuyen, maPhuongXa, loaiDat,
                kiHieuLoDat, dienTichTu, dienTichDen,
                kcTu, kcDen, soVoi)
                .then((results) => {
                    report.showTable(featureLayer, results);
                    $(".panel_control").slideUp();
                    $("#ResultDataSearch").toggle("slide");
                    $("#loadingpageDiv").css("display", "none");
                })
                .catch(function (reponse) {
                    alert("error : " + reponse);
                    $("#loadingpageDiv").css("display", "none");
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
            var fields = featureLayer.fields;
            var hiddenFields = configs.fields['hidden'];
            for (const field of fields) {
                var name = field.name;
                var isHiddenField = false;
                for (const hiddenField of hiddenFields) {
                    if (name == hiddenField) {
                        isHiddenField = true;
                        break;
                    }
                }
                if (!isHiddenField) {
                    let value = feature.attributes[name];
                    if (field.domain != null) {
                        var domain = field.domain;
                        value = getValueDomain(domain, value);
                    }
                    if (field.type == "esriFieldTypeDate") {
                        value = getDate(value);
                    }
                    if (value)
                        html += "<div> <span class='lableColName'> " + field.alias +
                            " : </span><span class='lableColValue' > " + value + "</span></div>";
                }
            }
            html += "</div>";
            return html;
        }
        function getDate(value) {
            var date = new Date(value);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;

            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return dd + '/' + mm + '/' + yyyy;
        }
        function getValueDomain(domain, code) {
            var domainData = domain.toJson();
            var codedValues = domainData.codedValues;
            for (var i = 0; i < codedValues.length; i++) {
                if (codedValues[i].code == code) {
                    return codedValues[i].name;
                }
            }
            return null;
        }
        function getHoSoDoAn(maDoAn, maCode) {
            if (maCode) {
                zoomThongTinDoAn(maCode);
            }
            TimKiemThongTin.HoSoDoAn(maDoAn)
                .then((results) => {
                    var qhc = $("#QHC");
                    while (qhc[0].firstChild) {
                        qhc[0].firstChild.remove();
                    }
                    for (const item of loaiHoSo) {
                        var panel_group = $('<div/>', {
                            id: item.ID,
                            class: "panel-group"
                        }).appendTo(qhc);
                        $('<button/>', {
                            text: item.Name,
                            class: "accordion"
                        }).appendTo(panel_group);

                    }

                    for (const item of results) {
                        var link = "https://docs.google.com/gview?url=" + item.DuongDan + "&embedded=true";
                        var panel_group = qhc.find("#" + item.LoaiHoSo);
                        var li = $('<li/>', {
                            class: "list-group-item"
                        }).appendTo(panel_group);
                        $('<span/>', {
                            text: item.TenHoSo,
                            title: item.id,
                            alt: link,
                            class: "viewLayYKien"
                        }).appendTo(li);
                        $(".viewLayYKien").on("click", function () {
                            var link = $(this).attr("alt");
                            idDoc = $(this).attr("title");
                            $("#viewDocFormData").attr("src", link);
                            $("#viewDocFormData").attr("idDoc", idDoc);
                            $("#loadIdealForm").css("display", "block");
                        });

                    }
                    var panel_group = qhc.find("#ThuyetMinh");
                    if (maCode) {
                        var li_phieugopy = $('<li/>', {
                            class: "list-group-item"
                        }).appendTo(panel_group);
                        var btn_openDongGopYKien = $('<button/>', {
                            class: "btn btn-primary openDongGopYKien",
                            text: "Xem phiếu góp ý"
                        }).appendTo(li_phieugopy);
                        btn_openDongGopYKien.click(function () {
                            var maDoAn = maCode.split("#")[0];
                            var loaiDoAn = maCode.split("#")[1];
                            var link = "/Home/reviewYKienNguoiDan?madoan=" + maDoAn + "&loaiDoAn=" + loaiDoAn;
                            $("#loadIdealReviewFormData").attr("src", link);
                            kendo.ui.progress($("#qhc"), true);
                            $('#loadIdealReviewFormData').load(function(){
                                $("#loadIdealReviewForm").css("display", "block");
                                kendo.ui.progress($("#qhc"), false);
                            });
                        });
                    }

                })
                .catch(function (reponse) {
                    alert("error : " + reponse);
                    $("#loadingpageDiv").css("display", "none");
                });

        }


        function zoomThongTinDoAn(maDoAn) {

            var mada = maDoAn.split('#')[0];

            var loaimada = maDoAn.split('#')[1];

            var query = new Query();
            query.where = "MaDoAn = N'" + mada + "'";

            map.graphics.clear();

            if (map.infoWindow.isShowing) {
                map.infoWindow.hide();
            }

            if (loaimada === "QHCT") {
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAn_QHCT"
                });
                featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAn_QHPK"
                });
                featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAn_QHC"
                });
                featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {

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
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAn_QHNT"
                });
                featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAn_QHV"
                });
                featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QHCT"
            });
            featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QHPK"
            });
            featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
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
            $.ajax({
                type: "POST",
                url: url,
                data: { maQuanHuyen: maQuanHuyen },
                cache: false,
                success: function (results) {
                    if (results) {
                        var data = [];
                        for (var i = 0; i < results.length; i++) {
                            var xa = {
                                text: results[i].TenHanhChinh,
                                value: results[i].IDHanhChinh
                            }
                            data.push(xa);
                        }
                        if (data.length > 0) {
                            $(`#${cbb}`).kendoDropDownList({
                                optionLabel: "Xã, phường, thị trấn",
                                dataTextField: "text",
                                dataValueField: "value",
                                dataSource: data,
                            });
                        }
                        else {
                            $(`#${cbb}`).kendoDropDownList({
                                dataSource: data
                            }).data("kendoDropDownList").select(0);
                        }
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