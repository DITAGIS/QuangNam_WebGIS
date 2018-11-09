using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebGISQuangNam.DataProvider.EF;

namespace WebGISQuangNam.DataProvider.GIS.Models
{
    public static class Model
    {
        public class ThongTinDoAnDTO : THONGTINDOAN { }
        public class ThongTinQHCTDTO: QHCT_SUDUNGDAT { }
        public class ThongTinQHPKDTO: QHPK_SUDUNGDAT { }
        public class HoSoDoAnDTO: HoSoDoAn { }

        public class QHC_THONGTINDOANDTO : QHC_THONGTINDOAN { }
        public class QHCT_THONGTINDOANDTO : QHCT_THONGTINDOAN { }
        public class QHPK_THONGTINDOANDTO : QHPK_THONGTINDOAN { }

        public class QHNT_THONGTINDOANDTO : QHNT_THONGTINDOAN { }
        public class KHAC_THONGTINDOANDTO : KHAC_THONGTINDOAN { }

        public class QHV_THONGTINDOANDTO : QHV_THONGTINDOAN { }

    }
}
