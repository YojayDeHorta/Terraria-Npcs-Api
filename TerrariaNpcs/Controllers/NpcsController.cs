using Firebase.Auth;
using Firebase.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using TerrariaNpcs.Models;

namespace TerrariaNpcs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NpcsController : Controller
    {
        private readonly TerrariaContext _context;
        public NpcsController(TerrariaContext contexto) {
            _context = contexto;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Npc> npcs = await _context.Npcs.ToListAsync();
            return Ok(npcs);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var npc = await _context.Npcs.FindAsync(id);
            if (npc == null) { return NotFound(); }
            return Ok(npc);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Npc npc, IFormFile Imagen)
        {
            //si es nulo
            if (Imagen == null) { return NotFound(); }

            var extension = Path.GetExtension(Imagen.FileName);
            if (!(extension==".jpg"|| extension == ".png"|| extension == ".jpeg"))
            {
                //return StatusCode(StatusCodes.Status404NotFound, "only jpg, png, jpeg");
                return BadRequest("only jpg, png, jpeg");
            }
            await _context.Npcs.AddAsync(npc);
            await _context.SaveChangesAsync();

            Stream image = Imagen.OpenReadStream();
            npc.ImgName = npc.Id.ToString() + extension;
            npc.ImgLink = await SubirStorage(image, npc.ImgName);
            _context.Entry(npc).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return Ok(npc);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var npc = await _context.Npcs.FindAsync(id);
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
