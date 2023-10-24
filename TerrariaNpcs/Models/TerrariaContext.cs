using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TerrariaNpcs.Models
{
    public partial class TerrariaContext : DbContext
    {
        public TerrariaContext()
        {
        }

        public TerrariaContext(DbContextOptions<TerrariaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Npc> Npcs { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Npc>(entity =>
            {
                entity.ToTable("npcs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Biome)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("biome");

                entity.Property(e => e.Damage).HasColumnName("damage");

                entity.Property(e => e.Defense).HasColumnName("defense");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.ImgLink)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("img_link");

                entity.Property(e => e.ImgName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("img_name");

                entity.Property(e => e.MaxLife).HasColumnName("max_life");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Speciality)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("speciality");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
