using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
    public class TeacherAccount : MongoBaseEntity
    {
        public static readonly int CurrentVersion = 1;

        [BsonElement("schemaVersion")]
        public int SchemaVersion = CurrentVersion;

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("Telephone")]
        public string Telephone { get; set; }

        [BsonElement("addressLine")]
        public string AddressLine { get; set; }

        [BsonElement("city")]
        public string City { get; set; }

        [BsonElement("postalCode")]
        public string PostalCode { get; set; }

        [BsonElement("countryCode")]
        public string CountryCode { get; set; }

        [JsonIgnore]
        [BsonExtraElements]
        public BsonDocument CatchAll { get; set; }
    }
}
