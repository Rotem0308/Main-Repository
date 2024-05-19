using System.ComponentModel.DataAnnotations;

namespace bookStore_project.DTO_s
{
    public class BookUpdateDTO
    {
        //DTO are typically used to communicate with the client

        public string? Title { get; set; }

        //The DataType attribute on ReleaseDate specifies the type of the data (Date).
        //With this attribute:
        //1. The user isn't required to enter time information in the date field.
        //2. Only the date is displayed, not time information.

        [DataType(DataType.Date)]
        public DateTime? ReleaseDate { get; set; }

        public string? Description { get; set; }

        public string? Author { get; set; }

        public string? Genre { get; set; }

        public double? Price { get; set; }

        public string? ImageUrl { get; set; }
    }
}
