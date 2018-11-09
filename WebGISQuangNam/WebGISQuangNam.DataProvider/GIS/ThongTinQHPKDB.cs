namespace WebGISQuangNam.DataProvider.GIS
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using WebGISQuangNam.DataProvider.EF;
    using static WebGISQuangNam.DataProvider.GIS.Models.Model;

    /// <summary>
    /// Defines the <see cref="ThongTinQHPKDB" />
    /// </summary>
    public class ThongTinQHPKDB
    {
        /// <summary>
        /// The GetAll
        /// </summary>
        /// <returns>The <see cref="List{QHPK_SUDUNGDAT}"/></returns>
        public List<QHPK_SUDUNGDAT> GetAll()
        {
            using (var context = new GISEntities())
            {
                return context.QHPK_SUDUNGDAT.ToList();
            }
        }

        /// <summary>
        /// The TimKiem
        /// </summary>
        /// <param name="maQuanHuyen">The maQuanHuyen<see cref="string"/></param>
        /// <param name="maPhuongXa">The maPhuongXa<see cref="string"/></param>
        /// <param name="loaiDat">The loaiDat<see cref="string"/></param>
        /// <param name="kiHieuLoDat">The kiHieuLoDat<see cref="string"/></param>
        /// <param name="dienTichTu">The dienTichTu<see cref="int"/></param>
        /// <param name="dientichDen">The dientichDen<see cref="int"/></param>
        /// <param name="kcTu">The kcTu<see cref="int"/></param>
        /// <param name="kcDen">The kcDen<see cref="int"/></param>
        /// <param name="soVoi">The soVoi<see cref="string"/></param>
        /// <returns>The <see cref="List{QHPK_SUDUNGDAT}"/></returns>
        public List<ThongTinQHPKDTO> TimKiem(string maQuanHuyen, string maPhuongXa, string loaiDat, string kiHieuLoDat, decimal? dienTichTu, decimal? dientichDen,
            decimal? kcTu, decimal? kcDen, string soVoi)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHPK_SUDUNGDAT.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
                (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
                (String.IsNullOrEmpty(loaiDat) || w.LoaiDat.Equals(loaiDat)) &&
                (String.IsNullOrEmpty(kiHieuLoDat) || w.MaQuanHuyen.Equals(kiHieuLoDat)) &&
                (!dienTichTu.HasValue || (w.DienTich.HasValue && w.DienTich >= dienTichTu.Value)) &&
                (!dientichDen.HasValue || (w.DienTich.HasValue && w.DienTich <= dientichDen.Value)) &&
                (!kcTu.HasValue || ((soVoi.Equals("sbDaNang") && w.KhoangCach_sanbaydanang >= kcTu.Value)) ||
                (soVoi.Equals("sbChuLai") && (w.KhoangCach_sanbaychulai.HasValue && w.KhoangCach_sanbaychulai >= kcTu.Value)) ||
                (soVoi.Equals("cangKyHa") && (w.KhoangCach_cangkyha.HasValue && w.KhoangCach_cangkyha >= kcTu.Value)) ||
                (soVoi.Equals("tpHoiAn") && (w.KhoangCach_tphoian.HasValue && w.KhoangCach_tphoian >= kcTu.Value)) ||
                (soVoi.Equals("ckNamGiang") && (w.KhoangCach_cuakhaunamgiang.HasValue && w.KhoangCach_cuakhaunamgiang >= kcTu.Value)))
                &&
                (!kcDen.HasValue || ((soVoi.Equals("sbDaNang") && w.KhoangCach_sanbaydanang <= kcDen.Value)) ||
                (soVoi.Equals("sbChuLai") && (w.KhoangCach_sanbaychulai.HasValue &&  w.KhoangCach_sanbaychulai <= kcDen.Value)) ||
                (soVoi.Equals("cangKyHa") && (w.KhoangCach_cangkyha.HasValue &&  w.KhoangCach_cangkyha <= kcDen.Value)) ||
                (soVoi.Equals("tpHoiAn") && (w.KhoangCach_tphoian.HasValue &&  w.KhoangCach_tphoian <= kcDen.Value)) ||
                (soVoi.Equals("ckNamGiang") && (w.KhoangCach_cuakhaunamgiang.HasValue && w.KhoangCach_cuakhaunamgiang <= kcDen.Value)))

                )
                .Select(s => new ThongTinQHPKDTO
                {
                    OBJECTID = s.OBJECTID,
                    MaSDD = s.MaSDD,
                    KiHieuKhuDat = s.KiHieuKhuDat,
                    LoaiDat = s.LoaiDat,
                    DienTich = s.DienTich,
                    MatDoXayDung = s.MatDoXayDung,
                    TangCao = s.TangCao,
                    ChiGioiXayDung = s.ChiGioiXayDung,
                    KhoangLuiBien = s.KhoangLuiBien,
                    GhiChu = s.GhiChu,
                    ChucNang = s.ChucNang,
                    GiaiDoanQuyHoach = s.GiaiDoanQuyHoach,
                    HeSoSuDungDat = s.HeSoSuDungDat,
                    KhoangLuiChinh = s.KhoangLuiChinh,
                    MaPhuongXa = s.MaPhuongXa,
                    MaQuanHuyen = s.MaQuanHuyen,
                    KhoangCach_sanbaydanang = s.KhoangCach_sanbaydanang,
                    KhoangCach_sanbaychulai = s.KhoangCach_sanbaychulai,
                    KhoangCach_cangkyha = s.KhoangCach_cangkyha,
                    KhoangCach_TpTamky = s.KhoangCach_TpTamky,
                    KhoangCach_tphoian = s.KhoangCach_tphoian,
                    KhoangCach_cuakhaunamgiang = s.KhoangCach_cuakhaunamgiang,
                    TenDoAn = s.TenDoAn
                });
                return query.ToList();
            }
        }
    }
}
