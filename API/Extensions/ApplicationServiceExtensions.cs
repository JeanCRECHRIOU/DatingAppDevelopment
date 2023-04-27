using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
	public static class ApplicationServiceExtensions
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services,
		IConfiguration config)
		{
			services.AddDbContext<DataContext>(opt =>
			{
				opt.UseSqlite(config.GetConnectionString("DafaultConnection"));
			});

			services.AddCors();
			services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IUserRepository, UserRepository>();
			//services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			services.AddAutoMapper(typeof(AutoMapperProfiles));

			return services;
		}
	}
}