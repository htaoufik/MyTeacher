using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
    public class UnitOfWork
    {
        public IMongoRepository<TeacherAccount> TeacherAccounts { get; set; }


        private readonly MongoContext _context;
        
        public UnitOfWork( IOptions<MongoOptions> settings)
        {
            _context = new MongoContext(settings);

            // Initialises the repositories
            TeacherAccounts = new MongoRepository<TeacherAccount>(_context, "TeacherAccounts");
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
                    return (IMongoRepository<T>)property.GetValue(this);
                }
            }
            return null;
        }

    }
}
