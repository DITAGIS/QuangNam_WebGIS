using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using WebGISQuangNam.Models.dataHelper;

namespace WebGISQuangNam.Models
{
    public class ControllerHelper
    {

        private EFGISRepository gISRepository;
        public ControllerHelper()
        {
            gISRepository = new EFGISRepository();
        }

        public List<DoAn> getDoAn(string trangthaidoan)
        {
            List<THONGTINDOAN> listThongtindoan;
            List<Domain> listQuanHuyen;

            List<ListDoAn> ListThongTinDoAn;
            ListDoAn doanMenu;
            List<DoAn> listDoAnQuyHoach = new List<DoAn>();

            DoAn doAnQuyHoach;

            listQuanHuyen = this.gISRepository.getDomain("DMHuyenTPThiXa").ToList();

            listQuanHuyen = listQuanHuyen.OrderBy(qh => qh.value).ToList();

            for (int q = 0; q < listQuanHuyen.Count; q++)
            {
                Domain QuanHuyen = listQuanHuyen[q];

                listThongtindoan = this.gISRepository.getThongTinDoAn().Where(da => da.MaQuanHuyen.Trim() == QuanHuyen.code.Trim()
        && da.TrangThaiDoAn == trangthaidoan).ToList();

                ListThongTinDoAn = new List<dataHelper.ListDoAn>();

                for (int i = 0; i < listThongtindoan.Count; i++)
                {
                    THONGTINDOAN doan = listThongtindoan[i];
                    doanMenu = new ListDoAn();
                    doanMenu.MaDoAn = doan.MaDoAn;
                    doanMenu.TenDoAn = doan.TenDoAn;
                    ListThongTinDoAn.Add(doanMenu);
                }

                doAnQuyHoach = new DoAn();
                doAnQuyHoach.MaQuanHuyen = QuanHuyen.code;
                doAnQuyHoach.TenQuanHuyen = QuanHuyen.value;
                doAnQuyHoach.ListDoAnQuyHoach = ListThongTinDoAn;
                listDoAnQuyHoach.Add(doAnQuyHoach);
            }


            return listDoAnQuyHoach;
        }

        public List<DoAnQuyHoach> getLoaiQuyHoachByHanhChinh(string trangthaidoan)
        {
            List<THONGTINDOAN> listThongtindoan;
            List<Domain> listDoMain;
            List<Domain> listQuanHuyen;

            LoaiQuyHoach loaiQuyHoach;
            List<ListDoAn> ListThongTinDoAn;
            ListDoAn doanMenu;
            List<LoaiQuyHoach> list;
            List<DoAnQuyHoach> listDoAnQuyHoach = new List<DoAnQuyHoach>();

            DoAnQuyHoach doAnQuyHoach;


            listDoMain = this.gISRepository.getDomain("DMLoaiQuyHoach").ToList();
            listQuanHuyen = this.gISRepository.getDomain("DMHuyenTPThiXa").ToList();

            listQuanHuyen = listQuanHuyen.OrderBy(qh => qh.code).ToList();

            for (int q = 0; q < listQuanHuyen.Count; q++)
            {
                Domain QuanHuyen = listQuanHuyen[q];

                listThongtindoan = this.gISRepository.getThongTinDoAn().Where(da =>
                da.MaQuanHuyen.Trim() == QuanHuyen.code.Trim()
                && da.TrangThaiDoAn == trangthaidoan).ToList();

                list = new List<LoaiQuyHoach>();

                for (int d = 0; d < listDoMain.Count; d++)
                {
                    Domain doman = listDoMain[d];

                    ListThongTinDoAn = new List<dataHelper.ListDoAn>();

                    for (int i = 0; i < listThongtindoan.Count; i++)
                    {
                        THONGTINDOAN doan = listThongtindoan[i];
                        if (doan.LoaiQuyHoach == doman.code)
                        {
                            doanMenu = new ListDoAn();
                            doanMenu.MaDoAn = doan.MaDoAn;
                            doanMenu.TenDoAn = doan.TenDoAn;
                            ListThongTinDoAn.Add(doanMenu);
                        }
                    }

                    //if (ListThongTinDoAn.Count > 0)
                    //{

                        loaiQuyHoach = new LoaiQuyHoach();
                        loaiQuyHoach.MaLoaiQuyHoach = doman.code;
                        loaiQuyHoach.TenLoaiQuyHoach = doman.value;
                        loaiQuyHoach.ListThongTinDoAn = ListThongTinDoAn;

                        list.Add(loaiQuyHoach);
                    //}
                }
                //if (list.Count > 0)
                //{
                    doAnQuyHoach = new DoAnQuyHoach();
                    doAnQuyHoach.MaQuanHuyen = QuanHuyen.code;
                    doAnQuyHoach.TenQuanHuyen = QuanHuyen.value;
                    doAnQuyHoach.ListLoaiQuyHoach = list;
                    listDoAnQuyHoach.Add(doAnQuyHoach);
                //}
            }


            return listDoAnQuyHoach;
        }



        public List<LoaiQuyHoach> getLoaiQuyHoachByHanhChinh(string maquanHuyen, string trangthaidoan)
        {
            List<LoaiQuyHoach> list = new List<LoaiQuyHoach>();

            List<THONGTINDOAN> listThongtindoan = this.gISRepository.getThongTinDoAn().Where(da => da.MaQuanHuyen == maquanHuyen
        && da.TrangThaiDoAn == trangthaidoan).ToList();
            List<Domain> listDoMain = this.gISRepository.getDomain("DMLoaiQuyHoach").ToList();

            LoaiQuyHoach loaiQuyHoach;
            List<ListDoAn> ListThongTinDoAn;
            ListDoAn doanMenu;

            for (int d = 0; d < listDoMain.Count; d++)
            {
                Domain doman = listDoMain[d];

                ListThongTinDoAn = new List<dataHelper.ListDoAn>();

                for (int i = 0; i < listThongtindoan.Count; i++)
                {
                    THONGTINDOAN doan = listThongtindoan[i];
                    if (doan.LoaiQuyHoach == doman.code)
                    {
                        doanMenu = new ListDoAn();
                        doanMenu.MaDoAn = doan.MaDoAn;
                        doanMenu.TenDoAn = doan.TenDoAn;
                        ListThongTinDoAn.Add(doanMenu);
                    }
                }

                loaiQuyHoach = new LoaiQuyHoach();
                loaiQuyHoach.MaLoaiQuyHoach = doman.code;
                loaiQuyHoach.TenLoaiQuyHoach = doman.value;
                loaiQuyHoach.ListThongTinDoAn = ListThongTinDoAn;

                list.Add(loaiQuyHoach);
            }

            return list;
        }


        public string MaHoa(string chuoi)
        {
            //Hash the password
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] hashedDataBytes;
            UTF8Encoding encoder = new UTF8Encoding();
            hashedDataBytes = md5Hasher.ComputeHash(encoder.GetBytes(chuoi));
            string str;
            str = BitConverter.ToString(hashedDataBytes).Replace("-", "").ToLower();
            return str;
        }


    }
}