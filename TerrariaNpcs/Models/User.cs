using System;
using System.Collections.Generic;

namespace TerrariaNpcs.Models
{
    public partial class User
    {
        public User()
        {
            Npcs = new HashSet<Npc>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public virtual ICollection<Npc> Npcs { get; set; }
    }
}
