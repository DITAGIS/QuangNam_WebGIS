using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebGISQuangNam.DataProvider.GIS;

namespace WebGISQuangNam.Controllers
{
    public class ThongTinQHCTController : Controller
    {
        private ThongTinQHCTDB context = new ThongTinQHCTDB();
        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult TimKiem(string maQuanHuyen, string maPhuongXa, string loaiDat, string kiHieuKhuDat, string kiHieuLoDat, string tenDoAn)
        {
            try
            {
                var result = this.context.TimKiem(maQuanHuyen, maPhuongXa, loaiDat, kiHieuKhuDat, kiHieuLoDat, tenDoAn);
                return Json(result);
            }
            catch (Exception e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }
        // GET: ThongTinQHCT
        public ActionResult Index()
        {
            return View();
        }
    }
}