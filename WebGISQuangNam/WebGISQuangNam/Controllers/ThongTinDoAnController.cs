﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using WebAPI.IO;
using WebAPI.IO.Models;
using WebGISQuangNam.DataProvider.GIS;
using WebGISQuangNam.DataProvider.EF;
using static WebGISQuangNam.DataProvider.GIS.Models.Model;

namespace WebGISQuangNam.Controllers
{
    [AllowAnonymous]
    public class ThongTinDoAnController : Controller
    {
        private ThongTinDoAnDB context = new ThongTinDoAnDB();
        private ThongTinQHCTDB thongTinQHCTDB = new ThongTinQHCTDB();
        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult TimKiem(string maQuanHuyen, string maPhuongXa, string loaiQuyHoach, string tenDoAn)
        {
            try
            {
                List<ThongTinDoAnDTO> result = this.context.TimKiem(maQuanHuyen, maPhuongXa, loaiQuyHoach, tenDoAn);
                return Json(result);
            }
            catch (Exception e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [AllowAnonymous]
        public ActionResult XuatPhieu(ThongTinQHXD thongTinQHXD,QHCT_SUDUNGDAT quyHoachChiTietSDD, THONGTINDOAN thongTinDoAn, ImageQHXD imageQHXD)
        {
            thongTinQHXD.ThongTinDoAn = thongTinDoAn;
            thongTinQHXD.QuyHoachChiTietSDD = quyHoachChiTietSDD;
            thongTinQHXD.ImageQHXD = imageQHXD;
            var io = new ExlThongTinQHXD();
            var path = HostingEnvironment.ApplicationPhysicalPath + @"/Resources/MauPhieu/MauPhieuThongTin_GIS.xlsx";
            HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
            return File(io.Build(path, thongTinQHXD), System.Net.Mime.MediaTypeNames.Application.Octet, "report.xlsx");
        }

    }
}