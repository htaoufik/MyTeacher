using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyTeacher.Models;
using MyTeacher.Services.Business;
using MyTeacher.Services.Models;
using MyTeacher.Services.Utils.Services;
using Newtonsoft.Json;

namespace MyTeacher.Web
{
   public class Startup
   {
      public Startup(IConfiguration configuration)
      {
         Configuration = configuration;
      }

      public IConfiguration Configuration { get; }


      // This method gets called by the runtime. Use this method to add services to the container.
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMvc();

         // Adds services required for using options.
         services.AddOptions();

         // Register the IConfiguration instance which MongoDbOptions binds against.
         IConfigurationSection section = Configuration.GetSection("MongoConnection");
         services.Configure<MongoOptions>(section);
         services.AddScoped<UnitOfWork>();
         services.AddScoped<MongoContext>();
         services.AddScoped<InvitationManager>();


         // Configure the authentication and cookie service
         // Needed services for authentication following guideline: https://github.com/aspnet/Docs/blob/master/aspnetcore/security/authentication/cookie.md
         // The login path is used when the user tries to access a service without access rights
         services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
               options.Events.OnRedirectToLogin = context =>
               {
                  context.Response.StatusCode = (int) HttpStatusCode.Forbidden;
                  return Task.CompletedTask;
               };
            });
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
         if (env.IsDevelopment())
         {
            app.UseDeveloperExceptionPage();
         }

         // Route all unknown requests to app root
         app.Use(async (context, next) =>
         {
            await next();

            // If there's no available file and the request doesn't contain an extension, we're probably trying to access a page.
            // Rewrite request to use app root
            if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            {
               context.Request.Path = "/index.html"; // Put your Angular root page here 
               context.Response.StatusCode = 200; // Make sure we update the status code, otherwise it returns 404
               await next();
            }
         });

         // Adds an exception handler to return json error object on uncatched exceptions
         // Check this link for an interesting article: https://blog.kloud.com.au/2016/03/23/aspnet-core-tips-and-tricks-global-exception-handling/
         app.UseExceptionHandler( ErrorHandler.AddExceptionHandler );


         app.UseDefaultFiles(); // For index.html
         app.UseStaticFiles(); // For the wwwroot folder

         // Acvitate the authentication service
         app.UseAuthentication();

         app.UseMvc();
      }
   }
}
