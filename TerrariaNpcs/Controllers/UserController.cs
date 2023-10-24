using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            if (userResponse == null)  return BadRequest("User or pass incorrect"); 

            return Ok(userResponse);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            user.Password = Utilities.GetSHA256(user.Password);
            User createdUser = await _userService.SaveUser(user);
            if (createdUser != null)
            {
                return Ok(createdUser);
            }
            return BadRequest("user could not be created");
        }
    }
}
