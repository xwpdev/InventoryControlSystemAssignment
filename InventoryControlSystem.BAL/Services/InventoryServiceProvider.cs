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
        readonly Mapper mapper;

        public InventoryServiceProvider()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<InventoryDto, Inventory>();
                cfg.CreateMap<Inventory, InventoryDto>();
            });
            mapper = new Mapper(config);

            _inventoryRepository = new InventoryRepository();
        }

        public InventoryServiceProvider(IInventoryRepository inventoryRepository)
        {
            this._inventoryRepository = inventoryRepository;
        }

        public IEnumerable<InventoryDto> List()
        {
            return mapper.Map<InventoryDto[]>(_inventoryRepository.GetItems());
        }

        public InventoryDto AddItem(InventoryDto item)
        {
            item.AddedDate = DateTime.Parse(item.AddedDate.ToString());
            item.UpdatedDate= DateTime.Parse(item.UpdatedDate.ToString());

            var response = _inventoryRepository.AddItem(mapper.Map<Inventory>(item));
            item.Id = response.Id;
            return item;
        }
    }
}
