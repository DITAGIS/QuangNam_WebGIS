using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGISQuangNam.DataProvider.EF;
using static WebGISQuangNam.DataProvider.GIS.Models.Model;

namespace WebGISQuangNam.DataProvider.GIS
{
    public class ThongTinQHCTDB
    {
        public List<ThongTinQHCTDTO> TimKiem(string maQuanHuyen, string maPhuongXa, string loaiDat,string kiHieuKhuDat,string kiHieuLoDat, string tenDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.QHCT_SUDUNGDAT.Where(w =>
                (String.IsNullOrEmpty(maQuanHuyen) || w.MaQuanHuyen.Equals(maQuanHuyen)) &&
               (String.IsNullOrEmpty(maPhuongXa) || w.MaPhuongXa.Equals(maPhuongXa)) &&
               (String.IsNullOrEmpty(loaiDat) || w.LoaiDat.Equals(loaiDat))&&
               (String.IsNullOrEmpty(kiHieuKhuDat) || w.KiHieuKhuDat.Equals(kiHieuKhuDat)) &&
               (String.IsNullOrEmpty(kiHieuLoDat) || w.KiHieuLoDat.Equals(kiHieuLoDat)) &&
               (String.IsNullOrEmpty(tenDoAn) || w.TenDoAn.Equals(tenDoAn))
               )
               .Select(s => new ThongTinQHCTDTO
               {
                   OBJECTID =  s.OBJECTID,
                   MaSDD =  s.MaSDD,
                   KiHieuKhuDat =  s.KiHieuKhuDat,
                   KiHieuLoDat =  s.KiHieuLoDat,
                   LoaiDat =  s.LoaiDat,
                   DienTichKhuDat =  s.DienTichKhuDat,
                   MatDoXayDung =  s.MatDoXayDung,
                   TangCao =  s.TangCao,
                   ChiGioiXayDung =  s.ChiGioiXayDung,
                   KhoangLuiBien =  s.KhoangLuiBien,
                   GhiChu =  s.GhiChu,
                   ChucNang =  s.ChucNang,
                   GiaiDoanQuyHoach =  s.GiaiDoanQuyHoach,
                   KhoangLuiChinh =  s.KhoangLuiChinh,
                   DienTichLoDat =  s.DienTichLoDat,
                   MaQuanHuyen =  s.MaQuanHuyen,
                   MaPhuongXa =  s.MaPhuongXa,
                   TenDoAn =  s.TenDoAn,
                   HeSoSuDungDat =  s.HeSoSuDungDat
               });

                return query.ToList();

            }
        }

    }
}
