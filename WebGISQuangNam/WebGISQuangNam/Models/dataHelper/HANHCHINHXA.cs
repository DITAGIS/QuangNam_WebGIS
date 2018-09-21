namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    
    public class HANHCHINHXA
    {
        public string IDHanhChinh { get; set; }        
        public string IDHuyen { get; set; }
        public string TenHanhChinh { get; set; }
    }
}
