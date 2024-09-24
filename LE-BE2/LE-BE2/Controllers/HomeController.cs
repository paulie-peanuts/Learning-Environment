using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using LE_BE2.Models;

namespace LE_BE2.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private static readonly List<string> Items = new List<string> { "Item1", "Item2", "Item3" };

    [HttpGet]
    public IEnumerable<string> Get()
    {
        return Items;
    }

    [HttpPost]
    public IActionResult Post([FromBody] string item)
    {
        Items.Add(item);
        return Ok();
    }
}
