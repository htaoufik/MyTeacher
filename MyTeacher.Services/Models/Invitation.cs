using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MyTeacher.Models;

namespace MyTeacher.Services.Models
{
   public class Invitation : MongoBaseEntity
   {
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }

      [BsonElement("teacherAccountId")]
      [BsonRepresentation(BsonType.ObjectId)]
      public string TeacherAccountId { get; set; }
   }
}
