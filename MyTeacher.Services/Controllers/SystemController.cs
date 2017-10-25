using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTeacher.Web.Controllers
{
  [Route("rest/system")]
  public class SystemController
  {
    [HttpGet]
    public string hello()
    {
      return "Hello friend";
    }
  }
}
