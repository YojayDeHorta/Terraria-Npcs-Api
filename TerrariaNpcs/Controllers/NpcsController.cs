using Firebase.Auth;
using Firebase.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using TerrariaNpcs.Models;
using TerrariaNpcs.Models.Request;

namespace TerrariaNpcs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NpcsController : Controller
    {
        private readonly TerrariaContext _context;
        public NpcsController(TerrariaContext contexto) {
            _context = contexto;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get( int page=1, string? search = null)
        {
            if(search == null)
            {
                List<Npc> npcs = await _context.Npcs.OrderByDescending(b => b.Id)
                .Skip((page-1)*5).Take(5).ToListAsync();
                float totalRecords = await _context.Npcs.CountAsync();
                return Ok(new { page,totalPages= (int)Math.Ceiling(totalRecords /5), data = npcs });
            }
            List<Npc> npcsSearch = await _context.Npcs.Where(s => s.Name!.Contains(search))
                .Skip((page - 1) * 5).Take(5).ToListAsync();
            float totalRecordsSearch = await _context.Npcs.Where(s => s.Name!.Contains(search)).CountAsync();
            return Ok(new {  search,  page, totalPages = (int)Math.Ceiling(totalRecordsSearch / 5), data = npcsSearch });
        }
        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var npc = await _context.Npcs.FindAsync(id);
            if (npc == null) { return NotFound(); }
            return Ok(npc);
        }
        [HttpGet("user/{UserId:int}")]
        public async Task<IActionResult> GetByUserId(int UserId, int page = 1)
        {
            //var npcs = await _context.Npcs.Where(u => u.UserId == UserId).OrderBy(b => b.Id)
            var npcs = await _context.Npcs.Where(u => u.UserId == UserId).OrderByDescending(b => b.Id)
            .Skip((page - 1) * 5).Take(5).ToListAsync();
            //if (npc == null || !npc.Any()) { return NotFound(); }
            float totalRecords = await _context.Npcs.Where(u => u.UserId == UserId).CountAsync();
            return Ok(new { page = page, totalPages = (int)Math.Ceiling(totalRecords / 5), data = npcs });
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Npc npc, IFormFile imagen)
        {
            //si es nulo
            if (imagen == null) { return NotFound(); }

            var extension = Path.GetExtension(imagen.FileName);
            if (!(extension==".jpg"|| extension == ".png"|| extension == ".jpeg" || extension == ".webp"))
            {
                //return StatusCode(StatusCodes.Status404NotFound, "only jpg, png, jpeg");
                return BadRequest("only jpg, png, jpeg, webp");
            }
            await _context.Npcs.AddAsync(npc);
            await _context.SaveChangesAsync();

            Stream image = imagen.OpenReadStream();
            npc.ImgName = npc.Id.ToString() + extension;
            npc.ImgLink = await SubirStorage(image, npc.ImgName);
            _context.Entry(npc).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return Ok(npc);
        }
        
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteNpcRequest model)
        {
            

            var npc = await _context.Npcs.Where(u => u.Id == model.npcId && u.UserId == model.userId).FirstOrDefaultAsync();
            if (npc == null) { return NotFound(); }
            var storage = await FirebaseStorageCustom();
            await storage.Child("npcs").Child(npc.ImgName).DeleteAsync();
            _context.Npcs.Remove(npc);

            
            await _context.SaveChangesAsync();
            return Ok();
        }
        public async Task<string> SubirStorage(Stream archivo, string nombre)
        {
            var cancellation = new CancellationTokenSource();
            var storage = await FirebaseStorageCustom();
            var downloadURL = await storage.Child("npcs")
            .Child(nombre)
            .PutAsync(archivo, cancellation.Token);

            return downloadURL;
            
        }
        public static async Task<FirebaseStorage> FirebaseStorageCustom()
        {
            string email = "yojay@gmail.com";
            string clave = "pinky123";
            string ruta = "img-api-dotnet.appspot.com";
            string api_key = "AIzaSyBjTZYlO0tKDq1joNFc-XSlUTxpjnuB0ss";

            var auth = new FirebaseAuthProvider(new FirebaseConfig(api_key));
            var a = await auth.SignInWithEmailAndPasswordAsync(email, clave);
            var cancellation = new CancellationTokenSource();
            var task = new FirebaseStorage(ruta, new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                ThrowOnCancel = true
            });
            return task;
        }
    }
}
