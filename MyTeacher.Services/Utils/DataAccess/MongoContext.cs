using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
   public class MongoContext
   {
      public readonly IMongoDatabase Database = null;

      public MongoContext(IOptions<MongoOptions> settings)
      {
         var client = new MongoClient(settings.Value.ConnectionString);
         if (client != null)
         {
            Database = client.GetDatabase(settings.Value.Database);
         }
      }
   }
}