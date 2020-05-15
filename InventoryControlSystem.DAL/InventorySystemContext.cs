using InventoryControlSystem.DAL.Models;
using System.Data.Entity;

namespace InventoryControlSystem.DAL
{
    public class InventorySystemContext : DbContext
    {
        public InventorySystemContext() : base("InventorySystemContext")
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<InventorySystemContext>());
        }

        public virtual DbSet<Inventory> Inventory { get; set; }
    }
}
