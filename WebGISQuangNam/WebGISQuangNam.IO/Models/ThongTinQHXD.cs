using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGISQuangNam.DataProvider.EF;

namespace WebAPI.IO.Models
{
    public class ThongTinQHXD
    {

        public string NgayPheDuyet { get; set; }
        public THONGTINDOAN ThongTinDoAn { get; set; }
        public QHCT_SUDUNGDAT QuyHoachChiTietSDD { get; set; }
        public ImageQHXD ImageQHXD { get; set; }
    }

    public class ImageQHXD
    {

        public string url { get; set; }
        public Nullable<decimal> xmin { get; set; }
        public Nullable<decimal> xmax { get; set; }
        public Nullable<decimal> ymin { get; set; }
        public Nullable<decimal> ymax { get; set; }      
    }
}
