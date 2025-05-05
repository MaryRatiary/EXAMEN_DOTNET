using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using EcomApi.Data;
using EcomApi.DTOs;
using EcomApi.Models;

namespace EcomApi.Services;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthService(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<AuthResponseDto?> Login(LoginDto loginDto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
            return null;

        var token = _jwtService.GenerateToken(user);
        return new AuthResponseDto
        {
            Token = token,
            Username = user.Username,
            IsAdmin = user.IsAdmin
        };
    }

    public async Task<(AuthResponseDto? Response, string? Error)> Register(RegisterDto registerDto)
    {
        // Vérifier si l'email existe déjà
        if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            return (null, "Cet email est déjà utilisé");

        // Vérifier si le nom d'utilisateur existe déjà
        if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
            return (null, "Ce nom d'utilisateur est déjà utilisé");

        // Vérifier si c'est un email admin
        var isAdmin = IsAdminEmail(registerDto.Email);

        var user = new User
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            PasswordHash = HashPassword(registerDto.Password),
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            IsAdmin = isAdmin,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(user);
        return (new AuthResponseDto
        {
            Token = token,
            Username = user.Username,
            IsAdmin = user.IsAdmin
        }, null);
    }

    private bool IsAdminEmail(string email)
    {
        return email.EndsWith("@admin.com", StringComparison.OrdinalIgnoreCase);
    }

    private string HashPassword(string password)
    {
        byte[] salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);

        byte[] hashBytes = new byte[48];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 32);

        return Convert.ToBase64String(hashBytes);
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        try
        {
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);
            
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            
            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(32);
            
            for (int i = 0; i < 32; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                    return false;
            }
            
            return true;
        }
        catch
        {
            return false;
        }
    }
}