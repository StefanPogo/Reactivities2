using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host=CreateHostBuilder(args).Build();
            using( var scope=host.Services.CreateScope())
           {
                var servises=scope.ServiceProvider;
                try{
                    var context=servises.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                    Seed.SeedData(context);

                }
                catch( Exception ex)
                {
                    var logger=servises.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error during migratin");
                }
           }
           host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
