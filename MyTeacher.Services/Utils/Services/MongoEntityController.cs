using Microsoft.AspNetCore.Mvc;
using MyTeacher.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyTeacher.Utils.Services
{
    public class MongoEntityController<T> : Controller
    {
        protected readonly UnitOfWork _database;
        protected readonly IMongoRepository<T> _repository;

        public MongoEntityController(UnitOfWork database)
        {
            _database = database;
            _repository = _database.Repository<T>();
        }

        [HttpGet]
        public async Task<IEnumerable<T>> GetAll()
        {
            IEnumerable<T> list = await _repository?.GetAllAsync();
            return list;
        }

        [HttpGet("{id}")]
        public async Task<T> Get(string id)
        {
            return await _repository?.GetByIdAsync(id);
        }

        [HttpPost]
        public async void Post([FromBody]T account)
        {
            await _repository?.AddAsync(account);
        }

        [HttpPut("{id}")]
        public async void Put(string id, [FromBody]T account)
        {
            await _repository?.ReplaceAsync(id, account);
        }

        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            await _repository?.RemoveAsync(id);
        }
    }
}

