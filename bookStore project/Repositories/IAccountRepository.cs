using bookStore_project.DTO_s;
using bookStore_project.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;

namespace bookStore_project.Repository
{
    public interface IAccountRepository
    {
        Task<string> SignupAsync(SignupModel signupModel);
        Task<string> LoginAsync(LoginModel loginModel,string role);
        Task<UserModel> GetUserById(string userId);
        Task<UserModel> UpdateAsync(UpdateAccountDTO updatedAccount, string userId);
        Task<int> GetDiscountAsync(string userId);
        Task<int> SetDiscountToAllUsersAsync(int discount);
        Task<UserModel> GetUserAsync(string userId);

    }
}