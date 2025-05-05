using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using EcomApi.Data;
using EcomApi.Models;
using EcomApi.DTOs;

namespace EcomApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardStats>> GetDashboardStats()
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        var stats = new DashboardStats
        {
            TotalUsers = await _context.Users.CountAsync(),
            TotalOrders = await _context.Orders.CountAsync(),
            TotalProducts = await _context.Products.CountAsync(),
            RecentOrders = await _context.Orders
                .Include(o => o.User)
                .OrderByDescending(o => o.OrderDate)
                .Take(10)
                .Select(o => new OrderSummaryDto
                {
                    Id = o.Id,
                    Username = o.User.Username,
                    TotalAmount = o.TotalAmount,
                    OrderDate = o.OrderDate,
                    Status = o.Status
                })
                .ToListAsync(),
            TopSellingProducts = await _context.OrderItems
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalSold = g.Count()
                })
                .OrderByDescending(x => x.TotalSold)
                .Take(5)
                .Join(
                    _context.Products,
                    g => g.ProductId,
                    p => p.Id,
                    (g, p) => new ProductStatsDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        TotalSold = g.TotalSold
                    }
                )
                .ToListAsync()
        };

        return Ok(stats);
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        return await _context.Categories.ToListAsync();
    }

    [HttpPost("categories")]
    public async Task<ActionResult<Category>> CreateCategory([FromBody] Category category)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
    }

    [HttpDelete("categories/{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return NotFound();

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("products")]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProduct", "Products", new { id = product.Id }, product);
    }

    [HttpDelete("products/{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserStatsDto>>> GetUserStats()
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name);
        if (user == null || !user.IsAdmin)
            return Forbid();

        var userStats = await _context.Users
            .Select(u => new UserStatsDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                OrderCount = u.Orders.Count,
                TotalSpent = u.Orders.Sum(o => o.TotalAmount),
                LastOrderDate = u.Orders.Max(o => (DateTime?)o.OrderDate)
            })
            .ToListAsync();

        return Ok(userStats);
    }
}