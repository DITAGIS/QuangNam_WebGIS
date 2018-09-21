namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    
    public class QHPK_SUDUNGDAT
    {
        public int OBJECTID { get; set; }
        
        public string MaSDD { get; set; }
        public string KiHieuKhuDat { get; set; }
        public string LoaiDat { get; set; }
        public decimal? DienTich { get; set; }
        public string MatDoXayDung { get; set; }
        public string TangCao { get; set; }
        public string ChiGioiXayDung { get; set; }
        public string KhoangLuiBien { get; set; }
        public string GhiChu { get; set; }
        public string ChucNang { get; set; }
        public string GiaiDoanQuyHoach { get; set; }
        public string HeSoSuDungDat { get; set; }
        public string KhoangLuiChinh { get; set; }
        public string MaQuanHuyen { get; set; }
        public string MaPhuongXa { get; set; }
        public decimal? KhoangCach_sanbaydanang { get; set; }
        public decimal? KhoangCach_sanbaychulai { get; set; }
        public decimal? KhoangCach_cangkyha { get; set; }
        public decimal? KhoangCach_TpTamky { get; set; }
        public decimal? KhoangCach_tphoian { get; set; }
        public decimal? KhoangCach_cuakhaunamgiang { get; set; }
        public string TenDoAn { get; set; }
    }
}
