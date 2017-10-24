using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTeacher.Models;
using Microsoft.Extensions.Options;
using MyTeacher.Utils.Services;

namespace MyTeacher.Controllers
{
    [Route("rest/teacher-accounts")]
    public class TeacherAccountsController : MongoEntityController<TeacherAccount>
    {
        public TeacherAccountsController(UnitOfWork database ): base(database)
        {
        }
    }
}
