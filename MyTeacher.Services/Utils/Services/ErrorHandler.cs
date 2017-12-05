using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace MyTeacher.Services.Utils.Services
{
   public class ErrorHandler
   {
      public static void AddExceptionHandler(IApplicationBuilder builder)
      {
         const string defaultCode = "MT-001";
         builder.Run(
            async context =>
            {
               context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
               context.Response.ContentType = "application/json";

               IExceptionHandlerFeature error = context.Features.Get<IExceptionHandlerFeature>();
               if (error != null)
               {
                  if (error.Error is MyTeacherError myTeacherError)
                  {
                     context.Response.StatusCode = (int) myTeacherError.HttpStatusCode;
                     await context.Response.WriteAsync(
                        JsonConvert.SerializeObject(new { description = myTeacherError.Description, code = myTeacherError.Code })
                     ).ConfigureAwait(false);
                  }
                  else
                  {
                     await context.Response.WriteAsync(
                        JsonConvert.SerializeObject(new { description = error.Error.Message, code = defaultCode })
                     ).ConfigureAwait(false);
                  }
               }
            });
      }





   }
}
