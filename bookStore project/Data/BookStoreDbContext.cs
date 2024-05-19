using bookStore_project.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace bookStore_project.Data
{
    public class BookStoreDbContext : IdentityDbContext<UserModel>
    {
        private readonly IConfiguration _configuration;
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        public DbSet<BookModel> Books { get; set; }

        //The OnModelCreating method is typically overridden in a DbContext class to configure the model
        //that EF Core will use to create the underlying database.
        protected override async void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Predefine roles

            //ConcurrencyStamp is used to prevent concurrency update conflict.
            //When working with GUIDs in .NET, it's common to convert them to strings
            //before storing them in a database. This is because many database systems,
            //including SQL Server, PostgreSQL, and MySQL, typically store GUIDs as strings
            //rather than binary data.
            var AdminRole = new IdentityRole
            {
                Id = "1",
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                Name = _configuration["Roles:Admin"],
                NormalizedName = "ADMIN"
            };
            var UserRole = new IdentityRole
            {
                Id = "2",
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                Name = _configuration["Roles:User"],
                NormalizedName = "USER"
            };


            //inserting the roles into our database
            builder.Entity<IdentityRole>().HasData(new List<IdentityRole>
            {
              AdminRole,UserRole
            });
            
        }


     


    }
}
