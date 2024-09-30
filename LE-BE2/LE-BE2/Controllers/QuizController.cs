using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SynonymReplacer.Models;

namespace SynonymReplacer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public QuizController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

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
            await _context.SaveChangesAsync(); // Save the data to the database

            return Ok(new { Message = "Quiz saved successfully." });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
        var user = new IdentityUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok("User registered successfully");
        }

        return BadRequest(result.Errors);
    }

    public class QuizData
    {
        public string OriginalSentence { get; set; }
        public string NewSentence { get; set; }
        public string CorrectWord { get; set; }
        public List<string> Options { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(
            100,
            ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
            MinimumLength = 6
        )]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
