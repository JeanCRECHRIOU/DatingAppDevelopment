using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class Seed
	{
		public static async Task SeedUsers(DataContext context)
		{
			if (await context.Users.AnyAsync())
				return;

			var userData = await File.ReadAllTextAsync("Data/UserDataSeed.json");

			var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
			var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

			users.ForEach(user =>
			{
				using var hmac = new HMACSHA512();
				user.UserName = user.UserName.ToLower();
				user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word")); //same password for all users for seed datas
				user.PasswordSalt = hmac.Key;
				context.Users.Add(user);
			});
			
			context.SaveChangesAsync();
		}
	}
}
