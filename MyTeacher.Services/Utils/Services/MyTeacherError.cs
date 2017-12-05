using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace MyTeacher.Services.Utils.Services
{
   public class MyTeacherError : Exception
   {
      public string Code { get; set; }
      public string Description { get; set; }
      public HttpStatusCode HttpStatusCode { get; set; }

      public MyTeacherError(string code, string description, HttpStatusCode httpStatusCode)
      {
         Code = code;
         Description = description;
         HttpStatusCode = httpStatusCode;
      }

      public void Throw()
      {
         throw this;
      }

      public void Throw(string description)
      {
         throw new MyTeacherError(Code, description, HttpStatusCode);
      }


      // Application Errors
      public static MyTeacherError WrongCredentials = new MyTeacherError("MT-002","Wrong credentials",HttpStatusCode.Unauthorized);
      public static MyTeacherError UserAlreadyExist = new MyTeacherError("MT-003", "User already exist",(HttpStatusCode) 422 );
      public static MyTeacherError AccountNotFound = new MyTeacherError("MT-004", "Account not found", HttpStatusCode.NotFound);
      public static MyTeacherError StudentNotFound = new MyTeacherError("MT-005", "The student account could not be found ", (HttpStatusCode)422);
      public static MyTeacherError AlreadyStudent = new MyTeacherError("MT-006", "You cannot add a student twice to the same account", (HttpStatusCode)422);
      public static MyTeacherError CannotAddOwnerAsStudent = new MyTeacherError("MT-007", "You cannot add the teacher as a student", (HttpStatusCode)422);
      public static MyTeacherError MalformedInvitation = new MyTeacherError("MT-008", "Malformed invitation", HttpStatusCode.BadRequest);

   }
}
