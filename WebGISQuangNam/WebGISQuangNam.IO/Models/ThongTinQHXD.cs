using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.IO.Models
{
    public class ThongTinQHXD
    {
        public string LoaiQuyHoach { get; set; }
        public string TenDoAn { get; set; }
        public string DiaDiem { get; set; }
        public string ChuDauTu { get; set; }
        public string SoQuyetDinhPheDuyet { get; set; }
        public string NgayPheDuyet { get; set; }
        public string CoQuanPheDuyet { get; set; }
        public ThongTinLoDat ThongTinLoDat { get; set; }
    }
}
