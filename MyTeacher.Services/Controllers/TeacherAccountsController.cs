using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTeacher.Models;
using MyTeacher.Services.Dto;
using MyTeacher.Services.Models;
using MyTeacher.Utils.Services;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/teacher-accounts")]
   public class TeacherAccountsController : Controller
   {
      private readonly IMongoRepository<TeacherAccount> _teacherAccountRepository;
      private readonly IMongoRepository<User> _userRepository;


      public TeacherAccountsController(UnitOfWork database)
      {
         _teacherAccountRepository = database.Repository<TeacherAccount>();
         _userRepository = database.Repository<User>();
      }

      [HttpPost]
      public async Task<IActionResult> CreateAccount([FromBody] AccountCreationRequest accountCreationRequest)
      {
         // Creates an account and the associated user ... but what the if one of the actions fails ? 

         // Hash the password
         // SHA512 is disposable by inheritance.  
         using (var sha256 = SHA256.Create())
         {
            // Send a sample text to hash.  
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(accountCreationRequest.Password));
            // Get the hashed string.  
            accountCreationRequest.Password = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
         } 

         // TODO check if the user already exist
         // Lets create the user
         User user = new User()
         { 
            Email = accountCreationRequest.Email,
            FirstName = accountCreationRequest.FirstName,
            LastName = accountCreationRequest.LastName,
            Password = accountCreationRequest.Password
         };

         await _userRepository.AddAsync(user);

         // Create the associated account
         TeacherAccount account = new TeacherAccount()
         {
            Name = accountCreationRequest.FirstName + " " + accountCreationRequest.LastName,
            OwnerId = user.Id
         };
         await _teacherAccountRepository.AddAsync(account);

         return CreatedAtRoute("GetAccount", new { id = account.Id }, account);
      }

      [HttpGet("{id}", Name="GetAccount")]
      public async Task<IActionResult> GetAccount(string id)
      {
         TeacherAccount account = await _teacherAccountRepository?.GetByIdAsync(id);
         return Ok(account);
      }

   }
}