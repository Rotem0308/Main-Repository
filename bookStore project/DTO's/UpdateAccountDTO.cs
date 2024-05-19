using System.ComponentModel.DataAnnotations;

namespace bookStore_project.DTO_s
{
    public class UpdateAccountDTO
    {
     
        public string FirstName { get; set; }
    
        public string LastName { get; set; }
        
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
