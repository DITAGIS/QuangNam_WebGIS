define([
    "esri/dijit/LayerList",
    "dojo/on"
], function (EsriLayerList,
    on) {
        class LayerList {
            constructor(params) {
                this.map = params.map;
                this.layerGroups = params.layerGroups || [];
                this.initWiget();
            }
            getLayers(layers) {
                var result = [];
                var size = layers.length;
                for (var i = size - 1; i >= 0; i--) {
                    result.push(layers[i]);
                }
                return result;
            }

            initWiget() {
                this.container = $("#layerList");
                this.basemap = $("#basemap");
                if (this.layerGroups && this.layerGroups.length > 0) {
                    for (const layerGroup of this.layerGroups) {
                        if (layerGroup[0] && layerGroup[0].id == "basemap") {
                            var baseMapWidget = new EsriLayerList({
                                map: this.map,
                                layers: layerGroup,
                                showLegend: true,
                            }, "basemap");
                            baseMapWidget.startup();
                        }
                        else {
                            var layers = this.getLayers(layerGroup.layers);
                            let esriLayerList = $('<div/>', {
                                class: 'esriLayerList custom-layer-list'
                            }).appendTo(this.container);
                            let toggleButton = $('<div/>', {
                                tabindex: "0",
                                role: "button",
                                'data-layer-index': "5",
                                title: "Mở rộng",
                                class: "esriToggleButton esri-icon-right toggle-qhvt"
                            }).appendTo(esriLayerList);
                            let label = $('<label/>', {
                                class: 'esriLabel',
                                text: layerGroup.title,
                            }).appendTo(esriLayerList);
                            let input = $('<input/>', {
                                type: 'checkbox',
                                class: 'esriCheckbox list_item',
                                id: "input_" + layerGroup.id,
                                checked: true
                            }).appendTo(label);

                            let layerList = $('<div/>', {
                                id: layerGroup.id + "-layer-list",
                            }).appendTo(esriLayerList);
                            var widget = new EsriLayerList({
                                map: this.map,
                                layers: layers,
                                showLegend: true,
                            }, layerList[0]);
                            widget.startup();
                            on(widget, 'load', (evtWidget) => {
                                var idWidget = evtWidget.detail.widget.id;
                                $('#' + idWidget).addClass("layer-list-group hidden");
                                input.click((evt) => {
                                    var isVisileLayer = evt.currentTarget.checked;
                                    var layers = evtWidget.detail.widget.layers;
                                    for (const index in layers) {
                                        layers[index].layer.setVisibility(isVisileLayer)
                                    }
                                });
                                toggleButton.click((evt) => {
                                    $('#' + idWidget).toggleClass("hidden");
                                    toggleButton.toggleClass("esri-icon-down esri-icon-right");
                                });
                            })
                        }

                    }
                }
                $("#toogleLayerList").attr('checked', 'checked');
                $("#toogleLayerList").click((evt) => {
                    var isVisileLayer = evt.currentTarget.checked;
                    $(".list_item").prop("checked", isVisileLayer);
                    if (this.layerGroups && this.layerGroups.length > 0) {
                        for (const layerGroup of this.layerGroups) {
                            if (layerGroup[0] && layerGroup[0].id == "basemap") {
                                layerGroup[0].layer.setVisibility(isVisileLayer)
                            }
                            else {
                                var layers = layerGroup.layers;
                                for (const item of layers) {
                                    item.layer.setVisibility(isVisileLayer)
                                }
                            }
                        }
                    }
                });
            }
            visibleLayerGroup(layerGroupID) {
                $(".list_item").prop("checked", false);
                if (this.layerGroups && this.layerGroups.length > 0) {
                    for (const layerGroup of this.layerGroups) {
                        if (layerGroup[0] && layerGroup[0].id == "basemap") {
                            layerGroup[0].layer.setVisibility(false)
                        }
                        else {
                            var layers = layerGroup.layers;
                            for (const item of layers) {
                                item.layer.setVisibility(false)
                            }
                        }
                    }
                    for (const layerGroup of this.layerGroups) {
                        if (layerGroup.id == layerGroupID) {
                            $(".list_item#input_" + layerGroupID).prop("checked", true);
                            var layers = layerGroup.layers;
                            for (const item of layers) {
                                item.layer.setVisibility(true)
                            }
                            break;
                        }

                    }
                }

            }
        }

        return LayerList;
    });