using bookStore_project.DTO_s;
using bookStore_project.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace bookStore_project.Repository
{
    public interface IBooksRepository
    {
        
        
        Task<BookModel> GetBookByIdAsync(int bookId);
        Task<BookModel> AddBookAsync(BookDTO bookDTO);
        Task<BookModel> UpdateBookAsync(BookUpdateDTO updatedBook, int bookId);
        Task<BookModel> DeleteBookAsync(int bookId);
        Task<List<BookModel>> GetAllBooksAsync(int? skip, int? limit, string? searcValue);

        Task<int> GetAllBooksCountAsync(string? searcValue);
    }
}