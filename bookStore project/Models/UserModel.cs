using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace bookStore_project.Models
{
    public class UserModel : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        [Range(0, 100)]
        public int? Discount { get; set; } = 0;

        public List<BookModel>? Books { get; set; }
    }
}
