using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryControlSystem.DAL.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }

        public int UnitCount { get; set; }
        
        public decimal UnitPrice { get; set; }

        public int ReorderCount { get; set; }

        public string AddedBy { get; set; }

        public string AddedByName { get; set; }
        
        [Column(TypeName = "datetime2")]
        public DateTime AddedDate { get; set; }

        public string UpdatedBy { get; set; }

        public string UpdatedName { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime UpdatedDate { get; set; }
    }
}
