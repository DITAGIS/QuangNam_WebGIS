namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("sde.NguoiDung")]
    public partial class NguoiDung
    {
        public int ID { get; set; }

        [Required]
        [StringLength(50)]
        public string TenNguoiDung { get; set; }

        [Required]
        [StringLength(150)]
        public string MatKhau { get; set; }

        public int NhomNguoiDung { get; set; }

        public virtual NhomNguoiDung NhomNguoiDung1 { get; set; }
    }

    public class NguoiDungDetails
    {

        public int ID { get; set; }
        public string TenNguoiDung { get; set; }
        public string MatKhau { get; set; }
        public int NhomNguoiDung { get; set; }
        public string TenNhomNguoiDung { get; set; }

        public bool QuanLyNguoiDung { get; set; }

        public bool CapNhatDuLieu { get; set; }

        public bool LuuTruHoSo { get; set; }

        public bool QuanLyYKienNguoiDung { get; set; }

    }



}
