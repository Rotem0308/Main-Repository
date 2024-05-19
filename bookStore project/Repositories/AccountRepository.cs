using bookStore_project.DTO_s;
using bookStore_project.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace bookStore_project.Repository
{
    public class AccountRepository : IAccountRepository
    {

        private readonly UserManager<UserModel> _userManager;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly IConfiguration _configuration;
       
        public AccountRepository(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        public async Task<string> SignupAsync(SignupModel signupModel)
        {
            //mapper can be implemented here  
            UserModel user = new()
            {
                FirstName = signupModel.FirstName,
                LastName = signupModel.LastName,
                Email = signupModel.Email,
                UserName = signupModel.Email
            };

            var res = await _userManager.CreateAsync(user, signupModel.Password);//auto password hashing
            if (!res.Succeeded) throw new Exception(res.Errors.FirstOrDefault().Description);

            user = await _userManager.FindByEmailAsync(user.Email);
            if (user == null) throw new Exception("Error Searching the user in the database");

            //res = await _userManager.AddToRoleAsync(user, _configuration["Roles:Admin"]) - active when register admin
            //res = await _userManager.AddToRoleAsync(user, _configuration["Roles:Admin"]);

            res = await _userManager.AddToRoleAsync(user, _configuration["Roles:User"]);
            if (!res.Succeeded) throw new Exception("Error Assgining user role");
            var userRole = await _userManager.GetRolesAsync(user);
            return userRole[0];
        }
        public async Task<string> LoginAsync(LoginModel loginModel,string role)
        {
            var loginRes = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, false, false);

            var user = await _userManager.FindByEmailAsync(loginModel.Email);

            if (user == null || !loginRes.Succeeded) throw new Exception("Email or Password are incorrect");

            //here we check what is the user Role!
            var isAdmin = await _userManager.IsInRoleAsync(user, _configuration["Roles:Admin"]);

            //checks if the client is really an admin or just a user trying to access as an admin
            if(!isAdmin && role == "admin") { throw new Exception("Not An Admin"); }

            //GenerateToken
            string token = NewToken(user, isAdmin);
            if (String.IsNullOrEmpty(token)) throw new Exception("failed to generate a token");
            return token;
        }

        public async Task<UserModel> UpdateAsync(UpdateAccountDTO updatedAccount,string userId)
        {
           
            var user = await _userManager.FindByIdAsync(userId);
    
            if (user == null) throw new Exception("User Does Not Exist in the database, ");

            if (updatedAccount == null) throw new Exception("no Data was Recieved");
            if (!(updatedAccount.FirstName.Equals(""))) user.FirstName = updatedAccount.FirstName;
            if (!(updatedAccount.LastName.Equals(""))) user.LastName = updatedAccount.LastName;
            if (!(updatedAccount.Email.Equals("")))
            {
                //In ASP.NET Core Identity, the requirement for a username stems from the way
                //the system is designed. The username serves as a unique identifier for users
                //within the system and is commonly used for authentication purposes. 

                //What is SetEmailAsync?
                //the SetEmailAsync method provided by UserManager in ASP.NET Core Identity will
                //update both the email address and its normalized version automatically.
                var userToFind = await _userManager.FindByEmailAsync(updatedAccount.Email);
                if(userToFind != null)
                {
                    if (userToFind.Id.Equals(user.Id)) throw new Exception("Already Your Email");
                    if (userToFind != null) throw new Exception("Email Already Exist");
                }
             
                await _userManager.SetEmailAsync(user, updatedAccount.Email);
                await _userManager.SetUserNameAsync(user, updatedAccount.Email);

                //What is NormalizedEmail?
                //The NormalizedEmail property in ASP.NET Core Identity is used for case -insensitive
                //comparisons and searches when querying users by email address.It stores a normalized
                //version of the email address, typically converted to uppercase, to ensure consistent
                //comparison behavior across different cultures and locales.
            }

            if(!(updatedAccount.Password == "") && !(updatedAccount.ConfirmPassword == "")) 
            {
                if (!updatedAccount.Password.Equals(updatedAccount.ConfirmPassword))
                {
                    throw new Exception("Confirm Password Do Not Match to the Password");
                }
                //var result = await _userManager.ChangePasswordAsync(user, user.PasswordHash, updatedAccount.Password);
                //if(!result.Succeeded) throw new Exception("Had Trouble Hashing Password");
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, updatedAccount.Password);
            }

            //user.Id = userId;
            
              

            var res = await _userManager.UpdateAsync(user);
            if (!res.Succeeded) throw new Exception("failed to update the user");
            

            return user;
        }
        private string NewToken(UserModel user,bool isAdmin)//add here the user field instead of the email
            {
                var authClaims = new List<Claim>
                {//JWT claims are the core information that JWTs transmit
                    new Claim(ClaimTypes.Name,user.Id),
                    new Claim(ClaimTypes.Role,isAdmin ? _configuration["Roles:Admin"] : _configuration["Roles:User"]),
                    //new Claim(ClaimTypes.Role,_configuration["Roles:Admin"]) - active when register admin
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        public async Task<UserModel> GetUserById(string userEmail)
            {
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) throw new Exception("user was not found");
            return user;
        }
        public async Task<UserModel> GetUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new Exception("user was not found");
            return user;
        }

        public async Task<int> GetDiscountAsync(string userId)
        {
            UserModel user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new Exception("user was not found");
            if(!user.Discount.HasValue) return 0;


            return user.Discount.Value;
        }

        public async Task<int> SetDiscountToAllUsersAsync(int discount)
        {
            var users = _userManager.Users.ToList();
            foreach (var user in users)
            {
                user.Discount = discount;
                await _userManager.UpdateAsync(user);
            }

            return discount;
        }
    }
}

