
define(["dojo/dom-construct",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point", "esri/geometry/Extent",
],
    function (domConstruct, Query, FeatureLayer,
        Point, Extent, ) {
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
                else if(layer.displayFields){
                    for (const displayField of layer.displayFields) {
                        for (const field of layer.fields) {
                            if(displayField == field.name){
                                columns.push({ title: field.alias, field: field.name });
                            }
                        }
                    }
                }
                else{
                    for (const field of layer.fields) {
                        if (field.name != "SHAPE" && field.name != "SHAPE.STArea()" && field.name != "SHAPE.STLength()")
                            columns.push({ title: field.alias, field: field.name });
                    }
                }

                let kendoData = this.convertAttributes(fields, attributes);
                this.kendoGrid = $('#table-report').empty().kendoGrid({
                    toolbar: [{ name: "excel", text: "Xuất báo cáo" }],
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
                        if (layer.geometryType == "esriGeometryPoint") {
                            this.zoomRowPoint(objectID, layer);
                        }
                        else if (layer.geometryType == "esriGeometryPolygon") {
                            this.zoomRowPolygon(objectID, layer);
                        }
                        else if (layer.geometryType == "esriGeometryPolyline") {
                            this.zoomRowPolygon(objectID, layer);
                        }
                    },
                    excelExport: (e) => {
                        if (e.data) {
                            for (const item of e.data) {
                            }
                        }
                    }
                });
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
                                var stateExtent = extent.expand(5.0);
                                this.map.setExtent(stateExtent);
                            }
                        }
                    }

                });
            }

            zoomRowPolygon(id, layerClass) {
                layerClass.clearSelection();
                this.map.graphics.clear();
                var query = new Query();
                query.objectIds = [id];
                layerClass.selectFeatures(query, FeatureLayer.SELECTION_NEW, (features) => {
                    //zoom to the selected feature
                    layerClass.selectFeatures[features[0]];
                    var stateExtent = features[0].geometry.getExtent().expand(10);
                    this.map.setExtent(stateExtent);
                });
            }
        }
        return Report;
    });
