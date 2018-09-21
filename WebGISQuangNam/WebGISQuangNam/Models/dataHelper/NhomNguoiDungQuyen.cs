namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("sde.NhomNguoiDungQuyen")]
    public partial class NhomNguoiDungQuyen
    {
        public int ID { get; set; }

        public int NhomNguoiDung { get; set; }

        public bool QuanLyNguoiDung { get; set; }

        public bool CapNhatDuLieu { get; set; }

        public bool LuuTruHoSo { get; set; }

        public bool QuanLyYKienNguoiDung { get; set; }

        public virtual NhomNguoiDung NhomNguoiDung1 { get; set; }
    }
}
