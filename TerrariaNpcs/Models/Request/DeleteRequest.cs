using System.ComponentModel.DataAnnotations;

namespace TerrariaNpcs.Models.Request
{
    public class DeleteRequest
    {
        [Required]
        public int userId { get; set; }
        [Required]
        public int npcId { get; set; }
    }
}
