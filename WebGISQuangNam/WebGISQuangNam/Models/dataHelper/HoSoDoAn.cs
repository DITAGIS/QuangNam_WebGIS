using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebGISQuangNam.Models.dataHelper
{
    [Table("sde.HoSoDoAn")]
    public class HoSoDoAn
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [StringLength(50)]
        public string MaDoAn { get; set; }

        [StringLength(500)]
        public string TenHoSo { get; set; }

        [StringLength(50)]
        public string LoaiHoSo { get; set; }

        [StringLength(50)]
        public string DinhDangHoSo { get; set; }

        [StringLength(500)]
        public string DuongDan { get; set; }
        

    }
}