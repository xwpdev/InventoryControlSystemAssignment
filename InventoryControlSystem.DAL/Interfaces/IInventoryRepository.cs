using InventoryControlSystem.DAL.Models;
using System.Collections.Generic;

namespace InventoryControlSystem.DAL.Interfaces
{
    public interface IInventoryRepository
    {
        IEnumerable<Inventory> GetItems();
        Inventory AddItem(Inventory data);
        Inventory UpdateItem(Inventory data);
        bool DeleteItem(int id);
    }
}
