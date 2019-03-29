define([
    "ditagis/configs",
], function (configs) {
    class Popup {
        constructor(params) {
            this.map = params.map;
            this.initWidget();
        }
        initWidget() {
            this.map.infoWindow.setTitle("Kết quả tra cứu");
            this.map.infoWindow.resize(310, 300);
        }
        show(feature, layer) {
            var inforContent = this.getInforPopup(layer, feature);
            this.map.infoWindow.setContent(inforContent);
            var location = this.getCenter(feature.geometry);
            this.map.infoWindow.show(location, "upperright");
            this.map.centerAt(location);
            $(".linkThuyetMinh").on('click', function() {
                let alt = window.location.origin + $(this).attr("alt");
                let idDoc = $(this).attr("title");
                var viewDocFormData = $("#viewDocFormData").empty();
                var viewForm;
                var linkView = "https://docs.google.com/gview?url=" + alt + "&embedded=true";
                viewForm = $('<iframe/>', {
                    src: linkView,
                    idDoc: idDoc
                }).appendTo(viewDocFormData);
                $("#note-image").css("display", "none");
                $("#loadIdealForm").css("display", "block");
                $(".yKienGroup").css("display", "none");
                viewForm.css({ "position": "absolute" });
            });
        }
        getCenter(geometry) {
            if (geometry != null) {
                if (geometry.type == "polyline") {
                    var paths = geometry.paths[0];
                    var centerPath = paths[Math.round(paths.length / 2)];
                    return new Point(centerPath[0], centerPath[1], geometry.spatialReference);
                }
                if (geometry.type == "polygon") {
                    return geometry.getCentroid();
                }
                if (geometry.type == "point") {
                    return geometry;
                }
            }
        }
        getDate(value) {
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
        getValueDomain(domain, code) {
            var domainData = domain.toJson();
            var codedValues = domainData.codedValues;
            for (var i = 0; i < codedValues.length; i++) {
                if (codedValues[i].code == code) {
                    return codedValues[i].name;
                }
            }
            return null;
        }
        getInforPopup(featureLayer, feature) {
            var content = $('<li/>', {
                class: 'contentPopup'
            });
            var fields = featureLayer.fields;
            var hiddenFields = configs.fields['hidden'];
            var linkThuyetMinh = null;
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
                        value = this.getValueDomain(domain, value);
                    }
                    if (field.type == "esriFieldTypeDate") {
                        value = this.getDate(value);
                    }
                    if (value) {
                        if (name == "LinkFileThuyetMinh") {
                            linkThuyetMinh = $('<a/>', {
                                text: "Xem chi tiết",
                                alt: value,
                                title: feature.attributes["TenDuAn"],
                                class: "linkThuyetMinh"
                            }).appendTo(content);
                        }
                        else {
                            var fieldDiv = $('<div/>', {
                            }).appendTo(content);
                            $('<span/>', {
                                class: 'lableColName',
                                text: field.alias + ": "
                            }).appendTo(fieldDiv);;
                            $('<span/>', {
                                class: 'lableColValue',
                                text: value
                            }).appendTo(fieldDiv);
                        }
                    }
                }
            }
            return content.html();
        }
    }

    return Popup;
});