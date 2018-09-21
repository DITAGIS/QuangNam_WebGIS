namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    
    public class THONGTINDOAN
    {
        public string MaDoAn { get; set; }
        public string TenDoAn { get; set; }
        public string DiaDiem { get; set; }
        public decimal? DienTich { get; set; }
        public DateTime? NgayCapNhat { get; set; }
        public string NguoiCapNhat { get; set; }
        public string DonViCapNhat { get; set; }
        public string DonViQuanLy { get; set; }
        public string GhiChu { get; set; }
        public string KiHieuKhuVuc { get; set; }
        public string ChuDauTu { get; set; }
        public string SoQuyetDinhPheDuyet { get; set; }
        public DateTime? NgayPheDuyet { get; set; }
        public string CoQuanPheDuyet { get; set; }
        public string MaQuanHuyen { get; set; }
        public string MaPhuongXa { get; set; }
        public string LoaiQuyHoach { get; set; }
        public string TrangThaiDoAn { get; set; }
    }
}
