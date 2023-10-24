using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using TerrariaNpcs.Services.Contract;
using TerrariaNpcs.Models;
using TerrariaNpcs.Resources;

namespace TerrariaNpcs.Controllers
{
    public class LoginController : Controller
    {/*
        private readonly IUserService _userService;
        public LoginController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            user.Password= Utilities.EncryptKey(user.Password);
            User createdUser =await _userService.SaveUser(user);
            if (createdUser != null)
            {
                return Ok(createdUser);
            }
            return BadRequest("user could not be created");
        }
        
        [HttpPost]
        public async Task<IActionResult> Login(string email,string password)
        {
            User FoundUser=await _userService.GetUser(email,Utilities.EncryptKey(password));

            if (FoundUser == null)
            {
                BadRequest("user not found");
            }
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name,FoundUser.Name)
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
            AuthenticationProperties properties = new AuthenticationProperties()
            {
                AllowRefresh = true
            };
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                properties
            );
            return Ok(FoundUser);
        }*/
    }
}
