using Microsoft.AspNetCore.Mvc;
using EcomApi.Services;
using EcomApi.DTOs;

namespace EcomApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
    {
        try 
        {
            var (response, error) = await _authService.Register(registerDto);
            if (response == null)
            {
                return BadRequest(new { message = error ?? "Une erreur est survenue lors de l'inscription" });
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            return StatusCode(500, new { message = "Une erreur interne est survenue lors de l'inscription" });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var response = await _authService.Login(loginDto);
            if (response == null)
            {
                return Unauthorized(new { message = "Email ou mot de passe incorrect" });
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            return StatusCode(500, new { message = "Une erreur interne est survenue lors de la connexion" });
        }
    }
}