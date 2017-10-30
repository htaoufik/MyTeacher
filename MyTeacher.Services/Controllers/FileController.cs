using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyTeacher.Services.Controllers
{
   [Route("rest/files")]
   public class FileController
   {
      [HttpPost]
      public async Task<IActionResult> Post(List<IFormFile> files)
      {
         long size = files.Sum(f => f.Length);

         // full path to file in temp location
         string filePath = Path.GetTempFileName();

         foreach (IFormFile formFile in files)
         {
            if (formFile.Length > 0)
            {
               using (var stream = new FileStream(filePath, FileMode.Create))
               {
                  await formFile.CopyToAsync(stream);
               }
            }
         }

         // process uploaded files
         // Don't rely on or trust the FileName property without validation.

         return new OkResult();
      }
   }
}