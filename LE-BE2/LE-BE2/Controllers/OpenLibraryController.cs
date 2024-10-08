using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenLibraryController : ControllerBase
    {
        private static readonly HttpClient httpClient = new HttpClient();

        // Fetch books from the Open Library API
        private async Task<List<BookResult>> GetBooksAsync(string query, string fields, int limit, int page)
        {
            string url = $"https://openlibrary.org/search.json?q={Uri.EscapeDataString(query)}&fields={fields}&limit={limit}&page={page}";

            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    
                    // Parse the JSON response
                    var bookResponse = JsonConvert.DeserializeObject<OpenLibraryResponse>(responseBody);
                    return bookResponse.Docs;
                }

                // Return an empty list if API fails
                return new List<BookResult>();
            }
            catch (Exception ex)
            {
                // Handle any exception (network failure, API down, etc.)
                Console.WriteLine($"Error fetching books: {ex.Message}");
                return new List<BookResult>();
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchBooks([FromQuery] string query, [FromQuery] string fields = "*", [FromQuery] int limit = 10, [FromQuery] int page = 1)
        {
            var books = await GetBooksAsync(query, fields, limit, page);
            return Ok(books);
        }
    }

    // Classes to represent the response structure
    public class OpenLibraryResponse
    {
        public int NumFound { get; set; }
        public List<BookResult> Docs { get; set; }
    }

    public class BookResult
    {
        public int Cover_i { get; set; }
        public bool Has_fulltext { get; set; }
        public int Edition_count { get; set; }
        public string Title { get; set; }
        public List<string> Author_name { get; set; }
        public int First_publish_year { get; set; }
        public string Key { get; set; }
        public List<string> Ia { get; set; }
        public List<string> Author_key { get; set; }
        public bool Public_scan_b { get; set; }
    }
}


/*using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SynonymReplacer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenLibraryController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public OpenLibraryController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] OpenLibrarySearchRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Query))
            {
                return BadRequest("Query is required.");
            }

            var apiUrl =
                $"https://openlibrary.org/search.json?q={Uri.EscapeDataString(request.Query)}&fields={request.Fields}&limit={request.Limit}&page={request.Page}";
            var response = await _httpClient.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(
                    (int)response.StatusCode,
                    "Error fetching data from Open Library."
                );
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var openLibraryResponse = JsonConvert.DeserializeObject<OpenLibrarySearchResponse>(
                jsonResponse
            );

            return Ok(openLibraryResponse);
        }

        public class OpenLibrarySearchRequest
        {
            public string Query { get; set; }
            public string Fields { get; set; } = "*"; // Default to all fields
            public int Limit { get; set; } = 10; // Default limit
            public int Page { get; set; } = 1; // Default page
        }

        public class OpenLibrarySearchResponse
        {
            public int NumFound { get; set; }
            public int Start { get; set; }
            public bool NumFoundExact { get; set; }
            public List<OpenLibraryDoc> Docs { get; set; }
        }

        public class OpenLibraryDoc
        {
            public int? CoverI { get; set; }
            public bool HasFulltext { get; set; }
            public int EditionCount { get; set; }
            public string Title { get; set; }
            public List<string> AuthorName { get; set; }
            public int FirstPublishYear { get; set; }
            public string Key { get; set; }
            public List<string> Ia { get; set; }
            public List<string> AuthorKey { get; set; }
            public bool PublicScanB { get; set; }
        }
    }
}*/
