using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Security;
using WebGISQuangNam.DataProvider.GIS;
using WebGISQuangNam.Models;
using WebGISQuangNam.Models.dataHelper;

namespace WebGISQuangNam.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {

        private IGISRepository gISRepository;
        private string DomainName = "";
        private ControllerHelper controllerHelper;
        public HomeController(IGISRepository gISRepository)
        {
            this.gISRepository = gISRepository;
            DomainName = System.Web.HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            controllerHelper = new ControllerHelper();

        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            ///////
            //ViewBag.TTQH_control = controllerHelper.getLoaiQuyHoachByHanhChinh("ThucTe");
            //ViewBag.TTQH_control_LayYKien = controllerHelper.getLoaiQuyHoachByHanhChinh("LayYKien");
            //ViewBag.TTQH_control_CongBo = controllerHelper.getLoaiQuyHoachByHanhChinh("CongBo");

            //

            ViewBag.QuanHuyen = this.gISRepository.getHanhChinhHuyen().OrderBy(qh => qh.TenQuan).ToList();
            ViewBag.TenDoAn = this.gISRepository.getListTenDoAn().ToList();

            //List<Domain> quan = this.gISRepository.getDomain("DMHuyenTPThiXa").ToList().OrderBy(dm => dm.value).ToList();

            //for(int i = 0; i < quan.Count; i++)
            //{
            //    string str = quan[i].code;
            //    if(str == "500")
            //    {
            //        quan.RemoveAt(i);
            //        break;
            //    }
            //}
            //Domain item = new Domain();
            //item.code = "500";
            //item.value = "Tỉnh Quảng Nam";
            //quan.Insert(0, item);

            List<Domain> quan = new List<Domain>();
            Domain item;
            item = new Domain();
            item.code = "500";
            item.value = "Tỉnh Quảng Nam";
            quan.Insert(0, item);

            item = new Domain();
            item.code = "502";
            item.value = "Thành Phố Tam Kỳ";
            quan.Insert(1, item);

            item = new Domain();
            item.code = "503";
            item.value = "Thành Phố Hội An";
            quan.Insert(2, item);

            item = new Domain();
            item.code = "504";
            item.value = "Huyện Tây Giang";
            quan.Insert(3, item);

            item = new Domain();
            item.code = "505";
            item.value = "Huyện Đông Giang";
            quan.Insert(4, item);

            item = new Domain();
            item.code = "506";
            item.value = "Huyện Đại Lộc";
            quan.Insert(5, item);

            item = new Domain();
            item.code = "507";
            item.value = "Thị Xã Điện Bàn";
            quan.Insert(6, item);

            item = new Domain();
            item.code = "508";
            item.value = "Huyện Duy Xuyên";
            quan.Insert(7, item);

            item = new Domain();
            item.code = "509";
            item.value = "Huyện Quế Sơn";
            quan.Insert(8, item);

            item = new Domain();
            item.code = "510";
            item.value = "Huyện Nam Giang";
            quan.Insert(9, item);

            item = new Domain();
            item.code = "511";
            item.value = "Huyện Phước Sơn";
            quan.Insert(10, item);

            item = new Domain();
            item.code = "512";
            item.value = "Huyện Hiệp Đức";
            quan.Insert(11, item);

            item = new Domain();
            item.code = "513";
            item.value = "Huyện Thăng Bình";
            quan.Insert(12, item);

            item = new Domain();
            item.code = "514";
            item.value = "Huyện Tiên Phước";
            quan.Insert(13, item);

            item = new Domain();
            item.code = "515";
            item.value = "Huyện Bắc Trà My";
            quan.Insert(14, item);

            item = new Domain();
            item.code = "516";
            item.value = "Huyện Nam Trà My";
            quan.Insert(15, item);

            item = new Domain();
            item.code = "517";
            item.value = "Huyện Núi Thành";
            quan.Insert(16, item);

            item = new Domain();
            item.code = "518";
            item.value = "Huyện Phú Ninh";
            quan.Insert(17, item);

            item = new Domain();
            item.code = "519";
            item.value = "Huyện Nông Sơn";
            quan.Insert(18, item);


            ViewBag.listQuanHuyen = quan;// this.gISRepository.getDomain("DMHuyenTPThiXa").ToList().OrderBy(dm => dm.value).ToList();
            ViewBag.DMLoaiQuyHoach = this.gISRepository.getDomain("DMLoaiQuyHoach").ToList();
            ViewBag.link = WebConfigurationManager.AppSettings["linkWebsiteQuanLyHoSo"];

            ViewBag.DMLoaiDat = this.gISRepository.getDomain("DMLoaiDat").ToList();

            ///////
            return View();
        }

        [AllowAnonymous]
        public ActionResult LayYKien(string madoan)
        {
            if (madoan == null)
            {
                return RedirectToAction("Index");
            }
            if (madoan.Trim().Length == 0)
            {
                return RedirectToAction("Index");
            }
            THONGTINDOAN doan = this.gISRepository.getThongTinDoAn().Where(da => da.MaDoAn == madoan).FirstOrDefault();

            if (doan == null)
            {
                return RedirectToAction("Index");
            }

            ViewBag.DoAn = doan;
            ViewBag.HoSoDuAn = this.gISRepository.getHoSoDoAn().Where(hs => hs.MaDoAn == madoan).OrderBy(hs => hs.LoaiHoSo).ToList();

            YKienQuyHoach ykien;
            ykien = new YKienQuyHoach();
            ykien.MaDoAn = doan.MaDoAn;
            return View(ykien);

        }

        public ActionResult QuanLyLuuTruQuyHoach()
        {
            if (User.Identity != null && Request.IsAuthenticated)
            {

                List<NguoiDungDetails> detail = this.gISRepository.getNguoiDungDetails().Where(nd => nd.LuuTruHoSo == true).ToList();

                return View(detail);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult LuuTruQuyHoach(string FillterID = "", string SearchString = "", int sortBy = 0, bool isAsc = true, int PageSize = 10, int page = 1)
        {
            if (User.Identity == null || Request.IsAuthenticated == false)
            {
                return RedirectToAction("Login", "Home");
            }

            string user = User.Identity.Name;

            var ListHoSo = this.gISRepository.getHoSoLuuTru().Where(hs => hs.NguoiDung == user);

            if (FillterID.Trim().Length > 0)
            {
                ListHoSo = ListHoSo.Where(hs => hs.LoaiHoSo == FillterID);
            }
            if (SearchString.Trim().Length > 0)
            {
                ListHoSo = ListHoSo.Where(hs => hs.TenHoSo.Contains(SearchString));
            }

            switch (sortBy)
            {
                case 1:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.TenHoSo);
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.TenHoSo);
                    }
                    break;
                case 2:
                    if (isAsc)
                    {
                        ListHoSo = ListHoSo.OrderBy(s => s.LoaiHoSo);
                    }
                    else
                    {
                        ListHoSo = ListHoSo.OrderByDescending(s => s.LoaiHoSo);
                    }
                    break;
                default: // mặc đinh sắp xếp theo ID
                    ListHoSo = ListHoSo.OrderBy(s => s.id);
                    break;
            }

            int totalItem;

            totalItem = ListHoSo.Count();
            ListHoSo = ListHoSo.Skip((page - 1) * PageSize).Take(PageSize);

            HoSoLuuTruModel hoso = new HoSoLuuTruModel
            {
                HoSoLuuTrus = ListHoSo,
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


            ViewBag.LoaiHoSo = new SelectList(this.gISRepository.getLoaiHoSo(user), "loaihoso", "loaihoso", FillterID);
            ViewBag.link = WebConfigurationManager.AppSettings["linkWebsiteQuanLyHoSo"];
            return View(hoso);
        }

        public ActionResult ThemHoSo()
        {
            if (User.Identity == null || Request.IsAuthenticated == false)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        [HttpPost]
        public ActionResult ThemHoSo(FormCollection collection, HttpPostedFileBase TenDinhDanh)
        {
            if (User.Identity == null || Request.IsAuthenticated == false)
            {
                return RedirectToAction("Login", "Home");
            }

            string tenDinhDanhSystem = "";
            string id = User.Identity.Name + "" + DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day + ""
                        + DateTime.Now.Hour + "" + DateTime.Now.Minute + "" + DateTime.Now.Second;

            string name = User.Identity.Name;
            string LoaiHoSo;

            if (TenDinhDanh != null)
            {
                if (TenDinhDanh.FileName != "" && TenDinhDanh.ContentLength > 0)//500kb
                {
                    string link = WebConfigurationManager.AppSettings["linkWebsiteQuanLyHoSo"];
                    string path = link + "/QuanLyHoSo/" + name + "/";

                    if (Directory.Exists(path) == false)
                    {
                        htmlHelper.createFolder(name);
                    }

                    tenDinhDanhSystem = id + Path.GetFileName(TenDinhDanh.FileName);
                    var filePath = path + tenDinhDanhSystem;
                    TenDinhDanh.SaveAs(Server.MapPath(filePath));

                    string[] doc = tenDinhDanhSystem.Split('.');

                    LoaiHoSo = doc[doc.Length - 1];

                    HoSoLuuTru hoso = new HoSoLuuTru();
                    hoso.NguoiDung = name;
                    hoso.DuongDan = filePath;
                    hoso.LoaiHoSo = LoaiHoSo;
                    hoso.TenDinhDanh = tenDinhDanhSystem;
                    hoso.TenHoSo = collection["txtHoSo"].ToString();
                    hoso.GhiChu = collection["txtGhiChu"].ToString();

                    string str = this.gISRepository.saveHoSoLuuTru(hoso);

                    if (str.Trim().Length > 0)
                    {
                        ViewBag.message = "Hệ thống đang quá tải. Vui lòng thử lại lúc khác";
                    }
                    else
                    {
                        ViewBag.message = "Đã lưu hồ sơ thành công";
                    }

                }
                else
                {
                    ViewBag.message = "Bạn chưa chọn hồ sơ để lưu vào hệ thống";
                }
            }
            else
            {
                ViewBag.message = "Bạn chưa chọn hồ sơ để lưu vào hệ thống";
            }

            return View();
        }


        public ActionResult XoaHoSo(int id)
        {
            if (User.Identity == null || Request.IsAuthenticated == false)
            {
                return RedirectToAction("Login", "Home");
            }

            string str = this.gISRepository.deleteHoSoLuuTru(id);

            if (str.Trim().Length > 0)
            {
                ViewBag.message = "Hệ thống đang quá tải. Vui lòng thử lại lúc khác";
            }
            else
            {
                ViewBag.message = "Đã xóa hồ sơ thành công";
            }
            return RedirectToAction("LuuTruQuyHoach");
        }



        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(login login, string returnUrl)
        {
            if (ModelState.IsValid)
            {

                string pass = controllerHelper.MaHoa(login.PASS);
                NguoiDungDetails detail = this.gISRepository.getNguoiDungDetails().Where(nd =>
                nd.TenNguoiDung == login.USERNAME && nd.MatKhau == pass).FirstOrDefault();

                if (detail != null)
                {
                    FormsAuthentication.SetAuthCookie(login.USERNAME, true);

                    if (!String.IsNullOrEmpty(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Đăng nhập không thành công ");
                    ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu có thể không tồn tại !");
                    ModelState.AddModelError("", "Tài khoản của bạn có thể bị khóa hoặc không có quyền truy cập trang này !");
                }
            }
            return View(login);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        public ActionResult changePass()
        {
            return View();
        }

        [HttpPost]
        public ActionResult changePass(ChangePassUser passNew)
        {
            if (ModelState.IsValid)
            {

                string nameCurrent = User.Identity.Name;


                NguoiDung user = this.gISRepository.getNguoiDung().Where(u => u.TenNguoiDung == nameCurrent).FirstOrDefault();
                if (user == null)
                {
                    ModelState.AddModelError("", "Tài khoản của bạn không được xác minh . Bạn không thể đổi mật khẩu. <br/> Có vẻ bạn đang cố gắng thay đổi mật khẩu của một tài khoản không phải của mình ");
                    return View(passNew);
                }

                string oldPassMH, newPassMH;
                oldPassMH = controllerHelper.MaHoa(passNew.oldpass);

                if (user.MatKhau != oldPassMH)
                {
                    ModelState.AddModelError("", " Mật khẩu cũ của bạn không đúng .  ");
                    return View(passNew);
                }

                newPassMH = controllerHelper.MaHoa(passNew.pass);
                user.MatKhau = newPassMH;

                string result = this.gISRepository.changePass(nameCurrent, passNew);
                if (result.Trim().Length == 0)
                {
                    FormsAuthentication.SignOut();
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Hệ thống đang quá tải");
                    return View(passNew);
                }
            }
            else
            {
                ModelState.AddModelError("", "Dữ liệu không hợp lệ");
                return View(passNew);
            }
        }


        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult getXaByQuanHuyen(string maQuanHuyen)
        {
            List<HANHCHINHXA> listHanhChinhXa = this.gISRepository.getHanhChinhXa().Where(xa => xa.IDHuyen == maQuanHuyen).ToList();
            return Json(listHanhChinhXa);
        }


        //Anh Tuấn viết
        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult getThongTinQHCT(string maQuanHuyen = "", string maPhuongXa = "", string LoaiDat = "", string KiHieuKhuDat = "", string KiHieuLoDat = "", string tendoan = "")
        {
            List<QHCT_SUDUNGDAT> listThongtindoan = this.gISRepository.getQHCT_SUDUNGDAT().ToList();

            if (maQuanHuyen != null)
            {
                if (maQuanHuyen.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => da.MaQuanHuyen == maQuanHuyen).ToList();
                }
            }

            if (maPhuongXa != null)
            {
                if (maPhuongXa.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => da.MaPhuongXa == maPhuongXa).ToList();
                }
            }

            if (LoaiDat != null)
            {
                if (LoaiDat.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.LoaiDat ?? "").Contains(LoaiDat)).ToList();
                }
            }

            if (KiHieuKhuDat != null)
            {
                if (KiHieuKhuDat.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.KiHieuKhuDat ?? "").Contains(KiHieuKhuDat)).ToList();
                }
            }

            if (KiHieuLoDat != null)
            {
                if (KiHieuLoDat.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.KiHieuLoDat ?? "").Contains(KiHieuLoDat)).ToList();
                }
            }

            if (tendoan != null)
            {
                if (tendoan.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.TenDoAn ?? "").Contains(tendoan)).ToList();
                }
            }

            string html = "";
            // lấy theo quy hoạch chi tiết 

            html = "<table  class='table table-condensed'> <tr> <th>TT</th><th>K/h lô</th><th>Loại đất</th><th>DT</th> <th>Tên đồ án</th></tr>";

            if (listThongtindoan.Count > 0)
            {
                for (int i = 0; i < listThongtindoan.Count; i++)
                {
                    QHCT_SUDUNGDAT doan = listThongtindoan[i];
                    html += "<tr> <td>" + (i + 1) + "</td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.KiHieuLoDat +
                        "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.LoaiDat +
                        "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.DienTichLoDat +
                        "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.TenDoAn + "</span></td></tr>";
                }
            }
            else
            {
                html += "<tr> <td colspan='5'><h5 class='mess'>Không có lô đất nào được tìm thấy</h5></td></tr>";
            }

            html += "</table>";
            return Json(listThongtindoan);
        }
        
        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult getThongTinQHPK(string maQuanHuyen = "", string maPhuongXa = "", string LoaiDat = "", string KiHieuLoDat = "", int dientichtu = -1,
            int dientichden = -1, int kcTu = -1, int kcDen = -1, string sovoi = "")
        {
            List<QHPK_SUDUNGDAT> listThongtindoan = this.gISRepository.getQHPK_SUDUNGDAT().ToList();

            if (maQuanHuyen != null)
            {
                if (maQuanHuyen.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => da.MaQuanHuyen == maQuanHuyen).ToList();
                }
            }

            if (maPhuongXa != null)
            {
                if (maPhuongXa.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => da.MaPhuongXa == maPhuongXa).ToList();
                }
            }

            if (LoaiDat != null)
            {
                if (LoaiDat.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.LoaiDat ?? "").Contains(LoaiDat)).ToList();
                }
            }

            if (KiHieuLoDat != null)
            {
                if (KiHieuLoDat.Trim().Length > 0)
                {
                    listThongtindoan = listThongtindoan.Where(da => (da.KiHieuKhuDat ?? "").Contains(KiHieuLoDat)).ToList();
                }
            }

            if (dientichtu > -1)
            {

                listThongtindoan = listThongtindoan.Where(da => da.DienTich >= dientichtu).ToList();
            }
            if (dientichden > -1)
            {

                listThongtindoan = listThongtindoan.Where(da => da.DienTich <= dientichden).ToList();
            }


            if (kcTu > -1)
            {
                if (sovoi == "sbDaNang")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_sanbaydanang >= kcTu).ToList();
                }
                if (sovoi == "sbChuLai")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_sanbaychulai >= kcTu).ToList();
                }
                if (sovoi == "cangKyHa")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_cangkyha >= kcTu).ToList();
                }
                if (sovoi == "tpHoiAn")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_tphoian >= kcTu).ToList();
                }
                if (sovoi == "ckNamGiang")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_cuakhaunamgiang >= kcTu).ToList();
                }
            }
            if (kcDen > -1)
            {
                if (sovoi == "sbDaNang")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_sanbaydanang <= kcDen).ToList();
                }
                if (sovoi == "sbChuLai")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_sanbaychulai <= kcDen).ToList();
                }
                if (sovoi == "cangKyHa")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_cangkyha <= kcDen).ToList();
                }
                if (sovoi == "tpHoiAn")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_tphoian <= kcDen).ToList();
                }
                if (sovoi == "ckNamGiang")
                {
                    listThongtindoan = listThongtindoan.Where(da => da.KhoangCach_cuakhaunamgiang <= kcDen).ToList();
                }
            }


            string html = "";
            // lấy theo quy hoạch chi tiết 

            html = "<table  class='table table-condensed'> <tr> <th>TT</th><th>K/h khu đất</th><th>Loại đất</th><th>DT</th> <th>Tên đồ án</th></tr>";

            if (listThongtindoan.Count > 0)
            {
                for (int i = 0; i < listThongtindoan.Count; i++)
                {
                    QHPK_SUDUNGDAT doan = listThongtindoan[i];
                    html += "<tr> <td>" + (i + 1) + "</td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.KiHieuKhuDat +
                      "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.LoaiDat +
                      "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.DienTich +
                      "</span></td><td><span class='itemSearch' alt='" + doan.OBJECTID + "'>" + doan.TenDoAn + "</span></td></tr>";

                }
            }
            else
            {
                html += "<tr> <td colspan='5'><h5 class='mess'>Không có lô đất nào được tìm thấy</h5></td></tr>";
            }

            html += "</table>";
            return Json(listThongtindoan);
        }



        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult getThongTinHoSoDoAnLayYKien(string maDoAn)
        {
            List<HoSoDoAn> listHoSoDoAn = this.gISRepository.getHoSoDoAn().Where(da => da.MaDoAn == maDoAn).ToList();
            string html = "";
            List<Domain> listDoMain = this.gISRepository.getDomain("DMLoaiHoSo").ToList();


            // lấy theo quy hoạch chi tiết 

            for (int d = 0; d < listDoMain.Count; d++)
            {
                Domain doman = listDoMain[d];
                // lấy theo hồ sơ pháp lý
                string phaply = "";
                for (int i = 0; i < listHoSoDoAn.Count; i++)
                {
                    HoSoDoAn doan = listHoSoDoAn[i];
                    //
                    string duongdan = DomainName + "/FileManagers/" + maDoAn.Trim() + "/" + doan.DuongDan;
                    if (doan.LoaiHoSo == doman.code)
                    {
                        if (doan.LoaiHoSo == "BanVe")
                        {
                            phaply += "<span class='item viewLayYKien' title='" + doan.id + "' alt='" + duongdan + "'>" + doan.TenHoSo + "</span> <a download='" + duongdan + "'  class='download' target='_blank' href='" + duongdan + "' title='Tải tài liệu : " + doan.TenHoSo + "'><i class='fa fa-cloud-download' aria-hidden='true'></i></a>";
                        }
                        else
                        {
                            phaply += "<span class='item viewLayYKien' title='" + doan.id + "' alt='https://docs.google.com/gview?url=" + duongdan + "&embedded=true'>" + doan.TenHoSo + "</span> <a download='" + duongdan + "' class='download' target='_blank' href='" + duongdan + "' title='Tải tài liệu : " + doan.TenHoSo + "'><i class='fa fa-cloud-download' aria-hidden='true'></i></a>";
                        }
                    }
                }

                if (phaply.Trim().Length > 0)
                {
                    html += "<h4> " + doman.value + " </h4>" + phaply;
                }
            }


            return Json(html);
        }

        /// cong bố

        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult getThongTinHoSoDoAnCongBo(string maDoAn)
        {
            List<HoSoDoAn> listHoSoDoAn = this.gISRepository.getHoSoDoAn().Where(da => da.MaDoAn == maDoAn).ToList();

            string html = "";
            List<Domain> listDoMain = this.gISRepository.getDomain("DMLoaiHoSo").ToList();

            // lấy theo quy hoạch chi tiết 

            for (int d = 0; d < listDoMain.Count; d++)
            {
                Domain doman = listDoMain[d];
                // lấy theo hồ sơ pháp lý
                string phaply = "";
                for (int i = 0; i < listHoSoDoAn.Count; i++)
                {
                    HoSoDoAn doan = listHoSoDoAn[i];

                    string duongdan = DomainName + "/FileManagers/" + maDoAn.Trim() + "/" + doan.DuongDan;
                    if (doan.LoaiHoSo == doman.code)
                    {
                        if (doan.LoaiHoSo == "BanVe")
                        {
                            phaply += "<a target='_blank' class='item' href='" + duongdan + "'>" + doan.TenHoSo + "</a> <a download='" + duongdan + "'  class='download' target='_blank' href='" + duongdan + "' title='Tải tài liệu : " + doan.TenHoSo + "'><i class='fa fa-cloud-download' aria-hidden='true'></i></a>";
                        }
                        else
                        {
                            phaply += "<a target='_blank' class='item' href='https://docs.google.com/gview?url=" + duongdan + "&embedded=true'>" + doan.TenHoSo + "</a> <a download='" + duongdan + "' class='download' target='_blank' href='" + duongdan + "' title='Tải tài liệu : " + doan.TenHoSo + "'><i class='fa fa-cloud-download' aria-hidden='true'></i></a>";
                        }
                    }
                }

                if (phaply.Trim().Length > 0)
                {
                    html += "<h4> " + doman.value + " </h4>" + phaply;
                }
            }

            return Json(html);
        }



        ////////////////////////  Lấy ý kien người dân /////////////////////////////////


        [AllowAnonymous]
        [HttpPost]
        public ActionResult addYKienNguoiDan(int id, string yKien = "")
        {
            string returnSTR = "";

            HoSoDoAn hoso = this.gISRepository.getHoSoDoAn().Where(hs => hs.id == id).FirstOrDefault();

            if (hoso != null)
            {
                if (yKien == null)
                {
                    yKien = "";
                }
                GetCart().AddItem(hoso, yKien);
            }

            return Json(returnSTR);
        }

        [AllowAnonymous]
        public ActionResult reviewYKienNguoiDan(string madoan, string loaiDoAn)
        {
            khaoSatNguoiDung khaoSatNguoiDung = GetCart();

            if (madoan == null)
            {
                return RedirectToAction("Index");
            }
            if (madoan.Trim().Length == 0)
            {
                return RedirectToAction("Index");
            }
            string table = "";
            if (loaiDoAn == "QHCT")
            {
                table = "QHCT_ThongTinDoAn";
            }
            if (loaiDoAn == "QHPK")
            {
                table = "QHPK_ThongTinDoAn";
            }
            if (loaiDoAn == "QHC")
            {
                table = "QHC_ThongTinDoAn";
            }
            if (loaiDoAn == "QHNT")
            {
                table = "QHNT_ThongTinDoAn";
            }
            if (loaiDoAn == "KHAC")
            {
                table = "KHAC_ThongTinDoAn";
            }
            if (loaiDoAn == "QHV")
            {
                table = "QHV_ThongTinDoAn";
            }

            THONGTINDOAN doan = this.gISRepository.getThongTinDoAn(loaiDoAn).Where(da => da.MaDoAn == madoan).FirstOrDefault();

            if (doan == null)
            {
                return RedirectToAction("Index");
            }

            ViewBag.DoAn = doan;

            //khaoSatNguoiDung khaoSatNguoiDung = GetCart();

            string noiDung = "";

            if (khaoSatNguoiDung != null)
            {
                foreach (var line in khaoSatNguoiDung.Lines)
                {
                    if (line.HoSo.MaDoAn == madoan)
                    {
                        noiDung += "\n" + line.yKien;
                    }
                }
            }


            YKienQuyHoach ykien;
            ykien = new YKienQuyHoach();
            ykien.MaDoAn = doan.MaDoAn;
            ykien.NoiDungGopY = noiDung;
            ykien.TenDoAn = doan.TenDoAn;
            ykien.BangDuLieu = table;


            return View(ykien);

        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult reviewYKienNguoiDan(YKienQuyHoach ykien)
        {
            if (ModelState.IsValid)
            {
                ykien.NgayLuu = DateTime.Now;
                ykien.TrangThai = false;

                string str = this.gISRepository.saveYKienNguoiDan(ykien);

                if (str.Trim().Length > 0)
                {
                    ModelState.AddModelError("", "Hệ thống đang quá tải. Vui lòng thử lại lúc khác");
                }
                else
                {
                    ViewBag.message = "Đã lưu hồ sơ thành công";
                    return RedirectToAction("thanksYKienNguoiDan");
                }
            }
            else
            {
                ModelState.AddModelError("", "Dữ liệu không hợp lệ");
            }
            return View(ykien);
        }

        [AllowAnonymous]
        public ActionResult thanksYKienNguoiDan()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult GetDanhMucHoSo(String maDoAn)
        {
            DataGISContext context = new DataGISContext();
            List<HoSoDoAn> listHoSoDoAn = context.HoSoDoAns.Where(hs => hs.MaDoAn.Equals(maDoAn)).ToList();
            return Json(listHoSoDoAn);
        }
        [AllowAnonymous]
        public ActionResult GetDMLoaiQuyHoach(String dmLoaiQuyHoach)
        {
            var listDMLoaiQuyHoach = this.gISRepository.getDomain(dmLoaiQuyHoach).ToList();
            return Json(listDMLoaiQuyHoach);
        }
        private khaoSatNguoiDung GetCart()
        {

            khaoSatNguoiDung cart = (khaoSatNguoiDung)Session["khaoSatNguoiDung"];
            if (cart == null)
            {
                cart = new khaoSatNguoiDung();
                Session["khaoSatNguoiDung"] = cart;
            }
            return cart;
        }

    }
}