using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MyTeacher.Models
{
    public class MongoRepository<T>: IMongoRepository<T> where T : MongoBaseEntity
    {

        private readonly IMongoCollection<T> _collection = null;


        public MongoRepository( MongoContext context, string collectionName )
        {
            _collection = context.Database.GetCollection<T>(collectionName);
        }

        public async Task AddAsync(T item)
        {
            await _collection.InsertOneAsync(item);
        }

        public async Task AddOrUpdateAsync(T item)
        {
            await _collection.ReplaceOneAsync(doc => doc.Id == item.Id, item, new UpdateOptions { IsUpsert = true });
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<T> GetByIdAsync(string id)
        {
            return await _collection.Find(obj => obj.Id == id).FirstOrDefaultAsync();
        }

        public async Task<DeleteResult> RemoveAsync(string id)
        {
            return await _collection.DeleteOneAsync(obj => obj.Id == id);
        }

        public async Task<DeleteResult> RemoveAllAsync()
        {
            return await _collection.DeleteManyAsync(_ => true);
        }

        public async Task<ReplaceOneResult> ReplaceAsync(string id, T item)
        {
            return await _collection.ReplaceOneAsync(doc => doc.Id == id, item);
        }
    }
}
