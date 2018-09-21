using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebGISQuangNam.Models.dataHelper
{


    public class DoAn
    {
        public string MaQuanHuyen { get; set; }
        public string TenQuanHuyen { get; set; }
        public List<ListDoAn> ListDoAnQuyHoach { get; set; }
    }
    public class DoAnQuyHoach
    {
        public string MaQuanHuyen { get; set; }
        public string TenQuanHuyen { get; set; }
        public List<LoaiQuyHoach> ListLoaiQuyHoach { get; set; }
    }

    public class LoaiQuyHoach
    {
        public string MaLoaiQuyHoach { get; set; }
        public string TenLoaiQuyHoach { get; set; }
        public List<ListDoAn> ListThongTinDoAn { get; set; }
    }

    public class ListDoAn
    {
        public string MaDoAn { get; set; }
        public string TenDoAn { get; set; }
    }


}