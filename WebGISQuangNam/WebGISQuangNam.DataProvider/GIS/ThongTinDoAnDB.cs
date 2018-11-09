namespace WebGISQuangNam.DataProvider.GIS
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using WebGISQuangNam.DataProvider.EF;
    using static WebGISQuangNam.DataProvider.GIS.Models.Model;

    /// <summary>
    /// Defines the <see cref="ThongTinDoAnDB" />
    /// </summary>
    public class ThongTinDoAnDB
    {
        /// <summary>
        /// The GetAll
        /// </summary>
        /// <returns>The <see cref="List{THONGTINDOAN}"/></returns>
        public List<THONGTINDOAN> GetAll()
        {
            using (var context = new GISEntities())
            {
                return context.THONGTINDOANs.ToList();
            }
        }

        /// <summary>
        /// The TimKiem_QHCT
        /// </summary>
        /// <param name="maQuanHuyen">The maQuanHuyen<see cref="string"/></param>
        /// <param name="maPhuongXa">The maPhuongXa<see cref="string"/></param>
        /// <param name="tenDoAn">The tenDoAn<see cref="string"/></param>
        /// <returns>The <see cref="List{QHCT_THONGTINDOANDTO}"/></returns>
        public List<ThongTinDoAnDTO> TimKiem_QHCT(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHCT_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }

        /// <summary>
        /// The TimKiem_QHC
        /// </summary>
        /// <param name="maQuanHuyen">The maQuanHuyen<see cref="string"/></param>
        /// <param name="maPhuongXa">The maPhuongXa<see cref="string"/></param>
        /// <param name="tenDoAn">The tenDoAn<see cref="string"/></param>
        /// <returns>The <see cref="List{QHC_THONGTINDOANDTO}"/></returns>
        public List<ThongTinDoAnDTO> TimKiem_QHC(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHC_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }
        public List<ThongTinDoAnDTO> TimKiem_QHPK(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHPK_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }
        public List<ThongTinDoAnDTO> TimKiem_QHV(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHV_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }
        public List<ThongTinDoAnDTO> TimKiem_QHNT(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHNT_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }
        public List<ThongTinDoAnDTO> TimKiem_Khac(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.KHAC_THONGTINDOAN.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinDoAnDTO
               {
                   OBJECTID = s.OBJECTID,
                   MaDoAn = s.MaDoAn,
                   TenDoAn = s.TenDoAn,
                   DiaDiem = s.DiaDiem,
                   DienTich = s.DienTich,
                   NgayCapNhat = s.NgayCapNhat,
                   NguoiCapNhat = s.NguoiCapNhat,
                   DonViCapNhat = s.DonViCapNhat,
                   DonViQuanLy = s.DonViQuanLy,
                   GhiChu = s.GhiChu,
                   KiHieuKhuVuc = s.KiHieuKhuVuc,
                   ChuDauTu = s.ChuDauTu,
                   SoQuyetDinhPheDuyet = s.SoQuyetDinhPheDuyet,
                   NgayPheDuyet = s.NgayPheDuyet,
                   CoQuanPheDuyet = s.CoQuanPheDuyet,
                   MaQuanHuyen = s.MaQuanHuyen,
                   MaPhuongXa = s.MaPhuongXa,
                   LoaiQuyHoach = s.LoaiQuyHoach,
                   TrangThaiDoAn = s.TrangThaiDoAn
               });
                return query.ToList();

            }
        }
        /// <summary>
        /// The TimKiem
        /// </summary>
        /// <param name="maQuanHuyen">The maQuanHuyen<see cref="string"/></param>
        /// <param name="maPhuongXa">The maPhuongXa<see cref="string"/></param>
        /// <param name="loaiQuyHoach">The loaiQuyHoach<see cref="string"/></param>
        /// <param name="tenDoAn">The tenDoAn<see cref="string"/></param>
        /// <returns>The <see cref="List{ThongTinDoAnDTO}"/></returns>
        public List<ThongTinDoAnDTO> TimKiem(string maQuanHuyen, string maPhuongXa, string loaiQuyHoach, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                if (loaiQuyHoach == "QHCT")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_QHCT(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else if (loaiQuyHoach == "QHPK")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_QHPK(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else if (loaiQuyHoach == "QHC")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_QHC(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else if (loaiQuyHoach == "QHNT")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_QHNT(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else if (loaiQuyHoach == "KHAC")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_Khac(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else if (loaiQuyHoach == "QHV")
                {
                    List<ThongTinDoAnDTO> result = this.TimKiem_QHV(maQuanHuyen, maPhuongXa, tenDoAn);
                    return (result);
                }
                else
                {
                    List<ThongTinDoAnDTO> chung_ThongTinDoAn = new List<ThongTinDoAnDTO>();

                    List<ThongTinDoAnDTO> khac_ThongTinDoAn = TimKiem_Khac(maQuanHuyen, maPhuongXa, tenDoAn);
                    List<ThongTinDoAnDTO> qhc_ThongTinDoAn = TimKiem_QHC(maQuanHuyen, maPhuongXa, tenDoAn);
                    List<ThongTinDoAnDTO> hqct_ThongTinDoAn = TimKiem_QHCT(maQuanHuyen, maPhuongXa, tenDoAn);
                    List<ThongTinDoAnDTO> qhpk_ThongTinDoAn = TimKiem_QHPK(maQuanHuyen, maPhuongXa, tenDoAn);
                    List<ThongTinDoAnDTO> qhnt_ThongTinDoAn = TimKiem_QHNT(maQuanHuyen, maPhuongXa, tenDoAn);
                    List<ThongTinDoAnDTO> qhv_ThongTinDoAn = TimKiem_QHV(maQuanHuyen, maPhuongXa, tenDoAn);

                    chung_ThongTinDoAn.AddRange(khac_ThongTinDoAn);
                    chung_ThongTinDoAn.AddRange(qhc_ThongTinDoAn);
                    chung_ThongTinDoAn.AddRange(hqct_ThongTinDoAn);
                    chung_ThongTinDoAn.AddRange(qhpk_ThongTinDoAn);
                    chung_ThongTinDoAn.AddRange(qhnt_ThongTinDoAn);
                    chung_ThongTinDoAn.AddRange(qhv_ThongTinDoAn);

                    return chung_ThongTinDoAn;
                }

            }

        }
    }
}
