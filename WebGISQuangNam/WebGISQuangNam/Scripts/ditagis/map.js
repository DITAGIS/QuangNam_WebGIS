﻿require([
    // ditagis require
    "ditagis/widgets/Report",
    "ditagis/configs",

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
    "esri/dijit/Search", "esri/SnappingManager", "esri/dijit/Measurement", "dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator",

    "esri/toolbars/draw", "dijit/Toolbar", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",


    "dojo/domReady!" // 12


], function (
    // ditagis function
    Report, configs,

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
    BufferParameters, lang, LocateButton, BasemapGallery, Domain, Search, SnappingManager, Measurement, Menu, MenuItem, MenuSeparator,



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
            if(layercf.displayFields){
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
            $("#ykiendoan_QHC").slideDown();
            var maCode = $(this).attr('maCode');
            var mdoan = $(this).attr('mdoan');
            getThongTinDoAn(mdoan, maCode);
            var alt = $(this).attr('title');
            if (alt) {
                zoomThongTinDoAn(alt);
            }

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
                            if (layer.typeSelectFeature == "ThongTin") {
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

            map.infoWindow.on("hide", (evt) => {
                for (const featureLayer of featureLayers) {
                    featureLayer.clearSelection();
                }
               
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
        var report = new Report(map);
        $("#LuaChonDiaDiemDauTu_tim").click(() => {
            $("#loadingpageDiv").css("display", "inline-block");
            var url = "/Home/getThongTinQHPK";
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QuangNamQHPK"
            });
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
                success: (results) => {
                    report.showTable(featureLayer, results);
                    // $("#ResultDataSearchContent").html(results);
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

            if (layer.typeSelectFeature == "SDD") {
                col = ["KiHieuKhuDat", "KiHieuLoDat", "LoaiDat", "DienTichKhuDat", "GiaiDoanQuyHoach", "TangCao", "MatDoXayDung", "KhoangLuiChinh",
                    "KhoangLuiBien", "HeSoSuDungDat"];
            }

            if (layer.typeSelectFeature == "ThongTin") {
                col = ["MaDoAn", "TenDoAn", "TrangThaiDoAn", "ChuDauTu", "CoQuanPheDuyet", "NgayPheDuyet", "SoQuyetDinhPheDuyet",
                    "DiaDiem", "DienTich", "DonViCapNhat", "DonViQuanLy", "KiHieuKhuVuc", "LoaiQuyHoach", "MaPhuongXa", "MaQuanHuyen",
                    "NgayCapNhat", "NguoiCapNhat", "GhiChu"];
            }


            if (col) {
                for (var yi = 0; yi < col.length; yi++) {

                    var nameCol = col[yi];

                    for (var i = 0; i < fields.length; i++) {
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
                for (var i = 0; i < fields.length; i++) {
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
        function getThongTinDoAn(maDoAn, maCode) {
            var url = "/Home/GetDanhMucHoSo";
            var domain = $(this)[0].origin;
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
                }]
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    maDoAn: maDoAn
                },
                cache: false,
                success: (results) => {
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
                        var link = "https://docs.google.com/gview?url=" + domain + "/FileManagers/" + item.MaDoAn + "/" + item.DuongDan + "&embedded=true";
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
                            $("#loadIdealForm").css("display", "block");
                        });

                    }
                    var panel_group = qhc.find("#ThuyetMinh");
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
                        $("#loadIdealReviewForm").css("display", "block");
                    });

                },
                error: function (reponse) {
                }
            });
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
                var featureLayer = featureLayers.find(function (element) {
                    return element.id == "ThongTinDoAnQuangNamQHCT"
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
                    return element.id == "ThongTinDoAnQuangNamQHPK"
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
                    return element.id == "ThongTinDoAnQuangNamQHC"
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
                    return element.id == "ThongTinDoAnQuangNamQHNT"
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
                    return element.id == "ThongTinDoAnQuangNamQHV"
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
                return element.id == "SDD_QuangNamQHCT"
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
                return element.id == "SDD_QuangNamQHPK"
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
            var html = "<option value=''>Phường / Xã / Thị trấn</option>";
            $.ajax({
                type: "POST",
                url: url,
                data: { maQuanHuyen: maQuanHuyen },
                cache: false,
                success: function (results) {

                    //alert(results);

                    if (results) {
                        for (var i = 0; i < results.length; i++) {
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