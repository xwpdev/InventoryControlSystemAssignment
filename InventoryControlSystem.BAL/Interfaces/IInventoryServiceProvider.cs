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
        InventoryDto AddItem(InventoryDto item);
    }
}
