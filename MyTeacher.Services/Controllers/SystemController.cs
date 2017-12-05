using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault.Models;
using MyTeacher.Services.Utils.Services;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/system")]
   public class SystemController
   {
      [HttpGet]
      public string hello()
      {
         MyTeacherError.WrongCredentials.Throw();
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