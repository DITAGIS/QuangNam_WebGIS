define([
    "esri/tasks/query",
    "dojo/on"
], function (Query,
    on) {
        class DauTu {
            constructor(params) {
                this.map = params.map;
                this.layerDauTu = params.featureLayers.find(function (element) {
                    return element.id == "DauTu";
                });
                this.popup = params.popup;
                this.init();
            }
            init() {
                var query = new Query();
                this.container = $("#dr-dautu");
                query.where = "1=1";
                if (this.layerDauTu) {
                    this.layerDauTu.queryFeatures(query, (result) => {
                        var features = result.features;
                        if (features.length > 0) {
                            for (let i = 0; i < features.length; i++) {
                                var feature = features[i];
                                var attributes = feature.attributes;
                                let li = $('<li/>', {
                                }).appendTo(this.container);
                                var element = $('<a/>', {
                                    text: attributes["TenDauTu"]
                                }).appendTo(li);
                                element.on('click', (evt) => {
                                    this.popup.show(feature, this.layerDauTu);
                                });

                            }
                        }
                        else {
                            $("#messageBox").css("display", "inline-block");
                            map.infoWindow.hide();
                        }
                    });
                }
            }
        }

        return DauTu;
    });