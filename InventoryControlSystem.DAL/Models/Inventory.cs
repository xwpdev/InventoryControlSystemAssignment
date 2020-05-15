using System;
using System.ComponentModel.DataAnnotations;

namespace InventoryControlSystem.DAL.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int UnitCount { get; set; }
        
        public decimal UnitPrice { get; set; }

        public int ReorderCount { get; set; }

        public string AddedBy { get; set; }

        public DateTime AddedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
