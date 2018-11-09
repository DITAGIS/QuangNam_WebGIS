using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebGISQuangNam.DataProvider.GIS;

namespace WebGISQuangNam.Controllers
{
    public class ThongTinQHPKController : Controller
    {
        // GET: ThongTinQHPK
        public ActionResult Index()
        {
            return View();
        }

        private ThongTinQHPKDB context = new ThongTinQHPKDB();
        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult TimKiem(string maQuanHuyen, string maPhuongXa, string loaiDat, string kiHieuLoDat, decimal? dienTichTu, decimal? dientichDen,
            decimal? kcTu, decimal? kcDen, string soVoi)
        {
            try
            {
                var result = this.context.TimKiem(maQuanHuyen, maPhuongXa, loaiDat, kiHieuLoDat, dienTichTu, dientichDen, kcTu, kcDen, soVoi);
                return Json(result);
            }
            catch (Exception e)
            {

                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}