using Microsoft.AspNetCore.Mvc;
using SynonymReplacer.Models;
using System.Threading.Tasks;

namespace SynonymReplacer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuizController(QuizDbContext context)
        {
            _context = context;
        }

        // POST: api/quiz/save
        [HttpPost("save")]
        public async Task<IActionResult> SaveQuiz([FromBody] QuizData quizData)
        {
            if (quizData == null)
            {
                Console.WriteLine("bad");
                return BadRequest("Quiz data cannot be null.");
            }

            // Create a comma-separated string of options
            string options = string.Join(",", quizData.Options);

            var quizQuestion = new QuizQuestion
            {
                OriginalSentence = quizData.OriginalSentence,
                NewSentence = quizData.NewSentence,
                CorrectWord = quizData.CorrectWord,
                Options = options
            };
            Console.WriteLine("good");
            _context.QuizQuestions.Add(quizQuestion);
            await _context.SaveChangesAsync();  // Save the data to the database

            return Ok(new { Message = "Quiz saved successfully." });
        }
    }

    public class QuizData
    {
        public string OriginalSentence { get; set; }
        public string NewSentence { get; set; }
        public string CorrectWord { get; set; }
        public List<string> Options { get; set; }
    }
}
