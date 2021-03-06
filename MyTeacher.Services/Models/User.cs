﻿using MyTeacher.Models;

namespace MyTeacher.Services.Models
{
   public class User : MongoBaseEntity
   {
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }
   }
}