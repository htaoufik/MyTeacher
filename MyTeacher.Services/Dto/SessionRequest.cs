using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyTeacher.Services.Dto
{
   public class SessionRequest
   {
      public string Email { get; set; }
      public string Password { get; set; }
   }
}