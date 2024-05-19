using System.ComponentModel.DataAnnotations;

namespace bookStore_project.Models
{
    public class BookModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Display(Name = "Book's Title")]
        [StringLength(50, ErrorMessage = "Cannot be longer than 50 letters")]
        public string Title { get; set; }

        //The DataType attribute on ReleaseDate specifies the type of the data (Date).
        //With this attribute:
        //1. The user isn't required to enter time information in the date field.
        //2. Only the date is displayed, not time information.
        [Required]
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        [Required]
        [StringLength(150, ErrorMessage = "Cannot be longer than 150 letters")]
        public string Description { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        [Range(0,1000)]
        public double Price { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        
    }
}
