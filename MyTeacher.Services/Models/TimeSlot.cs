using System;

namespace MyTeacher.Services.Models
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