using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.IO.Models
{
    public class ThongTinQHXD
    {
        public string TenDoAn { get; set; }
        public string DiaDiem { get; set; }
        public ThongTinLoDat ThongTinLoDat { get; set; }
    }
}
