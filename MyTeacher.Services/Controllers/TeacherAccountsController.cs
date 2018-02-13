using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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

        /// <summary>
        /// Use this service to create a new teacher account
        /// </summary>
        /// <param name="accountCreationRequest"></param>
        /// <returns></returns>
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

            return CreatedAtRoute("GetAccount", new { id = account.Id }, account);
        }

        /// <summary>
        /// Use this service to get a teacher account information from an id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetAccount")]
        public async Task<IActionResult> GetAccount(string id)
        {
            TeacherAccount account = await _teacherAccountRepository?.GetByIdAsync(id);
            return Ok(account);
        }

        /// <summary>
        /// Use this function to add a student to a teacher account
        /// This service should be called by the student
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
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

            // In the current version we have only one account per student associated to one teacher
            User userFromDatabase =
               await _userRepository.FindAsync(u => u.Email == user.Email).Result.FirstOrDefaultAsync();
            if (userFromDatabase != null)
            {
                MyTeacherError.UserAlreadyExist.Throw();
            }

            // Now we create the user
            // Lets create the user
            user.Password = SessionsController.HashPassword(user.Password);
            await _userRepository.AddAsync(user);

            // If the list of student is empty we must create it !
            if (account.Students == null)
            {
                account.Students = new List<string>();
            }

            // Cannot add the same user twice (not really usefull as we can only add users that do not exist, but let's keep it)
            if (account.Students.Contains(user.Id))
            {
                MyTeacherError.AlreadyStudent.Throw();
            }

            // Adds the student to the list
            account.Students.Add(user.Id);

            await _teacherAccountRepository.UpdateAsync(account);

            return Ok();
        }

        /// <summary>
        /// Use this function to invite a student
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("{id}/invitations", Name = "InviteStudent")]
        public async Task<IActionResult> InviteStudent(string id, [FromBody] Invitation invitation)
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
                await _invitationManager.SendAndStoreInvitationAsync(invitation);
            }

            return Ok();
        }

        /// <summary>
        /// Use this service to get a teacher account information from an id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}/invitations", Name = "GetInvitationForAccount")]
        public async Task<IActionResult> GetInvitationForAccount(string id)
        {
            return Ok(await _invitationManager.ListInvitationsForAccount(id));
        }
    }
}