using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTeacher.Models
{
    public class TimeSlot
    {

        enum Frenquency
        {
            Daily,
            Weekly,
            BiWeekly,
            Monthly
        }

        DateTime startDate;
        DateTime endDate;
        Frenquency frenquency;
    }
}
