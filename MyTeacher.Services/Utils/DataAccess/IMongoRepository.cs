using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
    public interface IMongoRepository <T>
    {
        Task <IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(string id);
        Task AddAsync(T item);
        Task<DeleteResult> RemoveAsync(string id);
        Task<ReplaceOneResult> ReplaceAsync(string id, T item);

        // should be used with high cautious, only in relation with demo setup
        Task<DeleteResult> RemoveAllAsync();
    }
}
