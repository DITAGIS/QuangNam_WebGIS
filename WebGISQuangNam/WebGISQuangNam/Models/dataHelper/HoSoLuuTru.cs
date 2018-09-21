using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebGISQuangNam.Models.dataHelper
{
    [Table("sde.HoSoLuuTru")]
    public class HoSoLuuTru
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [StringLength(50)]
        public string NguoiDung { get; set; }

        [StringLength(500)]
        public string TenHoSo { get; set; }
        [StringLength(500)]
        public string TenDinhDanh { get; set; }

        [StringLength(50)]
        public string LoaiHoSo { get; set; }        

        [StringLength(500)]
        public string GhiChu { get; set; }
        [StringLength(500)]
        public string DuongDan { get; set; }

    }

    public class loaihosoData
    {
        public string loaihoso { get; set; }
    }



}