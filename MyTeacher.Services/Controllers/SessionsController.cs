using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MyTeacher.Models;
using MyTeacher.Services.Dto;
using MyTeacher.Services.Models;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/sessions")]
   public class SessionsController : Controller
   {
      private readonly IMongoRepository<User> _userRepository;

      public static string HashPassword(string password)
      {
         // Hash the password
         // SHA512 is disposable by inheritance.  
         using (var sha256 = SHA256.Create())
         {
            // Send a sample text to hash.  
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            // Get the hashed string.  
            return  BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
         }
      }

      public SessionsController(UnitOfWork database)
      {
         _userRepository = database.Repository<User>();
      }

      [HttpPost]
      public async Task<IActionResult> CreateSession([FromBody] SessionRequest request)
      {
         var results = await _userRepository.FindAsync(u => u.Password == HashPassword(request.Password));

         User foundUser = results.FirstOrDefault();

         if (foundUser == null)
         {
            return Unauthorized();
         }

         // First version, we create claims from the email address !
         var claims = new List<Claim>
         {
            new Claim(ClaimTypes.Email, foundUser.Email)
         };
         ClaimsIdentity identity = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);

         // Set the claims !
         await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity));

         return Ok();
      }

      [HttpDelete]
      public async Task<IActionResult> DeleteSession()
      {
         /*
          * We can check the claims
            ClaimsPrincipal principal = HttpContext.User as ClaimsPrincipal;
            Claim emailClaim = principal.Claims.FirstOrDefault(q => q.Type == ClaimTypes.Email);
         */

         // Delete the current session cookie
         await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);

         return Ok();
      }
   }
}