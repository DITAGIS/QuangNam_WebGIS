using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebGISQuangNam.Models;
using WebGISQuangNam.Models.dataHelper;

namespace WebGISQuangNam.Controllers
{
    [Authorize]
    public class QuanLyController : Controller
    {
        private DataGISContext db = new DataGISContext();

        private IGISRepository gISRepository;
        private string DomainName = "";
        private ControllerHelper controllerHelper;

        public QuanLyController(IGISRepository gISRepository)
        {
            this.gISRepository = gISRepository;
            DomainName = System.Web.HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            controllerHelper = new ControllerHelper();

        }

        // GET: QuanLy
        public ActionResult Index(string FillterID = "", string SearchString = "", int sortBy = 0, bool isAsc = true, int PageSize = 10, int page = 1)
        {
            List<YKienQuyHoachUser> ListHoSo = this.gISRepository.getYKienQuyHoachUser();

            if (FillterID.Trim().Length > 0)
            {
                ListHoSo = ListHoSo.Where(hs => hs.MaDoAn == FillterID).ToList();
            }
            if (SearchString.Trim().Length > 0)
            {
                ListHoSo = ListHoSo.Where(hs => hs.TenDoAn.Contains(SearchString)).ToList();
            }

            switch (sortBy)
            {
                case 1:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.TenToChu).ToList();
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.TenToChu).ToList();
                    }
                    break;
                case 2:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.TenDoAn).ToList();
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.TenDoAn).ToList();
                    }
                    break;
                case 3:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.NgayLuu).ToList();
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.NgayLuu).ToList();
                    }
                    break;
                case 4:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.TrangThai).ToList();
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.TrangThai).ToList();
                    }
                    break;
                default: // mặc đinh sắp xếp theo ID
                    ListHoSo = ListHoSo.OrderBy(s => s.id).ToList();
                    break;
            }

            int totalItem;

            totalItem = ListHoSo.Count();
            ListHoSo = ListHoSo.Skip((page - 1) * PageSize).Take(PageSize).ToList();

            YKienQuyHoachModel hoso = new YKienQuyHoachModel
            {
                YKienQuyHoachs = ListHoSo,
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = totalItem
                },
                fillterID = FillterID,
                isAsc = isAsc,
                sort = sortBy,
                strSearch = SearchString
            };


            ViewBag.LoaiHoSo = new SelectList(this.gISRepository.getDoAnYKienQuyHoach(), "MaDoAn", "TenDoAn", FillterID); ;

            return View(hoso);
        }

        // GET: QuanLy/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            YKienQuyHoach yKienQuyHoach = db.YKienQuyHoachs.Find(id);
            if (yKienQuyHoach == null)
            {
                return HttpNotFound();
            }
            return View(yKienQuyHoach);
        }
              
        // GET: QuanLy/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            YKienQuyHoach yKienQuyHoach = db.YKienQuyHoachs.Find(id);
            if (yKienQuyHoach == null)
            {
                return HttpNotFound();
            }
            //ViewBag.Ten = this.gISRepository.getThongTinDoAn().Where(da => da.MaDoAn == yKienQuyHoach.MaDoAn).FirstOrDefault().TenDoAn;
            return View(yKienQuyHoach);
        }

        // POST: QuanLy/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,TenToChu,DiaChi,DienThoai,Email,NoiDungGopY,MaDoAn,NgayLuu,TrangThai,NoiDungTraLoi")] YKienQuyHoach yKienQuyHoach)
        {
            if (ModelState.IsValid)
            {
                db.Entry(yKienQuyHoach).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            //ViewBag.Ten = this.gISRepository.getThongTinDoAn().Where(da => da.MaDoAn == yKienQuyHoach.MaDoAn).FirstOrDefault().TenDoAn;

            return View(yKienQuyHoach);
        }

        // GET: QuanLy/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            YKienQuyHoach yKienQuyHoach = db.YKienQuyHoachs.Find(id);
            if (yKienQuyHoach == null)
            {
                return HttpNotFound();
            }
           // ViewBag.Ten = this.gISRepository.getThongTinDoAn().Where(da => da.MaDoAn == yKienQuyHoach.MaDoAn).FirstOrDefault().TenDoAn;

            return View(yKienQuyHoach);
        }

        // POST: QuanLy/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            YKienQuyHoach yKienQuyHoach = db.YKienQuyHoachs.Find(id);
            db.YKienQuyHoachs.Remove(yKienQuyHoach);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
