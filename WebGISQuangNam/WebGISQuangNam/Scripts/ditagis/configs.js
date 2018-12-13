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
                id: 'QHC',
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
            ThongTinDoAn: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamSDD/MapServer/2",
                id: "ThongTinDoAn",
                title: "Thông tin đồ án",
                displayFields:['TenDoAn','DiaDiem']
            },
            ThongTinDoAn_QHV: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/13",
                id: "ThongTinDoAn_QHV",
                title: "Xem thông tin đồ án QH Vùng",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAn_QHPK: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/14",
                id: "ThongTinDoAn_QHPK",
                title: "Xem thông tin đồ án QH Phân Khu",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAn_QHNT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/14",
                id: "ThongTinDoAn_QHNT",
                title: "Xem thông tin đồ án QH Nông Thôn",
                typeSelectFeature:"ThongTin"
            },
            ThongTinDoAn_QHC: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/15",
                id: "ThongTinDoAn_QHC",
                title: "Xem thông tin đồ án QH Chung",
                typeSelectFeature:"ThongTin",
                displayFields:['TenDoAn','DiaDiem']
            },
            ThongTinDoAn_QHCT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/14",
                id: "ThongTinDoAn_QHCT",
                title: "Xem thông tin đồ án QH Chi tiết",
                typeSelectFeature:"ThongTin",
            },
            SDD_QHV: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHV/MapServer/12",
                id: "SDD_QHV",
                title: "Xem thông tin QHV Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QHNT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHNT/MapServer/13",
                id: "SDD_QHNT",
                title: "Xem thông tin QHNT Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QHC: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHC/MapServer/14",
                id: "SDD_QHC",
                title: "QHC_Sử dụng đất",
                typeSelectFeature:"SDD"
            },
            SDD_QHPK: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHPK/MapServer/13",
                id: "SDD_QHPK",
                title: "Xem thông tin QHPK Sử dụng đất",
                typeSelectFeature:"SDD",
                displayFields:['TenDoAn','LoaiDat','DienTich','KiHieuKhuDat']
            },
            SDD_QHCT: {
                url: "https://sawagis.vn/arcgis/rest/services/QuangNam/QuangNamQHCT/MapServer/13",
                id: "SDD_QHCT",
                title: "Xem thông tin QHCT Sử dụng đất",
                typeSelectFeature:"SDD",
                displayFields:['TenDoAn','KiHieuLoDat','LoaiDat','DienTichLoDat']
            },
        },
        tables: {
        },
        fields:{
            hidden:['SHAPE','SHAPE.STArea()','SHAPE.STLength()','OBJECTID']
        }
        // zoom: 10,
        // center: [106.6843694, 11.158752270428375]
    };
});
