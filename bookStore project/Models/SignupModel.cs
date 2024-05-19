using System.ComponentModel.DataAnnotations;

namespace bookStore_project.Models
{
    public class SignupModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Compaired Password Invalid")]
        public string ConfirmPassword { get; set; }
    }
}
