using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LojaApi.Data;
using LojaApi.Models;

namespace LojaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendedorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendedorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendedor>>> GetVendedores()
        {
            return await _context.Vendedores.ToListAsync();
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult<Vendedor>> GetVendedor(int codigo)
        {
            var vendedor = await _context.Vendedores.FindAsync(codigo);
            if (vendedor == null) return NotFound();
            return vendedor;
        }

        [HttpGet("salario/{valor}")]
        public async Task<ActionResult<IEnumerable<Vendedor>>> GetVendedorPorSalario(decimal valor)
        {
            var vendedores = await _context.Vendedores
                .Where(v => v.Salario > valor)
                .ToListAsync();

            if (vendedores == null || !vendedores.Any()) return NotFound();

            return vendedores;
        }

        [HttpPost]
        public async Task<ActionResult<Vendedor>> PostVendedor(Vendedor vendedor)
        {
            _context.Vendedores.Add(vendedor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVendedor), new { codigo = vendedor.Codigo }, vendedor);
        }

        [HttpPut("{codigo}")]
        public async Task<IActionResult> PutVendedor(int codigo, Vendedor vendedor)
        {
            if (codigo != vendedor.Codigo) return BadRequest();
            _context.Entry(vendedor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{codigo}")]
        public async Task<IActionResult> DeleteVendedor(int codigo)
        {
            var vendedor = await _context.Vendedores.FindAsync(codigo);
            if (vendedor == null) return NotFound();
            _context.Vendedores.Remove(vendedor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}