using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using MyTeacher.Web;

namespace MyTeacher.Test
{
    public class TestStartup : Startup
    {
        public static string ConnectionString;

        public TestStartup(IConfiguration conf) : base(conf)
        {
            conf.GetSection("MongoConnection")["ConnectionString"] = ConnectionString;
                }

    }
}
