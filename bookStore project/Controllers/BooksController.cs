using bookStore_project.DTO_s;
using bookStore_project.Models;
using bookStore_project.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace bookStore_project.Controllers
{
    [Route("BookStore/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly IBooksRepository _booksRepository;

        public BooksController(IBooksRepository booksRepository)
        {
            this._booksRepository = booksRepository;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetBookById([FromRoute]int bookId)
        {
            var book = await _booksRepository.GetBookByIdAsync(bookId);
            if (book == null) BadRequest("Book Does Not Exist In The Database " + bookId.ToString());
            return Ok(book);
        }


        //[Authorize(Roles = "Admin")]
        [HttpGet("")]
        public async Task<IActionResult> GetAllBooks(int? skip,int?limit, string? searcValue)
        {
            try
            {
                var books = await _booksRepository.GetAllBooksAsync(skip,limit,searcValue);
                var bookCount = await _booksRepository.GetAllBooksCountAsync(searcValue);
                return Ok(new { books, bookCount });
            }
            catch (Exception ex)
            {
                if(ex.Message == "No Books in the Database")
                    return StatusCode(StatusCodes.Status204NoContent, ex.Message);
                else return StatusCode(StatusCodes.Status500InternalServerError, "Server Is Down...");
            }
            
        }

        [HttpPost("")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBook([FromBody]BookDTO bookDTO)
        {
            try
            {
                var book = await _booksRepository.AddBookAsync(bookDTO);
                return Ok(book);
            }
            catch (Exception ex)
            {
                if (ex.Message == "Book cannot be created in the addbookAsync Method")
                    return StatusCode(StatusCodes.Status204NoContent, ex.Message);
                else return StatusCode(StatusCodes.Status500InternalServerError, "Server Is Down...");
            }

        }

        [HttpPatch("{bookId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBook([FromBody] BookUpdateDTO updatedBook, [FromRoute]int bookId)
        {
            try
            {
                
                var book = await _booksRepository.UpdateBookAsync(updatedBook, bookId);
                return Ok(book);
            }
            catch (Exception ex)
            {
                if (ex.Message == "Book cannot be created in the addbookAsync Method")
                    return StatusCode(StatusCodes.Status204NoContent, ex.Message);
                return  Ok(ex.Message);
                //else return StatusCode(StatusCodes.Status500InternalServerError, "Server Is Down...");
            }

        }
        [HttpDelete("{bookId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBook([FromRoute] int bookId)
        {
            try
            {
                var book = await _booksRepository.DeleteBookAsync(bookId);
                return Ok(new {message = "Book was deleted successfully"});
            }
            catch (Exception ex)
            {
                if (ex.Message == "Book Does Not Exist In The Database")
                    return StatusCode(StatusCodes.Status204NoContent, ex.Message);
                else return StatusCode(StatusCodes.Status500InternalServerError, "Server Is Down...");
            }

        }
    }
}
//how to perform updating to an entity form without 