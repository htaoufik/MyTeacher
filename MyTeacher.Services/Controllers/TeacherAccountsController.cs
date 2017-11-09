using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
         // TODO: Creates an account and the associated user ... but what if one of the actions fails ? 

         // Check if the user already exist
         if ((await _userRepository.FindAsync(u => u.Email == accountCreationRequest.Email)).Any())
         {
            // TODO: add an generic error handler somewhere !
            return BadRequest(new {description = "User already exist", code = "MT-002"});
         }

         // Lets create the user
         User user = new User()
         { 
            Email = accountCreationRequest.Email,
            FirstName = accountCreationRequest.FirstName,
            LastName = accountCreationRequest.LastName,
            Password = SessionsController.HashPassword(accountCreationRequest.Password)
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