using InventoryControlSystem.BAL.DTO;
using InventoryControlSystem.BAL.Interfaces;
using InventoryControlSystem.BAL.Services;
using InventoryControlSystem.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InventoryControlSystem.API.Controllers
{
    public class InventoryController : ApiController
    {
        readonly IInventoryServiceProvider _inventoryServiceProvider;

        public InventoryController()
        {
            this._inventoryServiceProvider = new InventoryServiceProvider();
        }

        // [Authorize]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_inventoryServiceProvider.List());
        }

        [HttpPost]
        public IHttpActionResult Post(InventoryDto data)
        {
            return Ok(_inventoryServiceProvider.AddItem(data));
        }
    }
}
