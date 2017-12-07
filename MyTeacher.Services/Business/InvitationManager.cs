using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MyTeacher.Models;
using MyTeacher.Services.Models;

namespace MyTeacher.Services.Business
{
   public class InvitationManager
   {
      private readonly IMongoRepository<Invitation> _invitationRepository;

      public InvitationManager(UnitOfWork database)
      {
         _invitationRepository = database.Invitations;
      }

      /// <summary>
      /// Sends the invitation, should we store it in this function ?
      /// </summary>
      /// <param name="invitation"></param>
      /// <returns></returns>
      public Task SendInvitationAsync(Invitation invitation)
      {
         // TODO: Add the logic to send the invitation

         // Now we only store it
         return _invitationRepository.AddAsync(invitation);
      }

   }
}
