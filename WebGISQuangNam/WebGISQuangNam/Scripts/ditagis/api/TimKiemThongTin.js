define([

], function () {
    return class {
        static ThongTinDoAn(maQuanHuyen, maPhuongXa, loaiQuyHoach, tenDoAn) {
            var url = "/ThongTinDoAn/TimKiem";
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { maQuanHuyen: maQuanHuyen, maPhuongXa: maPhuongXa, loaiQuyHoach: loaiQuyHoach, tenDoAn: tenDoAn },
                    cache: false,
                    success: function (results) {
                        resolve(results);
                    },
                    error: function (reponse) {
                        reject(reponse);
                    }
                });
            });

        }
        static ThongTinQHCT(maQuanHuyen, maPhuongXa, loaiDat, kiHieuKhuDat, kiHieuLoDat, tenDoAn) {
            var url = "/ThongTinQHCT/TimKiem";
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { maQuanHuyen: maQuanHuyen, maPhuongXa: maPhuongXa, loaiDat: loaiDat, kiHieuKhuDat: kiHieuKhuDat, kiHieuLoDat: kiHieuLoDat, tenDoAn: tenDoAn },
                    cache: false,
                    success: function (results) {
                        resolve(results);
                    },
                    error: function (reponse) {
                        reject(reponse);
                    }
                });
            });

        }
        static ThongTinQHPK(maQuanHuyen, maPhuongXa, loaiDat, kiHieuLoDat, dienTichTu, dientichDen,
            kcTu, kcDen, soVoi) {
            var url = "/ThongTinQHPK/TimKiem";
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        maQuanHuyen: maQuanHuyen,
                        maPhuongXa: maPhuongXa,
                        loaiDat: loaiDat,
                        kiHieuLoDat: kiHieuLoDat,
                        dienTichTu: dienTichTu,
                        dientichDen: dientichDen,
                        kcTu: kcTu,
                        kcDen: kcDen,
                        soVoi: soVoi
                    },
                    cache: false,
                    success: function (results) {
                        resolve(results);
                    },
                    error: function (reponse) {
                        reject(reponse);
                    }
                });
            });

        }
        static HoSoDoAn(maDoAn) {
            var url = "/HoSoDoAn/TimKiem";
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        maDoAn: maDoAn
                    },
                    cache: false,
                    success: (results) => {
                        resolve(results);

                    },
                    error: function (reponse) {
                        reject(reponse);
                    }
                });
            });

        }
    }
});