using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebGISQuangNam.Models.dataHelper
{
    public class khaoSatNguoiDung
    {
        private List<CartLine> lineCollection = new List<CartLine>();

        public void AddItem(HoSoDoAn hoso, string yKien)
        {
            CartLine line = lineCollection.Where(p => p.HoSo.id == hoso.id).FirstOrDefault();

            if (line == null)
            {
                lineCollection.Add(new CartLine { HoSo = hoso,  yKien= yKien });
            }
            else
            {
                line.yKien += "\n" + yKien;
            }

        }

        public void RemoveLine(HoSoDoAn hoso) { lineCollection.RemoveAll(l => l.HoSo.id == hoso.id); }
        
        public void Clear() { lineCollection.Clear(); }

        public IEnumerable<CartLine> Lines { get { return lineCollection; } }
    }

    public class CartLine {
        public HoSoDoAn HoSo { get; set; }
        public string yKien { get; set; }
    }


}