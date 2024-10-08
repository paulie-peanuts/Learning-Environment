using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class BookSummaryController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public BookSummaryController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpPost]
    public async Task<IActionResult> GetSummary([FromBody] BookSummaryRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.BookTitle))
        {
            return BadRequest("Book title is required.");
        }

        var apiUrl = "https://api.booksummary.io/get-summary"; // Replace with the actual Book Summary API endpoint
        var jsonContent = JsonConvert.SerializeObject(new { title = request.BookTitle });
        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(apiUrl, content);
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "Error fetching summary.");
        }

        var jsonResponse = await response.Content.ReadAsStringAsync();
        var bookSummaryResponse = JsonConvert.DeserializeObject<BookSummaryResponse>(jsonResponse);

        return Ok(bookSummaryResponse);
    }

    public class BookSummaryRequest
    {
        public string BookTitle { get; set; }
    }

    public class BookSummaryResponse
    {
        public string Summary { get; set; }
    }
}
