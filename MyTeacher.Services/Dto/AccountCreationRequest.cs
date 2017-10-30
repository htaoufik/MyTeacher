using System;
using System.Collections.Generic;
using System.Text;

namespace MyTeacher.Services.Dto
{
   public class AccountCreationRequest
   {
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }
   }
}