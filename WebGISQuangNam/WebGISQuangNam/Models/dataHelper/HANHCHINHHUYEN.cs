namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("sde.HANHCHINHHUYEN")]
    public partial class HANHCHINHHUYEN
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int OBJECTID { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? DienTich { get; set; }

        [StringLength(10)]
        public string MaHuyen { get; set; }

        [StringLength(50)]
        public string TenQuan { get; set; }

        public DbGeometry SHAPE { get; set; }
    }
}
