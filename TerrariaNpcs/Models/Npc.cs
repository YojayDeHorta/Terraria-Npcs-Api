﻿using System;
using System.Collections.Generic;

namespace TerrariaNpcs.Models
{
    public partial class Npc
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? Damage { get; set; }
        public int? MaxLife { get; set; }
        public int? Defense { get; set; }
        public string? ImgLink { get; set; }
        public string? ImgName { get; set; }
    }
}
