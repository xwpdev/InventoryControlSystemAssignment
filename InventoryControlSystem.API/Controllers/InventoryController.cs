﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InventoryControlSystem.API.Controllers
{
    public class InventoryController : ApiController
    {
        [Authorize]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok();
        }
    }
}
