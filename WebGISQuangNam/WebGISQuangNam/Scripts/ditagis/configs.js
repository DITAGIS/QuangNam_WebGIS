define(["require", "exports"], function (require, exports) {
    "use strict";
    return {
        gisMapServerLayers: {
            basemap: {
                title: 'Bản đồ nền',
                id: 'bandonen',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamBasemap/MapServer',
            },
            // QuangNamSDD: {
            //     id: 'QuangNamSDD',
            //     url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamSDD/MapServer',
            // },
            QuangNamQHC: {
                title: "Bản đồ chuyên đề QH Chung",
                id: 'QuangNamQHC',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer'
            },
            QuangNamQHPK: {
                title: "Bản đồ chuyên đề QH Phân Khu",
                id: 'QuangNamQHPK',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer'
            },
            QuangNamQHCT: {
                title: "Bản đồ chuyên đề QH Chi Tiết",
                id: 'QuangNamQHCT',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer'
            },
            QuangNamQHV: {
                title: "Bản đồ chuyên đề QH Vùng",
                id: 'QuangNamQHV',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer'
            },
            QuangNamQHNT: {
                title: "Bản đồ chuyên đề QH Nông Thôn",
                id: 'QuangNamQHNT',
                url: 'https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer'
            }
        },

        layers: {
            SDD_QuangNamQHCSDD: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/14",
                id: "SDD_QuangNamQHCSDD",
                title: "QHC_Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QuangNamQHCT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/13",
                id: "SDD_QuangNamQHCT",
                title: "Xem thông tin QHCT Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QuangNamQHNT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/13",
                id: "SDD_QuangNamQHNT",
                title: "Xem thông tin QHNT Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QuangNamQHPK: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/13",
                id: "SDD_QuangNamQHPK",
                title: "Xem thông tin QHPK Sử dụng đất",
                typeSelectFeature:"SDD",
                displayFields:['TenDoAn','LoaiDat','DienTich','KiHieuKhuDat']
            },
            SDD_QuangNamQHV: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/12",
                id: "SDD_QuangNamQHV",
                title: "Xem thông tin QHV Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            ThongTinDoAnQuangNamQHCT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/14",
                id: "ThongTinDoAnQuangNamQHCT",
                title: "Xem thông tin đồ án QH Chi tiết",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAnQuangNamQHC: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/15",
                id: "ThongTinDoAnQuangNamQHC",
                title: "Xem thông tin đồ án QH Chung",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAnQuangNamQHNT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/14",
                id: "ThongTinDoAnQuangNamQHNT",
                title: "Xem thông tin đồ án QH Nông Thôn",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAnQuangNamQHPK: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/14",
                id: "ThongTinDoAnQuangNamQHPK",
                title: "Xem thông tin đồ án QH Phân Khu",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAnQuangNamQHV: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/13",
                id: "ThongTinDoAnQuangNamQHV",
                title: "Xem thông tin đồ án QH Vùng",
                typeSelectFeature:"ThongTin"
            }
        },
        tables: {
        },
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
