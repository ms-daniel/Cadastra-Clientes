using Core;
using Core.Service;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//injecao do context
builder.Services.AddDbContext<DesafioCadastroContext>(
    options  => options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));

//injecao de services
builder.Services.AddTransient<IClienteService, ClienteService>();
builder.Services.AddTransient<ILogradouroService, LogradouroService>();


//mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
