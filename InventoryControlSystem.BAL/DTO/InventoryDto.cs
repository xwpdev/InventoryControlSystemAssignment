using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryControlSystem.BAL.DTO
{
    public class InventoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int UnitCount { get; set; }

        public decimal UnitPrice { get; set; }

        public int ReorderCount { get; set; }

        public string AddedBy { get; set; }

        public string UpdatedBy { get; set; }
    }
}
