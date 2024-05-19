
using bookStore_project.Data;
using bookStore_project.Filters;
using bookStore_project.Models;
using bookStore_project.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace bookStore_project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //DataBase:Start
            builder.Services.AddDbContext<BookStoreDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("BookStoreAPIPublic"));
            });

            builder.Services.AddIdentity<UserModel, IdentityRole>().AddEntityFrameworkStores<BookStoreDbContext>().AddDefaultTokenProviders();
            //DataBase:End

            //Configuration to prevent db entities infinit loop: Start
            builder.Services.AddControllers()
                .AddNewtonsoftJson(opt =>
            {//Serializer = סידורי
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            }); 
            //Configuration to prevent db entities infinit loop: End

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            ////AutoMapper
            ////An assembly in .NET is a compiled unit of code that contains types and resources.
            ////This is adding AutoMapper to the dependency injection container (IServiceCollection) in an ASP.NET Core application. 
            //builder.Services.AddAutoMapper(typeof(Program).Assembly);

            //password setting in identity
            builder.Services.Configure<IdentityOptions>(options =>
            {
                
                // Default Password settings(only changed the min length to be 8)
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

            });


            // allow to use swagger with authoriztion
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
             {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
              }
             });
            });

            //Cors Configuration: Start
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
                });
            });
            //Cors Configuration: End


            //Configure the authentication Start
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>//This method adds the JWT bearer authentication handler to the authentication services.
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    //Clock skew occurs when the clock time on one computer differs from the clock time on another computer.
                    //It is a common occurrence but can cause problems whenever you specify a validity time in a license.
                    ClockSkew = TimeSpan.Zero,//The validation parameters have a default clock skew of 5 minutes
                    ValidateIssuer = true,//Specifies whether to validate the issuer of the token.
                    ValidateAudience = true,//Specifies whether to validate the audience of the token.
                    ValidateLifetime = true,// Check token expiration
                    ValidAudience = builder.Configuration["JWT:ValidAudience"],
                    ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
                };
            });
            //Configure the authentication End


            builder.Services.AddTransient<IBooksRepository, BooksRepository>();
            builder.Services.AddTransient<IAccountRepository, AccountRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors();
            //routing zone
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.MapControllers();

       
            app.Run();
        }
    }
}
//migration syntax:
//Add-Migration AddIdentity
//Update - Database