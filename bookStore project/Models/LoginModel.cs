using System.ComponentModel.DataAnnotations;

namespace bookStore_project.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
