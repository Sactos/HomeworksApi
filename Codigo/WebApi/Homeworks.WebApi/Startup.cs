using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Homeworks.BusinessLogic.Interface;
using Homeworks.DataAccess.Interface;
using Homeworks.Factory;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Homeworks.DataAccess;
using Homeworks.BusinessLogic;
using Homeworks.Domain;

namespace Homeworks.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        
            // MINIMO PARA LA ENTREGA
            //services.AddDbContext<DbContext, HomeworksContext>(
            //    o => o.UseSqlServer(Configuration.GetConnectionString("HomeworksDB"))
            //);
            services.AddDbContext<DbContext, HomeworksContext>(
                o => o.UseInMemoryDatabase("HomeworksDB")
            );
            services.AddScoped<IUserLogic, UserLogic>();
            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IHomeworkLogic, HomeworkLogic>();
            services.AddScoped<IRepository<Homework>, HomeworkRepository>();
            services.AddScoped<IExerciseLogic, ExerciseLogic>();
            services.AddScoped<IRepository<Exercise>, ExerciseRepository>();
            services.AddScoped<ISessionLogic, SessionLogic>();

            //services.AddScoped<BuisnessLogicFactory>();
            //services.AddLogic<IUserLogic>();
            //services.AddLogic<IHomeworkLogic>();
            //services.AddLogic<IExerciseLogic>();
            //services.AddLogic<ISessionLogic>();
            services.AddCors(
                options => { options.AddPolicy(
                    "CorsPolicy", 
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();       
            }
            app.UseCors("CorsPolicy");
            app.UseMvc();
        }
    }
}
