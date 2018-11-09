using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebGISQuangNam.DataProvider.GIS;

namespace WebGISQuangNam.Controllers
{
    public class HoSoDoAnController : Controller
    {
        // GET: HoSoDoAn
        public ActionResult Index()
        {
            return View();
        }

        private HoSoDoAnDB context = new HoSoDoAnDB();
        public ActionResult TimKiem(string maDoAn)
        {
            try
            {
                var result = this.context.TimKiem(maDoAn);
                return Json(result);
            }
            catch (Exception e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
                throw;
            }
        }
    }
}