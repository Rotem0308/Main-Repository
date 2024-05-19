using bookStore_project.DTO_s;
using bookStore_project.Models;
using bookStore_project.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace bookStore_project.Controllers
{
    [Route("BookStore/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpGet("Discount")]
        public async Task<IActionResult> GetDiscount()
        {
            try
            {
                var user = User.Identity.GetUserName();
                int discount = await _accountRepository.GetDiscountAsync(user);
                return Ok(discount);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            
        }
        [HttpGet("Discount/{discount}")]
        public async Task<IActionResult> SetDiscountToAllUsers(int discount)
        {
            var discountAmount = await _accountRepository.SetDiscountToAllUsersAsync(discount);
            return Ok(new{ discountAmount});
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup([FromBody] SignupModel signupModel)
        {
            try
            {
                var userRole = await _accountRepository.SignupAsync(signupModel);
                return Ok(new { userRole });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
                    
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
           
            try
            {
                string role = User.IsInRole("Admin") ? "Admin" : "User";
                var res = await _accountRepository.LoginAsync(loginModel,role);
                
                var user = await _accountRepository.GetUserById(User.Identity.GetUserName());
                
                return Ok(new { token = res,role,user });
            }
            catch (Exception e)
            {
                if (e.Message == "failed to generate a token")
                    return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
                return BadRequest(new {message = e.Message});
            }
           
            
        }

        //[HttpGet("User")]
        //public async Task<IActionResult> GetUser()
        //{
        //    var user = await _accountRepository.GetUserAsync(User.Identity.GetUserName());
        //    var role = User.IsInRole("Admin") ? "Admin": "User";
        //    return Ok(new { role, user });
        //}


        [HttpPatch("")]
        public async Task<IActionResult> UpdateAccount(UpdateAccountDTO updatedAccount)
        {
            try
            {
                var userId = User.Identity.GetUserName();
                var user = await _accountRepository.UpdateAsync(updatedAccount, userId);
                return Ok(user);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message, user = User.Identity.GetUserName() });
            }
            
           
        }


    }
}
