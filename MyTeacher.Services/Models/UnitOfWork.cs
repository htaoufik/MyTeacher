using System.Reflection;
using Microsoft.Extensions.Options;
using MyTeacher.Models;

namespace MyTeacher.Services.Models
{
   public class UnitOfWork
   {
      public IMongoRepository<TeacherAccount> TeacherAccounts { get; set; }
      public IMongoRepository<User> Users { get; set; }


      private readonly MongoContext _context;

      public UnitOfWork(IOptions<MongoOptions> settings)
      {
         _context = new MongoContext(settings);

         // Initialises the repositories
         TeacherAccounts = new MongoRepository<TeacherAccount>(_context, "TeacherAccounts");
         Users = new MongoRepository<User>(_context, "Users");
      }

      /// <summary>
      /// Return a repository of a given entity type or null if not found
      /// </summary>
      /// <typeparam name="T"></typeparam>
      /// <returns></returns>
      public IMongoRepository<T> Repository<T>()
      {
         PropertyInfo[] properties = GetType().GetProperties();

         foreach (PropertyInfo property in properties)
         {
            if (property.PropertyType == typeof(IMongoRepository<T>))
            {
               return (IMongoRepository<T>) property.GetValue(this);
            }
         }
         return null;
      }
   }
}