using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TerrariaNpcs.Models;
using TerrariaNpcs.Models.Request;
using TerrariaNpcs.Resources;
using TerrariaNpcs.Services.Contract;

namespace TerrariaNpcs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authentificar([FromBody] AuthRequest model)
        {
            var userResponse = await _userService.GetUser(model);
            if (userResponse != null) return Ok(userResponse);
            return BadRequest(new { error=true,message= "User or pass incorrect" }); 

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            try
            {
                var decryptedPassword = user.Password;
                user.Password = Utilities.GetSHA256(user.Password);
                User createdUser = await _userService.SaveUser(user);
                if (createdUser == null) return BadRequest(new { error = true, message = "Existing email, please try another email" });
                AuthRequest request = new AuthRequest();
                request.Email=createdUser.Email;
                request.Password=decryptedPassword;
                
                return await Authentificar(request);
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new { error = true, message = "Internal server error" });

            }
        }
    }
}
