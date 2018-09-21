namespace WebGISQuangNam.Models.dataHelper
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("sde.YKienQuyHoach")]
    public partial class YKienQuyHoach
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        
        [StringLength(500, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Tên cơ quan, tổ chức, cá nhân")]
        public string TenToChu { get; set; }

        [StringLength(500, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Địa chỉ")]
        public string DiaChi { get; set; }

        [StringLength(12, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Điện thoại")]
        public string DienThoai { get; set; }

        [StringLength(500, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Địa chỉ mail")]
        [DataType(DataType.EmailAddress,ErrorMessage ="Vui lòng nhập địa chỉ email của bạn. Điều này sẽ giúp chúng tôi có thê liên lạc và phản hổi ý kiến tới bạn")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Nội dung góp ý")]
        [DataType(DataType.MultilineText)]
        public string NoiDungGopY { get; set; }
        
        [StringLength(50, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mã đồ án")]
        public string MaDoAn { get; set; }

        [Display(Name = "Tên đồ án")]
        public string TenDoAn { get; set; }

        [Display(Name = "Bảng dữ liệu")]
        public string BangDuLieu { get; set; }

        [Display(Name = "Ngày thêm ý kiến")]
        public DateTime NgayLuu { get; set; }

        [Display(Name = "Cho phép hiển thị")]
        public Boolean TrangThai { get; set; }

        [DataType(DataType.MultilineText)]
        [Display(Name = "Nội dung trả lời ý kiến")]
        public string NoiDungTraLoi { get; set; }
    }


    public class YKienQuyHoachUser
    {
        public int id { get; set; }        
        public string TenToChu { get; set; }
        public string DienThoai { get; set; }
        public string Email { get; set; }
        public string MaDoAn { get; set; }
        public string TenDoAn { get; set; }
        public string BangDuLieu { get; set; }
        public DateTime NgayLuu { get; set; }
        public Boolean TrangThai { get; set; }
        
    }

    public class DoAnYKienQuyHoach
    {
        public string MaDoAn { get; set; }
        public string TenDoAn { get; set; }

    }


}
