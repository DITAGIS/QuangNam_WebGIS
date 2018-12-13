namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Web.Mvc;
    using Ninject;
    using System.Web.Routing;
    using System.Collections.Generic;
    using System.Data.SqlClient;

    public interface IGISRepository
    {
        IQueryable<HANHCHINHHUYEN> getHanhChinhHuyen();
        
        List<HANHCHINHXA> getHanhChinhXa();
        IQueryable<NhomNguoiDung> getNhomNguoiDung();
        IQueryable<NguoiDung> getNguoiDung();

        List<THONGTINDOAN> getThongTinDoAn();
        List<THONGTINDOAN> getThongTinDoAn(string doan);
        List<THONGTINDOAN> getThongTinDoAn(string doan, string quanhuyen, string trangthai);

        List<QHCT_SUDUNGDAT> getQHCT_SUDUNGDAT();

        List<QHPK_SUDUNGDAT> getQHPK_SUDUNGDAT();

        IQueryable<HoSoDoAn> getHoSoDoAn();
        IQueryable<HoSoLuuTru> getHoSoLuuTru();
        IEnumerable<Domain> getDomain(string domainName);
        List<NguoiDungDetails> getNguoiDungDetails();
        string saveHoSoLuuTru(HoSoLuuTru hoso);
        string deleteHoSoLuuTru(int id);
        List<loaihosoData> getLoaiHoSo(string user);

        string saveYKienNguoiDan(YKienQuyHoach yekien);
        string changePass(string name, ChangePassUser changePass);
        
        List<YKienQuyHoachUser> getYKienQuyHoachUser();
        List<DoAnYKienQuyHoach> getDoAnYKienQuyHoach();
        List<String> getListTenDoAn();

    }   
    public class EFGISRepository : IGISRepository
    {
        private DataGISContext context = new DataGISContext();

        public string saveHoSoLuuTru(HoSoLuuTru hoso)
        {
            try
            {
                context.HoSoLuuTrus.Add(hoso);
                context.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string saveYKienNguoiDan(YKienQuyHoach ykien)
        {
            try
            {
                context.YKienQuyHoachs.Add(ykien);
                context.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public IQueryable<HANHCHINHHUYEN> getHanhChinhHuyen()
        {
            return context.HANHCHINHHUYENs;
        }
        public List<HANHCHINHXA> getHanhChinhXa()
        {
            string query = "select IDHanhChinh,TenHanhChinh,IDHuyen FROM [sde].[HANHCHINHXA]";

            List<HANHCHINHXA> list = this.context.Database.SqlQuery<HANHCHINHXA>(query).ToList();

            return list;
        }

        public IQueryable<NhomNguoiDung> getNhomNguoiDung()
        {
            return context.NhomNguoiDungs;
        }
        public IQueryable<NguoiDung> getNguoiDung()
        {
            return context.NguoiDungs;
        }


        public string changePass(string name, ChangePassUser changePass)
        {
            NguoiDung dbEntry = context.NguoiDungs.Where(u => u.TenNguoiDung == name && u.MatKhau == changePass.oldpass).FirstOrDefault();
            if (dbEntry != null)
            {
                dbEntry.MatKhau = changePass.pass;
            }
            try
            {
                context.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<THONGTINDOAN> getThongTinDoAn()
        {

            string query = "select * FROM [sde].[ThongTinDoAn_Chung]";

            List<THONGTINDOAN> list = this.context.Database.SqlQuery<THONGTINDOAN>(query).ToList();

            return list;
        }

        public List<THONGTINDOAN> getThongTinDoAn(string doan)
        {

            string table = "";

            if (doan == "QHCT")
            {
                table = "QHCT_ThongTinDoAn";
            }
            if (doan == "QHPK")
            {
                table = "QHPK_ThongTinDoAn";
            }
            if (doan == "QHC")
            {
                table = "QHC_ThongTinDoAn";
            }
            if (doan == "QHNT")
            {
                table = "QHNT_ThongTinDoAn";
            }
            if (doan == "KHAC")
            {
                table = "KHAC_ThongTinDoAn";
            }
            if (doan == "QHV")
            {
                table = "QHV_ThongTinDoAn";
            }

            string query = "select MaDoAn,TenDoAn,DiaDiem,DienTich,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GhiChu,KiHieuKhuVuc,ChuDauTu,SoQuyetDinhPheDuyet,NgayPheDuyet,CoQuanPheDuyet,MaQuanHuyen,MaPhuongXa,LoaiQuyHoach,TrangThaiDoAn FROM [sde].[" + table + "] ";

            List<THONGTINDOAN> list = this.context.Database.SqlQuery<THONGTINDOAN>(query).ToList();

            return list;
        }


        public List<THONGTINDOAN> getThongTinDoAn(string doan, string quanhuyen, string trangthai)
        {

            string table = "";

            if (doan == "QHCT")
            {
                table = "QHCT_ThongTinDoAn";
            }
            if (doan == "QHPK")
            {
                table = "QHPK_ThongTinDoAn";
            }
            if (doan == "QHC")
            {
                table = "QHC_ThongTinDoAn";
            }
            if (doan == "QHNT")
            {
                table = "QHNT_ThongTinDoAn";
            }
            if (doan == "KHAC")
            {
                table = "KHAC_ThongTinDoAn";
            }
            if (doan == "QHV")
            {
                table = "QHV_ThongTinDoAn";
            }

            string query = "select MaDoAn,TenDoAn,DiaDiem,DienTich,NgayCapNhat,NguoiCapNhat,DonViCapNhat,DonViQuanLy,GhiChu,KiHieuKhuVuc,ChuDauTu,SoQuyetDinhPheDuyet,NgayPheDuyet,CoQuanPheDuyet,MaQuanHuyen,MaPhuongXa,LoaiQuyHoach,TrangThaiDoAn FROM [sde].[" + table + "] where MaQuanHuyen = '" + quanhuyen + "' and TrangThaiDoAn = '" + trangthai + "'";

            List<THONGTINDOAN> list = this.context.Database.SqlQuery<THONGTINDOAN>(query).ToList();

            return list;
        }

        public List<QHCT_SUDUNGDAT> getQHCT_SUDUNGDAT()
        {
            string query = "select OBJECTID,MaSDD,KiHieuKhuDat,KiHieuLoDat,LoaiDat,DienTichKhuDat,MatDoXayDung,TangCao,ChiGioiXayDung,KhoangLuiBien,GhiChu,ChucNang,GiaiDoanQuyHoach,HeSoSuDungDat,KhoangLuiChinh,DienTichLoDat,MaQuanHuyen,MaPhuongXa,TenDoAn FROM [sde].[QHCT_SUDUNGDAT]";

            List<QHCT_SUDUNGDAT> list = this.context.Database.SqlQuery<QHCT_SUDUNGDAT>(query).ToList();

            return list;
        }

        public List<QHPK_SUDUNGDAT> getQHPK_SUDUNGDAT()
        {
            string query = "select OBJECTID,MaSDD,KiHieuKhuDat,LoaiDat,DienTich,MatDoXayDung,TangCao,ChiGioiXayDung,KhoangLuiBien,GhiChu,ChucNang,GiaiDoanQuyHoach,HeSoSuDungDat,KhoangLuiChinh,MaPhuongXa,MaQuanHuyen,KhoangCach_sanbaydanang,KhoangCach_sanbaychulai,KhoangCach_cangkyha,KhoangCach_TpTamky,KhoangCach_tphoian,KhoangCach_cuakhaunamgiang,TenDoAn FROM [sde].[QHPK_SUDUNGDAT]";

            List<QHPK_SUDUNGDAT> list = this.context.Database.SqlQuery<QHPK_SUDUNGDAT>(query).ToList();

            return list;
        }
        public IQueryable<HoSoDoAn> getHoSoDoAn()
        {
            return context.HoSoDoAns;
        }

        public IQueryable<HoSoLuuTru> getHoSoLuuTru()
        {
            return context.HoSoLuuTrus;
        }


        public string deleteHoSoLuuTru(int id)
        {
            HoSoLuuTru dbEntry = context.HoSoLuuTrus.Find(id);
            string result = "";
            if (dbEntry != null)
            {
                try
                {                    
                    context.HoSoLuuTrus.Remove(dbEntry);
                    context.SaveChanges();                    
                }
                catch (Exception ex)
                {
                    result = ex.Message;
                }
            }
            return result;
        }

        public IEnumerable<Domain> getDomain(string domainName)
        {
            string query = " SELECT codedValue.value('Code[1]', 'nvarchar(max)') AS 'Code', codedValue.value('Name[1]', 'nvarchar(max)') AS 'Value' ";
            query += " FROM SDE.GDB_ITEMS AS items INNER JOIN SDE.GDB_ITEMTYPES AS itemtypes ON items.Type = itemtypes.UUID ";
            query += " CROSS APPLY items.Definition.nodes ('/GPCodedValueDomain2/CodedValues/CodedValue') AS CodedValues(codedValue) ";
            query += " WHERE itemtypes.Name = 'Coded Value Domain' AND items.Name = '" + domainName + "' ";
            List<Domain> result = null;

            result = context.Database.SqlQuery<Domain>(query).ToList();
            return result;
        }


        public List<NguoiDungDetails> getNguoiDungDetails()
        {
            string query = "select nd.ID,nd.TenNguoiDung,nd.MatKhau,nd.NhomNguoiDung,nhom.TenNhomNguoiDung,quyen.QuanLyNguoiDung,quyen.CapNhatDuLieu";
            query += " , quyen.LuuTruHoSo, quyen.QuanLyYKienNguoiDung from SDE.NguoiDung nd";
            query += " left join SDE.NhomNguoiDungQuyen quyen on nd.NhomNguoiDung = quyen.NhomNguoiDung left join SDE.NhomNguoiDung nhom on nd.NhomNguoiDung = nhom.ID";

            List<NguoiDungDetails> list = this.context.Database.SqlQuery<NguoiDungDetails>(query).ToList();

            return list;

        }

        public List<loaihosoData> getLoaiHoSo(string user)
        {
            string query = " select distinct(LoaiHoSo) from sde.HoSoLuuTru WHERE NguoiDung=@user";

            SqlParameter[] param = new SqlParameter[1];
            param[0] = new SqlParameter("@user", user);

            List<loaihosoData> list = this.context.Database.SqlQuery<loaihosoData>(query, param).ToList();

            return list;

        }

        //////////////////////////////////////////////////


        public List<YKienQuyHoachUser> getYKienQuyHoachUser()
        {
            string query = " SELECT id,TenToChu,DienThoai,Email,MaDoAn,NgayLuu,TrangThai,TenDoAn,BangDuLieu ";
            query += " FROM sde.YKienQuyHoach yk ";

            List<YKienQuyHoachUser> list = this.context.Database.SqlQuery<YKienQuyHoachUser>(query).ToList();

            return list;

        }


        public List<DoAnYKienQuyHoach> getDoAnYKienQuyHoach()
        {
            string query = " SELECT distinct( MaDoAn),TenDoAn  ";
            query += " FROM sde.YKienQuyHoach ";

            List<DoAnYKienQuyHoach> list = this.context.Database.SqlQuery<DoAnYKienQuyHoach>(query).ToList();

            return list;

        }

        public List<string> getListTenDoAn()
        {
            string query = "select TenDoAn from sde.QHC_THONGTINDOAN UNION ALL " +
                           "select TenDoAn from sde.QHCT_THONGTINDOAN UNION ALL " +
                           "select TenDoAn from sde.QHV_THONGTINDOAN UNION ALL " +
                           "select TenDoAn from sde.QHNT_THONGTINDOAN UNION ALL " +
                           "select TenDoAn from sde.KHAC_THONGTINDOAN UNION ALL " +
                           "select TenDoAn from sde.QHPK_THONGTINDOAN";
            return this.context.Database.SqlQuery<String>(query).ToList();

        }
    }

    public class NinjectControllerFactory : DefaultControllerFactory
    {
        private IKernel ninjectKernel;
        public NinjectControllerFactory()
        {
            ninjectKernel = new StandardKernel();
            AddBindings();
        }
        protected override IController GetControllerInstance(RequestContext
        requestContext, Type controllerType)
        {
            return controllerType == null
            ? null
            : (IController)ninjectKernel.Get(controllerType);
        }
        private void AddBindings()
        {

            ninjectKernel.Bind<IGISRepository>().To<EFGISRepository>();
            //
        }
    }


    public partial class DataGISContext : DbContext
    {
        public DataGISContext()
            : base("name=DataGISContext")
        {
        }

        public virtual DbSet<HoSoDoAn> HoSoDoAns { get; set; }
        public virtual DbSet<HoSoLuuTru> HoSoLuuTrus { get; set; }
        public virtual DbSet<YKienQuyHoach> YKienQuyHoachs { get; set; }
        public virtual DbSet<HANHCHINHHUYEN> HANHCHINHHUYENs { get; set; }
        public virtual DbSet<NguoiDung> NguoiDungs { get; set; }
        public virtual DbSet<NhomNguoiDung> NhomNguoiDungs { get; set; }
        public virtual DbSet<NhomNguoiDungQuyen> NhomNguoiDungQuyens { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Configure default schema
            modelBuilder.HasDefaultSchema("SDE");


            modelBuilder.Entity<NhomNguoiDung>()
                .HasMany(e => e.NguoiDungs)
                .WithRequired(e => e.NhomNguoiDung1)
                .HasForeignKey(e => e.NhomNguoiDung)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NhomNguoiDung>()
                .HasMany(e => e.NhomNguoiDungQuyens)
                .WithRequired(e => e.NhomNguoiDung1)
                .HasForeignKey(e => e.NhomNguoiDung)
                .WillCascadeOnDelete(false);

        }
    }
}
