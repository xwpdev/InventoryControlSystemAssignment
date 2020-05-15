using InventoryControlSystem.DAL.Models;

namespace InventoryControlSystem.DAL.Interfaces
{
    interface IInventoryRepository
    {
        Inventory AddItem(Inventory data);
        Inventory UpdateItem(Inventory data);
        bool DeleteItem(int id);
    }
}
