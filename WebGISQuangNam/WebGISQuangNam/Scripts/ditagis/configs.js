define(["require", "exports"], function (require, exports) {
    "use strict";
    //var baseurl = 'http://103.104.119.99:6080/arcgis/rest/services/QuangNam';
     var baseurl = 'https://ditagis.com/arcgis/rest/services/QuangNam';
    return {
        basemap: {
            title: 'BẢN ĐỒ NỀN',
            id: 'basemap',
            url: baseurl + '/QuangNamBasemap/MapServer',
        },
        chuyenDeLayers: [{
            title: "QUY HOẠCH VÙNG TỈNH THỔNG HỢP",
            id: 'QHV_Tinh',
            url: baseurl + '/QuangNamQHV_Tinh/FeatureServer',
            maxLayerIndex: 18,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 16
                },
                {
                    id: 'ThongTinDoAn',
                    layerIds: 17
                }
            ]
        }, {
            title: "QUY HOẠCH VÙNG",
            id: 'QHV',
            url: baseurl + '/QuangNamQHV/MapServer',
            maxLayerIndex: 13,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 12
                },
                {
                    layerIds: 13,
                    id: "ThongTinDoAn",
                }
            ]
        },{
            title: "QUY HOẠCH CHUNG",
            id: 'QHC',
            url: baseurl + '/QuangNamQHC/MapServer',
            maxLayerIndex: 15,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 14
                },
                {
                    id: 'ThongTinDoAn',
                    layerIds: 15
                }
            ]
        }, {
            title: "QUY HOẠCH PHÂN KHU",
            id: 'QHPK',
            url: baseurl + '/QuangNamQHPK/MapServer',
            maxLayerIndex: 14,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 13,
                    displayFields: ['TenDoAn', 'LoaiDat', 'DienTich', 'KiHieuKhuDat']
                },
                {
                    id: 'ThongTinDoAn',
                    layerIds: 14
                }
            ]
        }, {
            title: "QUY HOẠCH CHI TIẾT",
            id: 'QHCT',
            url: baseurl + '/QuangNamQHCT/MapServer',
            maxLayerIndex: 14,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 13,
                    displayFields: ['TenDoAn', 'KiHieuLoDat', 'LoaiDat', 'DienTichLoDat']
                },
                {
                    id: 'ThongTinDoAn',
                    layerIds: 14
                }
            ]
        }, {
            title: "QUY HOẠCH NÔNG THÔN",
            id: 'QHNT',
            url: baseurl + '/QuangNamQHNT/MapServer',
            maxLayerIndex: 14,
            subLayers: [
                {
                    id: 'SDD',
                    layerIds: 13
                },
                {
                    id: 'ThongTinDoAn',
                    layerIds: 14
                }
            ]
        }],
        layers: {
            ThongTinDoAn: {
                url: baseurl + "/QuangNamSDD/MapServer/2",
                id: "ThongTinDoAn",
                title: "Thông tin đồ án",
                displayFields: ['TenDoAn', 'DiaDiem']
            },
        },
        tables: {
        },
        fields: {
            hidden: ['SHAPE', 'SHAPE.STArea()', 'SHAPE.STLength()', 'OBJECTID']
        }
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
