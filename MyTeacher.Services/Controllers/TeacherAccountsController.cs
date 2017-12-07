using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MyTeacher.Models;
using MyTeacher.Services.Business;
using MyTeacher.Services.Dto;
using MyTeacher.Services.Models;
using MyTeacher.Services.Utils.Services;
using MyTeacher.Utils.Services;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/teacher-accounts")]
   public class TeacherAccountsController : Controller
   {
      private readonly IMongoRepository<TeacherAccount> _teacherAccountRepository;
      private readonly IMongoRepository<User> _userRepository;
      private readonly InvitationManager _invitationManager;


      public TeacherAccountsController(UnitOfWork database, InvitationManager invitationManager)
      {
         _teacherAccountRepository = database.Repository<TeacherAccount>();
         _userRepository = database.Repository<User>();
         _invitationManager = invitationManager;
      }

      [HttpPost]
      public async Task<IActionResult> CreateAccount([FromBody] AccountCreationRequest accountCreationRequest)
      {
         // TODO: Creates an account and the associated user ... but what if one of the actions fails ? 

         // Check if the user already exist
         if ((await _userRepository.FindAsync(u => u.Email == accountCreationRequest.Email)).Any())
         {
            MyTeacherError.UserAlreadyExist.Throw();
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

         return CreatedAtRoute("GetAccount", new {id = account.Id}, account);
      }

      [HttpGet("{id}", Name = "GetAccount")]
      public async Task<IActionResult> GetAccount(string id)
      {
         TeacherAccount account = await _teacherAccountRepository?.GetByIdAsync(id);
         return Ok(account);
      }

      [Authorize]
      [HttpPost("{id}/students", Name = "AddStudent")]
      public async Task<IActionResult> AddStudent(string id, [FromBody] User user)
      {
         // TODO: Add some code so that only the owner of the account can add a student

         // Get's the associated account
         TeacherAccount account = await _teacherAccountRepository?.GetByIdAsync(id);
         if (account == null)
         {
            MyTeacherError.AccountNotFound.Throw();
         }

         // Tries to get the user
         User userFromDatabase =
            await _userRepository.FindAsync(u => u.Email == user.Email).Result.FirstOrDefaultAsync();
         if (userFromDatabase == null)
         {
            MyTeacherError.StudentNotFound.Throw();
         }

         // Cannot add owner as student
         if (userFromDatabase.Id == account.OwnerId)
         {
            MyTeacherError.CannotAddOwnerAsStudent.Throw();
         }

         // If the list of student is empty we must create it !
         if (account.Students == null)
         {
            account.Students = new List<string>();
         }

         // Cannot add the same user twice
         if (account.Students.Contains(userFromDatabase.Id))
         {
            MyTeacherError.AlreadyStudent.Throw();
         }

         // Adds the student to the list
         account.Students.Add(userFromDatabase.Id);

         await _teacherAccountRepository.UpdateAsync(account);

         return Ok();
      }

      /// <summary>
      /// Returns the invitations sent to students for this teacher account
      /// </summary>
      /// <param name="id"></param>
      /// <param name="user"></param>
      /// <returns></returns>
      [Authorize]
      [HttpPost("{id}/invitations", Name = "SendInvitation")]
      public async Task<IActionResult> SendInvitation(string id, [FromBody] Invitation invitation)
      {
         // Get's the associated account
         TeacherAccount account = await _teacherAccountRepository?.GetByIdAsync(id);
         if (account == null)
         {
            MyTeacherError.AccountNotFound.Throw();
         }

         // Check if the user do not already exist in the database
         // Tries to get the user
         User userFromDatabase =
            await _userRepository.FindAsync(u => u.Email == invitation.Email).Result.FirstOrDefaultAsync();
         if (userFromDatabase != null)
         {
            MyTeacherError.UserAlreadyExist.Throw();
         }

         // TODO check if we can send more than one invitation for the same user/account
         
         // Send the invitation
         if (invitation == null)
         {
            MyTeacherError.MalformedInvitation.Throw("The invitation is null !");
         }
         else
         {
            await _invitationManager.SendInvitationAsync(invitation);
         }

         return Ok();
      }
   }
}