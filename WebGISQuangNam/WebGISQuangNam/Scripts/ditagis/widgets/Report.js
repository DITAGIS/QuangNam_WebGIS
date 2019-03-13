
define(["dojo/dom-construct",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point", "esri/geometry/Extent",
    "ditagis/configs",
],
    function (domConstruct, Query, FeatureLayer,
        Point, Extent,configs ) {
        "use strict";
        class Report {
            constructor(map) {
                this.map = map;
                this.displayFields = {
                    // CongThoatNuoc: [
                    //     { width: 60, title: "STT", field: "STT" },
                    //     { width: 60, title: "ChieuDai", field: "ChieuDai" },
                    //     { width: 60, title: "DoDoc", field: "DoDoc" },
                    // ],
                    BeChua: [
                        { width: 60, title: "STT", field: "STT" },
                        { width: 60, title: "DienTich", field: "DienTich" },
                        { width: 60, title: "CongSuat", field: "CongSuat" },
                    ],
                };
                this.initWindowKendo();

            }
            initWindowKendo() {
                this.report_content = $("#ResultDataSearchContent");
                this.table = $('<div/>', {
                    id: 'table-report'
                }).appendTo(this.report_content);
            }
            convertAttributes(fields, lstAttributes) {
                if (fields && fields.length > 0) {
                    fields.forEach(field => {
                        if (field.type === "date") {
                            lstAttributes.forEach(attributes => {
                                if (attributes[field.name])
                                    attributes[field.name] = kendo.toString(new Date(attributes[field.name]), "HH:mm:ss dd-MM-yyyy");
                            });
                        }
                    });
                }
                return lstAttributes;
            }
            showTable(layer, attributes) {
                let columns = this.displayFields[layer.id] || [];
                var fields = layer.fields;
                if (columns.length > 0) {
                    columns.forEach(c => {
                        if (!c.title) {
                            let field = layer.fields.find(f => f.name === c.field);
                            if (field)
                                c.title = field.alias;
                        }
                    });
                }
                else if (layer.displayFields) {
                    for (const displayField of layer.displayFields) {
                        for (const field of layer.fields) {
                            if (displayField == field.name) {
                                if (displayField == "TenDoAn") {
                                    columns.push({ width: 100, title: field.alias, field: field.name });
                                }
                                else
                                    columns.push({ width: 40, title: field.alias, field: field.name });
                            }
                        }
                    }
                }
                else {
                    for (const field of layer.fields) {
                        if (field.name != "SHAPE" && field.name != "SHAPE.STArea()" && field.name != "SHAPE.STLength()")
                            columns.push({ title: field.alias, field: field.name });
                    }
                }
                if (layer.id == "SDD_QHCT") {
                    columns.push({
                        command: {
                            text: " ",
                            click: (e) => {
                                var grid = $("#table-report").data('kendoGrid');
                                var quyHoachChiTietSDD = grid.dataItem($(e.currentTarget).closest("tr"));
                                // var ngayPheDuyet = quyHoachChiTietSDD.NgayPheDuyet;
                                // if (ngayPheDuyet)
                                //     quyHoachChiTietSDD.NgayPheDuyet = this.getDate(ngayPheDuyet);
                                // // this.inBaoCao(model);

                                this.excute(quyHoachChiTietSDD, layer);
                            },
                            iconClass: "fa fa-download",
                            className: "btn-download"
                        }, title: "Xuất TT Đ/A",
                        width: 40,
                    });
                }

                var export_columns = [];
                for (const field of layer.fields) {
                    if (field.name != "SHAPE" && field.name != "SHAPE.STArea()" && field.name != "SHAPE.STLength()")
                        export_columns.push({ title: field.alias, field: field.name });
                }
                let kendoData = this.convertAttributes(fields, attributes);
                if ($("#table-report").data('kendoGrid')) {
                    $("#table-report").data("kendoGrid").destroy();
                }
                this.kendoGrid = $('#table-report').empty().kendoGrid({
                    toolbar: [{ name: "custom", text: "Xuất báo cáo" },
                    { name: "close", text: "" }],
                    resizable: true,
                    excel: {
                        allPages: true,
                        fileName: "Thống kê dữ liệu.xlsx"
                    },
                    selectable: true,
                    pageable: true,
                    columns: columns,
                    dataSource: {
                        transport: {
                            read: function (e) {
                                e.success(kendoData);
                            },
                            error: function (e) {
                                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                            }
                        },
                        pageSize: 8,
                        batch: false,
                        schema: {
                            model: {
                                id: "OBJECTID",
                            }
                        }
                    },
                    change: (e) => {
                        let selectedRows = e.sender.select();
                        let objectID = e.sender.dataItem(selectedRows)['OBJECTID'];
                        var featureLayer;
                        if (layer.id == "ThongTinDoAn") {
                            let loaiQuyHoach = e.sender.dataItem(selectedRows)['LoaiQuyHoach'];
                            featureLayer = this.map._layers['ThongTinDoAn_' + loaiQuyHoach];
                        }
                        else {
                            featureLayer = layer;
                        }
                        if (layer.geometryType == "esriGeometryPoint") {
                            this.zoomRowPoint(objectID, featureLayer);
                        }
                        else if (layer.geometryType == "esriGeometryPolygon") {
                            this.zoomRowPolygon(objectID, featureLayer);
                        }
                        else if (layer.geometryType == "esriGeometryPolyline") {
                            this.zoomRowPolygon(objectID, featureLayer);
                        }
                    }
                });
                this.kendoGrid.find(".k-grid-toolbar").on("click", ".k-grid-custom", (e) => {
                    this.exportExcel(attributes, export_columns);
                });
                this.kendoGrid.find(".k-grid-toolbar").on("click", ".k-grid-close", (e) => {
                    $(".panel_control").slideUp();
                });
                $(".k-grid-close").addClass('fa fa-times');
            }
            exportExcel(attributes, export_columns) {
                var cells = [];
                for (const column of export_columns) {
                    var cell = {
                        value: column.title
                    }
                    cells.push(cell);
                }
                var rows = [{
                    cells: cells
                }];
                for (const attribute of attributes) {
                    let cells = [];
                    for (const column of export_columns) {
                        var cell = {
                            value: attribute[column.field]
                        }
                        cells.push(cell);
                    }
                    rows.push({
                        cells: cells
                    })
                }
                //using fetch, so we can process the data when the request is successfully completed
                var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            columns: [
                                // Column settings (width)
                                { autoWidth: true },
                                { autoWidth: true },
                            ],
                            rows: rows
                        }
                    ]
                });
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Thống kê dữ liệu.xlsx" });
            }
            zoomRowPoint(id, layerClass) {
                this.map.graphics.clear();
                layerClass.clearSelection();
                var query = new Query();
                query.objectIds = [id];
                layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, (features) => {
                    if (features.length > 0) {
                        var point = features[0].geometry;
                        if (point) {
                            var pt = new Point(point.x, point.y, this.map.spatialReference);
                            if (pt) {
                                var extent = new Extent((point.x + 10), (point.y + 10), (point.x - 10), (point.y - 10), this.map.spatialReference);
                                layerClass.selectFeatures(features[0]);
                                var stateExtent = extent;
                                this.map.setExtent(stateExtent);
                            }
                        }
                    }
                });
            }
            queryFeature_DoAnQuyHoach(geometry) {
                var featureLayer = this.map._layers['ThongTinDoAn_QHCT'];
                var query = new Query();
                query.geometry = geometry;
                return featureLayer.queryFeatures(query);
            }
            async excute(quyHoachChiTietSDD, layer) {
                var objectID = quyHoachChiTietSDD.OBJECTID;
                var rs = await this.queryFeature(objectID, layer);
                var feature = rs.features[0];
                var ft_DoAn = await this.queryFeature_DoAnQuyHoach(feature.geometry);
                var thongTinDoAn = ft_DoAn.features[0].attributes;
                var stateExtent = ft_DoAn.features[0].geometry.getExtent();
                var model = {};
                for (var key in quyHoachChiTietSDD) {
                    var value = quyHoachChiTietSDD[key];
                    if (!model[key])
                        model[key] = value;
                }
                for (var key in thongTinDoAn) {
                    var value = thongTinDoAn[key];
                    if (!model[key])
                        model[key] = value;
                }
                for (var key in stateExtent) {
                    var value = stateExtent[key];
                    if (!model[key])
                        model[key] = value;
                }
                var imageLayerConfig = configs.chuyenDeLayers.find(function(element) {
                    return element.id == 'QHCT';
                  });
                model.url = imageLayerConfig.url;
                if (thongTinDoAn["NgayPheDuyet"]) {
                    model["NgayPheDuyet"] = this.getDate(thongTinDoAn["NgayPheDuyet"]);
                }

                this.inBaoCao(model);
                console.log(model);
            }
            queryFeature(objectID, layer) {
                var query = new Query();
                query.objectIds = [objectID];
                return layer.queryFeatures(query);
            }

            zoomRowPolygon(id, layerClass) {
                layerClass.clearSelection();
                this.map.graphics.clear();
                var query = new Query();
                query.objectIds = [id];
                layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, (features) => {
                    //zoom to the selected feature
                    layerClass.selectFeatures[features[0]];
                    var stateExtent = features[0].geometry.getExtent();
                    this.map.setExtent(stateExtent);
                });
            }
            getDate(value) {
                var datetime = new Date(parseInt(value));
                var dd = datetime.getDate();
                var mm = datetime.getMonth() + 1; //January is 0!

                var yyyy = datetime.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var day = dd + '/' + mm + '/' + yyyy;
                return day;
            }
            inBaoCao(model) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', `/ThongTinDoAn/XuatPhieu`, true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.responseType = 'arraybuffer';
                xhr.onload = function () {
                    if (this.status === 200) {
                        var filename = "";
                        var disposition = xhr.getResponseHeader('Content-Disposition');
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                        }
                        var type = xhr.getResponseHeader('Content-Type');

                        var blob = typeof File === 'function'
                            ? new File([this.response], filename, { type: type })
                            : new Blob([this.response], { type: type });
                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                            window.navigator.msSaveBlob(blob, filename);
                        } else {
                            var URL = window.URL || window.webkitURL;
                            var downloadUrl = URL.createObjectURL(blob);

                            if (filename) {
                                // use HTML5 a[download] attribute to specify filename
                                var a = document.createElement("a");
                                // safari doesn't support this yet
                                if (typeof a.download === 'undefined') {
                                    window.location = downloadUrl;
                                } else {
                                    a.href = downloadUrl;
                                    a.download = filename;
                                    document.body.appendChild(a);
                                    a.click();
                                }
                            } else {
                                window.location = downloadUrl;

                            }
                            setTimeout(function () {
                                URL.revokeObjectURL(downloadUrl);
                                $("#loaderInvoice").addClass("d-none");
                            }, 100); // cleanup
                        }
                    }
                };
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(JSON.stringify(model));
            }
        }
        return Report;
    });
