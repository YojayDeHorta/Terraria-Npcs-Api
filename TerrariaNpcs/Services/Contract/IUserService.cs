using Microsoft.EntityFrameworkCore;
using TerrariaNpcs.Models;
using TerrariaNpcs.Models.Request;
using TerrariaNpcs.Models.Response;

namespace TerrariaNpcs.Services.Contract
{
    public interface IUserService
    {
        Task<UserResponse> GetUser(AuthRequest model);
        Task<User> SaveUser(User user);
    }
}
