using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LojaApi.Data;
using LojaApi.Models;

namespace LojaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FornecedorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetFornecedores()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult<Fornecedor>> GetFornecedor(int codigo)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(codigo);
            if (fornecedor == null) return NotFound();
            return fornecedor;
        }

        [HttpGet("nome/{nome}")]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetFornecedorPorNome(string nome)
        {
            var fornecedores = await _context.Fornecedores
                .Where(f => f.Nome.Contains(nome))
                .ToListAsync();

            if (fornecedores == null || !fornecedores.Any()) return NotFound();

            return fornecedores;
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> PostFornecedor(Fornecedor fornecedor)
        {
            _context.Fornecedores.Add(fornecedor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFornecedor), new { codigo = fornecedor.Codigo }, fornecedor);
        }

        [HttpPut("{codigo}")]
        public async Task<IActionResult> PutFornecedor(int codigo, Fornecedor fornecedor)
        {
            if (codigo != fornecedor.Codigo) return BadRequest();
            _context.Entry(fornecedor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{codigo}")]
        public async Task<IActionResult> DeleteFornecedor(int codigo)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(codigo);
            if (fornecedor == null) return NotFound();
            _context.Fornecedores.Remove(fornecedor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}