using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
   public interface IMongoRepository<T>
   {
      Task<IEnumerable<T>> GetAllAsync();
      Task<T> GetByIdAsync(string id);
      Task AddAsync(T item);
      Task<DeleteResult> RemoveAsync(string id);
      Task<ReplaceOneResult> ReplaceAsync(string id, T item);
      Task<IAsyncCursor<T>> FindAsync(Expression<Func<T, bool>> filter);
      Task<ReplaceOneResult> UpdateAsync(T item);

      // should be used with high cautious, only in relation with demo setup
      Task<DeleteResult> RemoveAllAsync();
   }
}