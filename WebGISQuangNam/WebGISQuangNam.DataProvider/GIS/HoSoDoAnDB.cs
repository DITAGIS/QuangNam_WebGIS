using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGISQuangNam.DataProvider.EF;
using static WebGISQuangNam.DataProvider.GIS.Models.Model;

namespace WebGISQuangNam.DataProvider.GIS
{
    public class HoSoDoAnDB
    {
        public List<HoSoDoAn> GetAll()
        {
            using (var context = new GISEntities())
            {
                return context.HoSoDoAns.ToList();
            }
        }

        public List<HoSoDoAnDTO> TimKiem(string maDoAn)
        {
            using (var context = new GISEntities())
            {
                var query = context.HoSoDoAns.Where(w => w.MaDoAn.Equals(maDoAn))
                .Select(s => new HoSoDoAnDTO
                {
                    id = s.id,
                    MaDoAn = s.MaDoAn,
                    TenHoSo = s.TenHoSo,
                    LoaiHoSo = s.LoaiHoSo,
                    DinhDangHoSo = s.DinhDangHoSo,
                    DuongDan = s.DuongDan
                });
                return query.ToList();
                
            }
        }
    }
}
