using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebAPI.IO.CellPosition;
using WebAPI.IO.Models;

namespace WebAPI.IO
{
    public class ExlThongTinQHXD
    {
        private ExcelWorksheet myWorksheet;

        public object MsoTriState { get; private set; }

        public byte[] Build(string path, ThongTinQHXD model)
        {
            FileInfo fileInfo = new FileInfo(path);
            ExcelPackage p = new ExcelPackage(fileInfo);
            this.myWorksheet = p.Workbook.Worksheets.First();

            setFieldValueExcel(THONGTINDOAN.TenDoAn, model.ThongTinDoAn.TenDoAn);
            setFieldValueExcel(THONGTINDOAN.DiaDiem, model.ThongTinDoAn.DiaDiem);
            setFieldValueExcel(THONGTINDOAN.ChuDauTu, model.ThongTinDoAn.ChuDauTu);
            setFieldValueExcel(THONGTINDOAN.NgayPheDuyet, model.NgayPheDuyet);
            setFieldValueExcel(THONGTINDOAN.SoQuyetDinhPheDuyet, model.ThongTinDoAn.SoQuyetDinhPheDuyet);
            setFieldValueExcel(THONGTINDOAN.NgayPheDuyet, model.ThongTinDoAn.NgayPheDuyet.ToString());
            setFieldValueExcel(THONGTINDOAN.CoQuanPheDuyet, model.ThongTinDoAn.CoQuanPheDuyet);
            setFieldValueExcel(QHCT_SUDUNGDAT.KiHieuLoDat, model.QuyHoachChiTietSDD.KiHieuLoDat);
            setFieldValueExcel(QHCT_SUDUNGDAT.KiHieuKhuDat, model.QuyHoachChiTietSDD.KiHieuKhuDat);
            setFieldValueExcel(QHCT_SUDUNGDAT.LoaiDat, model.QuyHoachChiTietSDD.LoaiDat);
            setFieldValueExcel(QHCT_SUDUNGDAT.ChucNang, model.QuyHoachChiTietSDD.ChucNang);
            setFieldValueExcel(QHCT_SUDUNGDAT.GiaiDoanQuyHoach, model.QuyHoachChiTietSDD.GiaiDoanQuyHoach);
            setFieldValueExcel(QHCT_SUDUNGDAT.DienTichLoDat, model.QuyHoachChiTietSDD.DienTichLoDat);
            setFieldValueExcel(QHCT_SUDUNGDAT.MatDoXayDung, model.QuyHoachChiTietSDD.MatDoXayDung);
            setFieldValueExcel(QHCT_SUDUNGDAT.TangCao, model.QuyHoachChiTietSDD.TangCao);
            setFieldValueExcel(QHCT_SUDUNGDAT.KhoangLuiChinh, model.QuyHoachChiTietSDD.KhoangLuiChinh);
            setFieldValueExcel(QHCT_SUDUNGDAT.KhoangLuiBien, model.QuyHoachChiTietSDD.KhoangLuiBien);
            setFieldValueExcel(QHCT_SUDUNGDAT.HeSoSuDungDat, model.QuyHoachChiTietSDD.HeSoSuDungDat);

            
            int rowIndex = 7;
            int colIndex = 3;

            int Height = 235;
            int Width = 525;
            WebClient wc = new WebClient();
            string bbox = null;
            if(model.ImageQHXD.url != null  && model.ImageQHXD.xmin != null && model.ImageQHXD.xmin != null && model.ImageQHXD.xmax != null && model.ImageQHXD.ymax != null)
            {
                bbox = model.ImageQHXD.xmin + "," + model.ImageQHXD.ymin + "," + model.ImageQHXD.xmax + "," + model.ImageQHXD.ymax;
                string url = model.ImageQHXD.url + "/export?bbox=" + bbox + "&bboxSR=102100&imageSR=102100&size=1366%2C573&f=image&size=1366%2C573";
                byte[] bytes = wc.DownloadData(url);
                MemoryStream ms = new MemoryStream(bytes);
                Image img = Image.FromStream(ms);
                ExcelPicture pic = this.myWorksheet.Drawings.AddPicture("Sample", img);
                pic.SetPosition(rowIndex, 0, colIndex, 0);
                pic.SetSize(Width, Height);
                this.myWorksheet.Protection.IsProtected = false;
                this.myWorksheet.Protection.AllowSelectLockedCells = false;
            }
             
            return p.GetAsByteArray();
        }
        private void setFieldValueExcel(string field, string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                this.myWorksheet.Cells[field].Value = value;
            }
            
        }
    }
}
