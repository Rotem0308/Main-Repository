using AutoMapper;
using bookStore_project.Data;
using bookStore_project.DTO_s;
using bookStore_project.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Net;
using static System.Reflection.Metadata.BlobBuilder;

namespace bookStore_project.Repository
{
    public class BooksRepository : IBooksRepository
    {
        private readonly BookStoreDbContext _context;

        public BooksRepository(BookStoreDbContext context)
        {
            this._context = context;  
        }

        public async Task<List<BookModel>> GetAllBooksAsync(int? skip, int? limit, string? searcValue)
        {
            var books = await _context.Books.ToListAsync();
            if (books.Count == 0) throw new Exception("No Books in the Database");
            
            if (skip.HasValue && limit.HasValue )
            {
                if(searcValue != null)
                {
                    return books.FindAll((b) => b.Title.Contains(searcValue) );
                }
               return books.Skip(skip.Value).Take(limit.Value).ToList();
            }
            
            return books;
        }
        public async Task<int> GetAllBooksCountAsync(string? searcValue)
        {
            var books = await _context.Books.ToListAsync();
            if (searcValue != null)
            {
                return books.FindAll((b) => b.Title.Contains(searcValue)).Count(); ;
            }
            return _context.Books.Count();

        }
        public async Task<BookModel> GetBookByIdAsync(int bookId)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == (bookId));
            return book;
        }
        public async Task<BookModel> AddBookAsync(BookDTO bookDto)
        {
            BookModel book = new() 
            {
                Title = bookDto.Title,
                Description = bookDto.Description ,
                ReleaseDate = bookDto.ReleaseDate,
                Author = bookDto.Author,
                Genre = bookDto.Genre,
                Price = bookDto.Price,
                ImageUrl = bookDto.ImageUrl
            };
            if (book == null) throw new Exception("Book cannot be created in the addbookAsync Method");
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

            return book;
        }
        public async Task<BookModel> UpdateBookAsync(BookUpdateDTO updatedBook, int bookId)
        {
            
            //// AutoMapper will dynamically map only the properties present in the BookDTO object to the corresponding properties in the BookModel
            //_mapper.Map(bookDTO, book);

            var book = await _context.Books.FindAsync(bookId);
            if (book == null) throw new Exception("book not found in database");

            if (updatedBook.ReleaseDate.HasValue) book.ReleaseDate = updatedBook.ReleaseDate.Value; 
            if (!updatedBook.Author.Equals("")) book.Author = updatedBook.Author;
            if (!updatedBook.Description.Equals("")) book.Description = updatedBook.Description;
            if (updatedBook.Price.HasValue) book.Price = updatedBook.Price.Value;
            if (!updatedBook.ImageUrl.Equals("")) book.ImageUrl = updatedBook.ImageUrl;
            if (!updatedBook.Genre.Equals("")) book.Genre = updatedBook.Genre;
            if (!updatedBook.Title.Equals("")) book.Title = updatedBook.Title;
           
            await _context.SaveChangesAsync();

            return book;
        }
        public async Task<BookModel> DeleteBookAsync(int bookId)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id.Equals(bookId));
            if (book == null) throw new Exception("Book Does Not Exist In The Database");
            
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return book;
        }

        
    }
}
