using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.IO.CellPosition;
using WebAPI.IO.Models;

namespace WebAPI.IO
{
    public class ExlThongTinQHXD
    {
        public byte[] Build(string path, ThongTinQHXD model)
        {
            FileInfo fileInfo = new FileInfo(path);
            ExcelPackage p = new ExcelPackage(fileInfo);
            ExcelWorksheet myWorksheet = p.Workbook.Worksheets.First();

            if (!String.IsNullOrEmpty(model.TenDoAn))
            {
                myWorksheet.Cells[CPThongTinQHXD.TenDoAn].Value = model.TenDoAn;
            }
            if (!String.IsNullOrEmpty(model.DiaDiem))
            {
                myWorksheet.Cells[CPThongTinQHXD.DiaDiem].Value = model.DiaDiem;
            }
            if (!String.IsNullOrEmpty(model.ChuDauTu))
            {
                myWorksheet.Cells[CPThongTinQHXD.ChuDauTu].Value = model.ChuDauTu;
            }
            if (!String.IsNullOrEmpty(model.SoQuyetDinhPheDuyet))
            {
                myWorksheet.Cells[CPThongTinQHXD.SoQuyetDinhPheDuyet].Value = model.SoQuyetDinhPheDuyet;
            }
            if (!String.IsNullOrEmpty(model.NgayPheDuyet))
            {
                myWorksheet.Cells[CPThongTinQHXD.NgayPheDuyet].Value = model.NgayPheDuyet;
            }
            if (!String.IsNullOrEmpty(model.CoQuanPheDuyet))
            {
                myWorksheet.Cells[CPThongTinQHXD.CoQuanPheDuyet].Value = model.CoQuanPheDuyet;
            }
            if (!String.IsNullOrEmpty(model.LoaiQuyHoach))
            {
                string value = "(Đối với đồ án ";
                string loaiquyhoach;
                if (model.LoaiQuyHoach == "QHCT")
                {
                    loaiquyhoach = "Quy hoạch chi tiết)";
                }
                else if (model.LoaiQuyHoach == "QHC")
                {
                    loaiquyhoach = "Quy hoạch chung)";
                }
                else if (model.LoaiQuyHoach == "QHPK")
                {
                    loaiquyhoach = "Quy hoạch phân khu)";
                }
                else if (model.LoaiQuyHoach == "QHNT")
                {
                    loaiquyhoach = "Quy hoạch nông thông)";
                }
                else if (model.LoaiQuyHoach == "QHV")
                {
                    loaiquyhoach = "Quy hoạch vùng)";
                }
                else
                {
                    loaiquyhoach = "Quy hoạch khác)";
                }
                myWorksheet.Cells[CPThongTinQHXD.LoaiQuyHoach].Value = value + loaiquyhoach;
            }

            return p.GetAsByteArray();
        }
    }
}
