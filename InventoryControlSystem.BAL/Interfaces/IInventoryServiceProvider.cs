using InventoryControlSystem.BAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryControlSystem.BAL.Interfaces
{
    public interface IInventoryServiceProvider
    {
        IEnumerable<InventoryDto> List();
        InventoryDto Get(int id);
        InventoryDto AddItem(InventoryDto item);
        InventoryDto UpdateItem(InventoryDto item);
        bool DeleteItem(int id);
    }
}
