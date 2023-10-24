using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TerrariaNpcs.Models;
using TerrariaNpcs.Models.Common;
using TerrariaNpcs.Models.Request;
using TerrariaNpcs.Models.Response;
using TerrariaNpcs.Resources;
using TerrariaNpcs.Services.Contract;

namespace TerrariaNpcs.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly TerrariaContext _context;
        private readonly AppSettings _appSettings;
        public UserService(TerrariaContext context,IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings= appSettings.Value;
        }

        public async Task<UserResponse> GetUser(AuthRequest model)
        {
            UserResponse response = new UserResponse();
            string EncPassword=Utilities.GetSHA256(model.Password); 
            User user = await _context.Users.Where(u=>u.Email == model.Email && u.Password== EncPassword).FirstOrDefaultAsync();
            if (user == null) return null;
            response.Email = user.Email;
            response.Name = user.Name;
            response.Token = GetToken(user);
            return response;
        }

        public async Task<User> SaveUser(User user)
        {
            User Test= await _context.Users.Where(u => u.Email == user.Email ).FirstOrDefaultAsync();
            if (user != null) return null;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        private string GetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                        new Claim(ClaimTypes.Email,user.Email),
                        new Claim(ClaimTypes.Name,user.Name),

                    }
                    ),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
