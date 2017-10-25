using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyTeacher.Models
{
    public class MongoBaseEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
