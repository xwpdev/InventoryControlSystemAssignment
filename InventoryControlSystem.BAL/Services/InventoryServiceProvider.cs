using AutoMapper;
using InventoryControlSystem.BAL.DTO;
using InventoryControlSystem.BAL.Interfaces;
using InventoryControlSystem.DAL.Interfaces;
using InventoryControlSystem.DAL.Models;
using InventoryControlSystem.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryControlSystem.BAL.Services
{
    public class InventoryServiceProvider : IInventoryServiceProvider
    {
        readonly IInventoryRepository _inventoryRepository;

        public InventoryServiceProvider()
        {
            _inventoryRepository = new InventoryRepository();
        }

        public InventoryServiceProvider(IInventoryRepository inventoryRepository)
        {
            this._inventoryRepository = inventoryRepository;
        }

        public IEnumerable<InventoryDto> List()
        {
            return _inventoryRepository.GetItems().Select(x => new InventoryDto { 
                //TODOL: set params
            });
        }

        public InventoryDto AddItem(InventoryDto item)
        {
            var tempItem = new Inventory();
            //TODOL: set props

            var response = _inventoryRepository.AddItem(tempItem);
            item.Id = response.Id;
            return item;
        }
    }
}
