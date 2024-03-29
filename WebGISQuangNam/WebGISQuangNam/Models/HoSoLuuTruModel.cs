﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebGISQuangNam.Models.dataHelper;

namespace WebGISQuangNam.Models
{
    public class HoSoLuuTruModel
    {
        public IEnumerable<HoSoLuuTru> HoSoLuuTrus { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public string fillterID { get; set; }
        public string strSearch { get; set; }
        public int? sort { get; set; }
        public bool isAsc { get; set; }
    }
}