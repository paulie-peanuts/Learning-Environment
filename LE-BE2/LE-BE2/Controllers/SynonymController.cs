using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SynonymReplacer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SynonymController : ControllerBase
    {
        private static readonly HttpClient httpClient = new HttpClient();

        // Fetch synonym from the Datamuse API
        private async Task<string> GetSynonymAsync(string word)
        {
            string url = $"https://api.datamuse.com/words?ml={word}";

            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();

                    // Parse the JSON response
                    var synonyms = JsonConvert.DeserializeObject<List<WordResult>>(responseBody);

                    // Return a random synonym or the original word if no synonyms are found
                    if (synonyms != null && synonyms.Any())
                    {
                        var random = new Random();
                        return synonyms[random.Next(synonyms.Count)].Word;
                    }
                }

                // If no synonyms are found or API fails, return the original word
                return word;
            }
            catch (Exception ex)
            {
                // Handle any exception (network failure, API down, etc.)
                Console.WriteLine($"Error fetching synonym: {ex.Message}");
                return word;
            }
        }

        [HttpPost("replace")]
        public async Task<IActionResult> ReplaceWord([FromBody] SentenceRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Sentence))
            {
                return BadRequest("Sentence cannot be empty.");
            }

            var words = request.Sentence.Split(' ');
            var random = new Random();
            int randomIndex = random.Next(0, words.Length);
            string wordToReplace = words[randomIndex];

            // Get a synonym for the randomly chosen word using Datamuse API
            string synonym = await GetSynonymAsync(wordToReplace);

            // Replace the word with its synonym
            words[randomIndex] = synonym;

            var newSentence = string.Join(' ', words);

            return Ok(new { OriginalSentence = request.Sentence, NewSentence = newSentence });
        }
    }

    // Helper class to deserialize Datamuse API response
    public class WordResult
    {
        [JsonProperty("word")]
        public string Word { get; set; }
    }

    public class SentenceRequest
    {
        public string Sentence { get; set; }
    }
}


/*using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SynonymReplacer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SynonymController : ControllerBase
    {
        // A mock method to get a synonym. In a real-world app, you'd use an API or a dictionary.
        private string GetSynonym(string word)
        {
            var synonyms = new Dictionary<string, List<string>>()
            {
                {"quick", new List<string>{ "fast", "speedy", "swift" }},
                {"brown", new List<string>{ "tan", "umber", "chocolate" }},
                {"fox", new List<string>{ "vulpine", "canine", "animal" }},
                {"jumps", new List<string>{ "leaps", "hops", "springs" }},
                {"lazy", new List<string>{ "idle", "sluggish", "inactive" }},
                {"dog", new List<string>{ "hound", "canine", "pup" }}
            };

            return synonyms.ContainsKey(word.ToLower()) 
                ? synonyms[word.ToLower()].OrderBy(x => Guid.NewGuid()).FirstOrDefault() 
                : word;
        }

        [HttpPost("replace")]
        public IActionResult ReplaceWord([FromBody] SentenceRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Sentence))
            {
                return BadRequest("Sentence cannot be empty.");
            }

            var words = request.Sentence.Split(' ');
            var random = new Random();
            int randomIndex = random.Next(0, words.Length);
            string wordToReplace = words[randomIndex];

            // Get a synonym for the randomly chosen word
            string synonym = GetSynonym(wordToReplace);

            // Replace the word with its synonym
            words[randomIndex] = synonym;

            var newSentence = string.Join(' ', words);

            return Ok(new { OriginalSentence = request.Sentence, NewSentence = newSentence });
        }
    }

    public class SentenceRequest
    {
        public string Sentence { get; set; }
    }
}
*/