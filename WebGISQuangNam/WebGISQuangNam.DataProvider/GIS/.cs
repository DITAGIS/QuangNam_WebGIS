using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGISQuangNam.DataProvider.EF;
using static WebGISQuangNam.DataProvider.GIS.Models.Model;

namespace WebGISQuangNam.DataProvider.GIS
{
    class QHC_THONGTINDOANDB
    {

        public List<QHC_THONGTINDOANDTO> TimKiem_QHC(string maQuanHuyen, string maPhuongXa, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.THONGTINDOANs.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new QHC_THONGTINDOANDTO
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
    }
}
