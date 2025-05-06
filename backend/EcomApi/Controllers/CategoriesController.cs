using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomApi.Data;
using EcomApi.DTOs;
using EcomApi.Models;

namespace EcomApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories(bool? topLevelOnly = false)
    {
        var query = _context.Categories
            .Include(c => c.SubCategories)
            .AsQueryable();

        if (topLevelOnly == true)
        {
            query = query.Where(c => c.ParentCategoryId == null);
        }

        var categories = await query.ToListAsync();
        return Ok(categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            ImageUrl = c.ImageUrl,
            ParentCategoryId = c.ParentCategoryId,
            Path = c.Path,
            Level = c.Level,
            SubCategories = c.SubCategories.Select(sc => new CategoryDto
            {
                Id = sc.Id,
                Name = sc.Name,
                Description = sc.Description,
                ImageUrl = sc.ImageUrl,
                ParentCategoryId = sc.ParentCategoryId,
                Path = sc.Path,
                Level = sc.Level,
                SubCategories = new List<CategoryDto>()
            }).ToList()
        }).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetCategory(int id)
    {
        var category = await _context.Categories
            .Include(c => c.SubCategories)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ImageUrl = category.ImageUrl,
            ParentCategoryId = category.ParentCategoryId,
            Path = category.Path,
            Level = category.Level,
            SubCategories = category.SubCategories.Select(sc => new CategoryDto
            {
                Id = sc.Id,
                Name = sc.Name,
                Description = sc.Description,
                ImageUrl = sc.ImageUrl,
                ParentCategoryId = sc.ParentCategoryId,
                Path = sc.Path,
                Level = sc.Level,
                SubCategories = new List<CategoryDto>()
            }).ToList()
        });
    }
}