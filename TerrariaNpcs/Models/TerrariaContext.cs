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
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-I1MGUJ1\\SQLEXPRESS;Database=Terraria;User ID=sa;Password=19990518;Trusted_Connection=True;");
            }
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

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Npcs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_npcs_users");
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
