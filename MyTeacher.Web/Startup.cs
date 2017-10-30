using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyTeacher.Models;
using MyTeacher.Services.Models;
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


         // Configure the authentication and cookie service
         // Needed services for authentication following guideline: https://github.com/aspnet/Docs/blob/master/aspnetcore/security/authentication/cookie.md
         // The login path is used when the user tries to access a service without access rights
         services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
               options.LoginPath = "/rest/system";
            });
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
         if (env.IsDevelopment())
         {
            app.UseDeveloperExceptionPage();
         }

         // Adds an exception handler to return json error object on uncatched exceptions
         // Check this link for an interesting article: https://blog.kloud.com.au/2016/03/23/aspnet-core-tips-and-tricks-global-exception-handling/
         app.UseExceptionHandler(
            builder =>
            {
               const string defaultCode = "MT-001";
               builder.Run(
                  async context =>
                  {
                     context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                     context.Response.ContentType = "application/json";

                     var error = context.Features.Get<IExceptionHandlerFeature>();
                     if (error != null)
                     {
                        await context.Response.WriteAsync( 
                           JsonConvert.SerializeObject(new { description = error.Error.Message, code = defaultCode })
                        ).ConfigureAwait(false);
                     }
                  });
            });


         app.UseDefaultFiles(); // For index.html
         app.UseStaticFiles(); // For the wwwroot folder

         // Acvitate the authentication service
         app.UseAuthentication();

         app.UseMvc();
      }
   }
}
