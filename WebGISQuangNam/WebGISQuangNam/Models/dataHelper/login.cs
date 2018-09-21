using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebGISQuangNam.Models.dataHelper
{    
    public class login
    {
            [Display(Name = "Tên người dùng")]
            public string USERNAME { get; set; }

            [Display(Name = "Mật khẩu")]
            [DataType(DataType.Password)]
            public string PASS { get; set; }
    }

    public class ChangePassUser
    {
        
        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu cũ")]
        [DataType(DataType.Password)]
        public string oldpass { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập {0} ")]
        [Display(Name = "Mật khẩu mới")]
        [DataType(DataType.Password)]
        public string pass { get; set; }

        [StringLength(1000, ErrorMessage = "Cột {0} phải có ít nhất {2} kí tự và không lớn hơn {1} kí tự .", MinimumLength = 2)]
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu lần nữa")]
        [Display(Name = "Nhập lại mật khẩu mới")]
        [DataType(DataType.Password)]
        [Compare("pass", ErrorMessage = "Hai mật khẩu không giống nhau")]
        public string c_pass { get; set; }

    }

}