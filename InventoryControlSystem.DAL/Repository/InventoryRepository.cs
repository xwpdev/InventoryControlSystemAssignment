using InventoryControlSystem.DAL.Interfaces;
using InventoryControlSystem.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace InventoryControlSystem.DAL.Repository
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly InventorySystemContext _dbContext;
        public InventoryRepository()
        {
            _dbContext = new InventorySystemContext();
        }

        public IEnumerable<Inventory> GetItems()
        {
            return _dbContext.Inventory;
        }

        public Inventory GetItem(int id)
        {
            return _dbContext.Inventory.Where(x => x.Id == id).FirstOrDefault();
        }

        public Inventory AddItem(Inventory data)
        {
            _dbContext.Inventory.Add(data);
            _dbContext.SaveChanges();

            return data;
        }

        public Inventory UpdateItem(Inventory data)
        {
            var item = _dbContext.Inventory.Where(x => x.Id == data.Id).FirstOrDefault();
            item.Name = data.Name;
            item.UnitCount = data.UnitCount;
            item.UnitPrice = data.UnitPrice;
            item.ReorderCount = data.ReorderCount;
            item.UpdatedBy = data.UpdatedBy;
            item.UpdatedDate = data.UpdatedDate;

            _dbContext.Entry(item).State = EntityState.Modified;

            _dbContext.SaveChanges();

            return data;
        }

        public bool DeleteItem(int id)
        {
            try
            {
                var item = _dbContext.Inventory.Where(x => x.Id == id).FirstOrDefault();
                _dbContext.Inventory.Remove(item);

                _dbContext.Entry(item).State = EntityState.Deleted;

                _dbContext.SaveChanges();

                return true;
            }
            catch (Exception EX)
            {
                return false;
            }
        }
    }
}
