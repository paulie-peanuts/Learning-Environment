using Microsoft.AspNetCore.Mvc;
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
