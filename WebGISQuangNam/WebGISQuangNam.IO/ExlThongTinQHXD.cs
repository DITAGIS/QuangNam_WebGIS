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

            return p.GetAsByteArray();
        }
    }
}
