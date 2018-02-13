using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using Microsoft.Extensions.Configuration;
using Mongo2Go;
using MongoDB.Bson;
using MyTeacher.Services.Dto;
using MyTeacher.Services.Models;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace MyTeacher.Test
{
    public class TeacherAccountsTest
    {
        private class Constants
        {
            public const int TestServerPort = 5700;

        }

        private readonly MongoDbRunner _runner;
        private readonly TestServer _server;
        private readonly HttpClient _client;
        public static IConfiguration Configuration { get; set; }
        private readonly ITestOutputHelper _output;
        private readonly string _databaseName;
        private IWebHost _webHost;


        public TeacherAccountsTest(ITestOutputHelper output)
        {
            _output = output;
            _runner = MongoDbRunner.Start();

            //Loads the configuration file 
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            TestStartup.ConnectionString = _runner.ConnectionString;

            // Configuration.GetSection("MongoConnection")["ConnectionString"] = _runner.ConnectionString;
            // string connectionStringFromConf = Configuration.GetSection("MongoConnection").GetValue<string>("ConnectionString");

            _databaseName = Configuration.GetSection("MongoConnection").GetValue<string>("Database");

            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?tabs=aspnetcore2x
            // https://codingblast.com/asp-net-core-configuration/
            _webHost = WebHost.CreateDefaultBuilder()
                .UseStartup<TestStartup>()
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Loopback, Constants.TestServerPort);
                })
                .UseContentRoot(@"..\..\..\..\MyTeacher.Web\wwwroot")
                .UseConfiguration(Configuration)
                .Build();

            _webHost.Start();
        }

        [Fact]
        public async void Test1()
        {
            string url = "http://localhost:" + Constants.TestServerPort + "/rest/teacher-accounts/";

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            AccountCreationRequest accountRequest = new AccountCreationRequest()
            {
                FirstName = "Hichem",
                Email = "htaoufik@gmail.com",
                LastName = "Taoufik",
                Password = "Toto48"
            };

            HttpResponseMessage msg;
            msg = await  client.PostAsync(url, new StringContent(JsonConvert.SerializeObject(accountRequest), UnicodeEncoding.UTF8,
                "application/json"));
            Assert.Equal(HttpStatusCode.Created, msg.StatusCode);

            string answer = await msg.Content.ReadAsStringAsync();
            TeacherAccount account = JsonConvert.DeserializeObject<TeacherAccount>(answer);

            Assert.Equal($"{accountRequest.FirstName} {accountRequest.LastName}", account.Name);

            _output.WriteLine(answer);

        }

        public void Dispose()
        {
            _webHost.StopAsync();
        }
    }
}
