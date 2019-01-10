define(["require", "exports"], function (require, exports) {
    "use strict";
    var baseurl = 'https://ditagis.com/arcgis/rest/services/QuangNam';
    return {
        urlQHVT: baseurl + '/QuangNamQHV_Tinh/FeatureServer/',
        gisMapServerLayers: {
            basemap: {
                title: 'Bản đồ nền',
                id: 'bandonen',
                url: baseurl + '/QuangNamBasemap/MapServer',
            },
            // QuangNamSDD: {
            //     id: 'QuangNamSDD',
            //     url:baseurl+'/QuangNamSDD/MapServer',
            // },
            QuangNamQHC: {
                title: "Bản đồ chuyên đề QH Chung",
                id: 'QHC',
                url: baseurl + '/QuangNamQHC/MapServer'
            },
            QuangNamQHPK: {
                title: "Bản đồ chuyên đề QH Phân Khu",
                id: 'QuangNamQHPK',
                url: baseurl + '/QuangNamQHPK/MapServer'
            },
            QuangNamQHCT: {
                title: "Bản đồ chuyên đề QH Chi Tiết",
                id: 'QuangNamQHCT',
                url: baseurl + '/QuangNamQHCT/MapServer'
            },
            QuangNamQHV: {
                title: "Bản đồ chuyên đề QH Vùng",
                id: 'QuangNamQHV',
                url: baseurl + '/QuangNamQHV/MapServer'
            },
            QuangNamQHV_Tinh: {
                title: "Bản đồ chuyên đề QH Vùng Tỉnh",
                id: 'QuangNamQHV_Tinh',
                url: baseurl + '/QuangNamQHV_Tinh/MapServer'
            },
            QuangNamQHNT: {
                title: "Bản đồ chuyên đề QH Nông Thôn",
                id: 'QuangNamQHNT',
                url: baseurl + '/QuangNamQHNT/MapServer'
            }
        },

        layers: {
            ThongTinDoAn: {
                url: baseurl + "/QuangNamSDD/MapServer/2",
                id: "ThongTinDoAn",
                title: "Thông tin đồ án",
                displayFields: ['TenDoAn', 'DiaDiem']
            },
            ThongTinDoAn_QHV: {
                url: baseurl + "/QuangNamQHV/MapServer/13",
                id: "ThongTinDoAn_QHV",
                title: "Xem thông tin đồ án QH Vùng",
                typeSelectFeature: "ThongTin"
            },
            ThongTinDoAn_QHPK: {
                url: baseurl + "/QuangNamQHPK/MapServer/14",
                id: "ThongTinDoAn_QHPK",
                title: "Xem thông tin đồ án QH Phân Khu",
                typeSelectFeature: "ThongTin"
            },
            ThongTinDoAn_QHNT: {
                url: baseurl + "/QuangNamQHNT/MapServer/14",
                id: "ThongTinDoAn_QHNT",
                title: "Xem thông tin đồ án QH Nông Thôn",
                typeSelectFeature: "ThongTin"
            },
            ThongTinDoAn_QHC: {
                url: baseurl + "/QuangNamQHC/MapServer/15",
                id: "ThongTinDoAn_QHC",
                title: "Xem thông tin đồ án QH Chung",
                typeSelectFeature: "ThongTin",
                displayFields: ['TenDoAn', 'DiaDiem']
            },
            ThongTinDoAn_QHCT: {
                url: baseurl + "/QuangNamQHCT/MapServer/14",
                id: "ThongTinDoAn_QHCT",
                title: "Xem thông tin đồ án QH Chi tiết",
                typeSelectFeature: "ThongTin",
            },
            SDD_QHV: {
                url: baseurl + "/QuangNamQHV/MapServer/12",
                id: "SDD_QHV",
                title: "Xem thông tin QHV Sử dụng đất",
                typeSelectFeature: "SDD"
            },
            SDD_QHNT: {
                url: baseurl + "/QuangNamQHNT/MapServer/13",
                id: "SDD_QHNT",
                title: "Xem thông tin QHNT Sử dụng đất",
                typeSelectFeature: "SDD"
            },
            SDD_QHC: {
                url: baseurl + "/QuangNamQHC/MapServer/14",
                id: "SDD_QHC",
                title: "QHC_Sử dụng đất",
                typeSelectFeature: "SDD"
            },
            SDD_QHPK: {
                url: baseurl + "/QuangNamQHPK/MapServer/13",
                id: "SDD_QHPK",
                title: "Xem thông tin QHPK Sử dụng đất",
                typeSelectFeature: "SDD",
                displayFields: ['TenDoAn', 'LoaiDat', 'DienTich', 'KiHieuKhuDat']
            },
            SDD_QHCT: {
                url: baseurl + "/QuangNamQHCT/MapServer/13",
                id: "SDD_QHCT",
                title: "Xem thông tin QHCT Sử dụng đất",
                typeSelectFeature: "SDD",
                displayFields: ['TenDoAn', 'KiHieuLoDat', 'LoaiDat', 'DienTichLoDat']
            },
            // KhoangSan_2020: {
            //     url: baseurl + "/QuangNamQHV_Tinh/MapServer/3",
            //     id: "KhoangSan_2020",
            //     title: "Quy hoạch vùng tỉnh - Khoảng sản",
            // },
           
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
