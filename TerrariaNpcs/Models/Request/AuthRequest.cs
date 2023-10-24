using System.ComponentModel.DataAnnotations;

namespace TerrariaNpcs.Models.Request
{
    public class AuthRequest
    {
        [Required]
        public string Email {  get; set; }
        [Required]
        public string Password { get; set; }
        public AuthRequest() { }
    }
}
