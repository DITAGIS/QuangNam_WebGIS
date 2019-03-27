require([
    // ditagis require
    "ditagis/widgets/Report",
    "ditagis/widgets/Popup",
    "ditagis/widgets/LayerList",
    "ditagis/configs",
    "ditagis/api/TimKiemThongTin",

    "esri/toolbars/navigation", "dijit/registry", "dojo/on",//1
    "esri/map", "esri/layers/FeatureLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ImageParameters",// 2
    "esri/graphic", "esri/geometry/Point",// geometry
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",  // 3
    "esri/tasks/query", "dojo/parser", "esri/tasks/GeometryService", // 4
    "esri/SpatialReference", "esri/dijit/HomeButton",//5
    "dojo/_base/array", "dojo/dom", "esri/dijit/Print", "esri/tasks/PrintTemplate", "esri/config", // 6
    "esri/dijit/LocateButton", "esri/dijit/BasemapGallery",//7
    "esri/dijit/Measurement", "esri/units", "dijit/Menu", "dijit/MenuItem",//8
    "esri/toolbars/draw", "dijit/Toolbar", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",//9
    "dojo/domReady!" // 10


], function (
    // ditagis function
    Report, Popup, LayerList, configs, TimKiemThongTin,

    Navigation, registry, on,//1
    Map, FeatureLayer, ArcGISDynamicMapServiceLayer, ImageParameters,//2
    Graphic, Point,
    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,//3
    Query, parser, GeometryService,//4
    SpatialReference, HomeButton,//5
    array, dom, Print, PrintTemplate, esriConfig,//6
    LocateButton, BasemapGallery,//7
    Measurement, Units, Menu, MenuItem,//8
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
        var layerGroups = [];

        // tạo bản đồ nền
        var baseMap = new ArcGISDynamicMapServiceLayer(configs.basemap.url, {
            "opacity": 0.9,
            "imageParameters": imageParameters
        });
        map.addLayer(baseMap);
        layerGroups.push([{
            layer: baseMap, // required unless featureCollection.
            subLayers: true, // optional
            visibility: true, // optional
            title: configs.basemap.title,
            id: configs.basemap.id
        }]);
        var style_point = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([0, 0, 0]), 1),
            new Color([174, 12, 229, 0.5]));
        var selectionSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol("solid", new Color([13, 213, 252, 1]), 6), null
        );

        // var style_polygon = new SimpleFillSymbol().setColor(new Color([174, 12, 229, 0.5]));
        var style_polygon = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([13, 213, 252]), 3), new Color([174, 12, 229, 0.2])
        );
        var featureLayers = [];
        for (const layercf of configs.chuyenDeLayers) {
            var maxLayerIndex = layercf.maxLayerIndex;
            if (maxLayerIndex) {
                var layerGroup = {
                    title: layercf.title,
                    layers: [],
                    id: layercf.id
                };
                var subLayers = layercf.subLayers;
                for (var index = maxLayerIndex; index >= 0; index--) {
                    let featureLayer = new esri.layers.FeatureLayer(layercf.url + "/" + index, {
                        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                        outFields: ["*"],
                        "opacity": 0.9,
                    });
                    // featureLayer.setSelectionSymbol(selectionSymbol);
                    var layer = {
                        layer: featureLayer, // required unless featureCollection.
                        subLayers: true, // optional
                        visibility: true, // optional
                    };
                    for (const subLayer of subLayers) {
                        if (subLayer.layerIds == index) {
                            featureLayer.id = subLayer.id + "_" + layercf.id;
                        }
                        if (subLayer.displayFields) {
                            featureLayer.displayFields = subLayer.displayFields;
                        }
                    }
                    featureLayers.push(featureLayer);
                    layerGroup.layers.push(layer);
                    featureLayer.on('load', (result) => {
                        featureLayer.setSelectionSymbol(featureLayer.geometryType === "esriGeometryPoint" ? style_point :
                            featureLayer.geometryType === "esriGeometryPolygon" ? style_polygon : selectionSymbol);
                    });
                }

                layerGroups.push(layerGroup);
            }
        }
        for (const layercf of configs.layers) {
            let featureLayer = new esri.layers.FeatureLayer(layercf.url, {
                mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"],
                "opacity": 0.9,
                id: layercf.id,
            });
            if (layercf.displayFields) {
                featureLayer.displayFields = layercf.displayFields;
            }
            featureLayers.push(featureLayer);
            if (layercf.id == "DauTu") {
                var layer = {
                    layer: featureLayer, // required unless featureCollection.
                    subLayers: true, // optional
                    visibility: true, // optional
                    title:layercf.title
                };
                var layerGroup = {
                    title: layercf.title,
                    layers: [layer],
                    id: layercf.id,
                };
                layerGroups.push(layerGroup);
            } else {
                featureLayer.setVisibility(false);
            }
        }
        map.addLayers(featureLayers);
        var layerList = new LayerList({ map, layerGroups });
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
        map.on("key-down", function (evt) {
            if (evt.code == "Escape") {
                measurement.clearResult();
                measurement.setTool("distance", false);
            }
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
            // var maCode = $(this).attr('maCode'); Bỏ maCode ( bỏ nút xem phiếu góp ý)
            var maCode = $(this).attr('maCode');
            if (maCode) {
                zoomThongTinDoAn(maCode);
            }
            getHoSoDoAn(mdoan);
        });
        /// end thông tin quy hoạch ///

        /// công bố lấy ý kiến

        $(".call_bandoquyhoach_layykien").on("click", function () {
            $("#panel_QHC").slideDown();
            var maCode = $(this).attr('maCode');
            var mdoan = $(this).attr('mdoan');
            if (maCode) {
                zoomThongTinDoAn(maCode);
            }
            getHoSoDoAn(mdoan, maCode);
        });

        $(".keugoidautu").on("click", function () {
            var objectID = $(this).attr('objectID');
            var query = new Query();
            query.where = "OBJECTID = " + objectID;
            map.graphics.clear();
            if (map.infoWindow.isShowing) {
                map.infoWindow.hide();
            }
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "DauTu";
            });
            if (featureLayer) {
                featureLayer.queryFeatures(query, function (result) {
                    var features = result.features;
                    if (features.length > 0) {
                        featUpdate = features[0];
                        popup.show(featUpdate, featureLayer);
                        var query = new Query();
                        query.geometry = featUpdate.geometry;
                        featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    }
                    else {
                        $("#messageBox").css("display", "inline-block");
                        map.infoWindow.hide();
                    }
                });
            }
            layerList.visibleLayerGroup("DauTu");
        });
        $("#TraCuuDoAnQuyHoach").on("click", function () {
            $(".panel_control").slideUp();
            $("#TraCuuDoAnQuyHoach_panel").toggle("slide");
        });
        $("#TraCuuHoTroCapPhep").on("click", function () {
            $(".panel_control").slideUp();
            $("#TraCuuHoTroCapPhep_panel").toggle("slide");
        });
        $("#LuaChonDiaDiemDauTu").on("click", function () {
            $(".panel_control").slideUp();
            $("#LuaChonDiaDiemDauTu_panel").toggle("slide");
        });
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
            ctxMenuForMap.startup();
            ctxMenuForMap.bindDomNode(map.container);
        }




        ////////////////////Print data//////////////////////////////
        // get print templates from the export web map task

        createPrintDijit("Test ok");

        function createPrintDijit(printTitle) {
            var templates;
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
        }


        map.on("layers-add-result", initEditor);

        var report, popup;
        function initEditor(evt) {

            var map = this;
            var layers = array.map(evt.layers, function (result) {
                return result.layer;
            });
            map.layers = layers;
            //display read-only info window when user clicks on feature 
            var query = new esri.tasks.Query();
            popup = new Popup({ map });
            report = new Report({ map, popup, layerList });
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
                            popup.show(featUpdate, layer);
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
        $("#LuaChonDiaDiemDauTu_tim").click(() => {
            $("#loadingpageDiv").css("display", "inline-block");
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "SDD_QHPK"
            });
            var maQuanHuyen = "", maPhuongXa = "", loaiDat = "", kiHieuLoDat = "", dienTichTu = "",
                dienTichDen = "", kcTu = "", kcDen = "", soVoi = "";

            maQuanHuyen = $("#LuaChonDiaDiemDauTu_quanhuyen").val();
            maPhuongXa = $("#LuaChonDiaDiemDauTu_phuongxa").val();
            loaiDat = $("#LuaChonDiaDiemDauTu_loaidat").val();
            dienTichTu = $("#LuaChonDiaDiemDauTu_dientichtu").val();
            dienTichDen = $("#LuaChonDiaDiemDauTu_dientichden").val();

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
        $("#viewFileQuangNam").on("click", function () {
            let link = $(this).attr("alt");
            let idDoc = $(this).attr("title");
            var viewDocFormData = $("#viewDocFormData").empty();
            $("#loadIdealForm").css("display", "block");
            viewForm = $('<iframe/>', {
                src: link,
                idDoc: idDoc
            }).appendTo(viewDocFormData);
            $(".yKienGroup").css("display", "none");
            viewForm.css({ "position": "absolute" });
        });
        function getHoSoDoAn(maDoAn, maCode) {
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
                        var panel_group = qhc.find("#" + item.LoaiHoSo);
                        var li = $('<li/>', {
                            class: "list-group-item"
                        }).appendTo(panel_group);
                        var span_LayYKien = $('<span/>', {
                            text: item.TenHoSo,
                            title: item.id,
                            alt: item.DuongDan,
                            class: "viewLayYKien",
                            dinhDang: item.DinhDangHoSo
                        }).appendTo(li);
                        span_LayYKien.on("click", function () {
                            let link = $(this).attr("alt");
                            let idDoc = $(this).attr("title");
                            let dinhDang = $(this).attr("dinhDang");
                            var viewDocFormData = $("#viewDocFormData").empty();
                            var viewForm;
                            if (dinhDang == "JPG") {
                                viewForm = $('<img/>', {
                                    src: link,
                                    idDoc: idDoc
                                }).appendTo(viewDocFormData);
                                $("#note-image").css("display", "block");
                            }
                            else {
                                if (dinhDang == "doc" || dinhDang == "docx") {
                                    link = "https://docs.google.com/gview?url=" + link + "&embedded=true";
                                }
                                viewForm = $('<iframe/>', {
                                    src: link,
                                    idDoc: idDoc
                                }).appendTo(viewDocFormData);
                                $("#note-image").css("display", "none");
                            }

                            $("#loadIdealForm").css("display", "block");
                            if (maCode) {
                                viewForm.css({ "position": "inherit" });
                                $(".yKienGroup").css("display", "block");
                            }
                            else {
                                $(".yKienGroup").css("display", "none");
                                viewForm.css({ "position": "absolute" });
                            }
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
                            $('#loadIdealReviewFormData').load(function () {
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
            var featureLayer = featureLayers.find(function (element) {
                return element.id == "ThongTinDoAn_" + loaimada
            });
            if (featureLayer) {
                featureLayer.queryFeatures(query, function (result) {
                    var features = result.features;
                    if (features.length > 0) {
                        featUpdate = features[0];
                        popup.show(featUpdate, featureLayer);
                        zoomData(featUpdate);
                        var query = new Query();
                        query.geometry = featUpdate.geometry;
                        featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    }
                    else {
                        $("#messageBox").css("display", "inline-block");
                        map.infoWindow.hide();
                    }
                });
            }
            layerList.visibleLayerGroup(loaimada);
        }

        function zoomData(featUpdate) {
            var geometryData = featUpdate.geometry;
            var stateExtent = geometryData.getExtent();
            map.setExtent(stateExtent);
            map.setScale(featUpdate._layer.maxScale * 2);
            var center = stateExtent.getCenter();
            map.centerAt(center);
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