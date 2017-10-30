using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/system")]
   public class SystemController
   {
      [HttpGet]
      public string hello()
      {
         return "Hello friend";
      }

      [HttpGet("limited")]
      [Authorize]
      public string helloLimited()
      {
         return "Hello limited friend";
      }

   }
}