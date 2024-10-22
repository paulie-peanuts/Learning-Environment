using System.Collections.Generic; // Make sure to include this for List<T>
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore; // Add this line
using SynonymReplacer.Models;

namespace SynonymReplacer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager; // Add this line

        public QuizController(
            QuizDbContext context,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager
        )
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST: api/quiz/save
        [HttpPost("save")]
        public async Task<IActionResult> SaveQuiz([FromBody] QuizData quizData)
        {
            if (quizData == null)
            {
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

            _context.QuizQuestions.Add(quizQuestion);
            await _context.SaveChangesAsync(); // Save the data to the database

            return Ok(new { Message = "Quiz saved successfully." });
        }

        [HttpGet("questions")]
        public async Task<ActionResult<IEnumerable<QuizQuestion>>> GetAllQuestions()
        {
            // Retrieve all quiz questions from the database
            var questions = await _context.QuizQuestions.ToListAsync();

            // Return the questions as a response
            return Ok(questions);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteQuizQuestion(int id)
        {
            var question = await _context.QuizQuestions.FindAsync(id);
            if (question == null)
            {
                return NotFound(new { message = "Question not found" });
            }

            _context.QuizQuestions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Question deleted successfully" });
        }

        /*
        // POST: api/quiz/register
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
        }*/
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            Console.WriteLine("here");
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            Console.WriteLine(user);
            if (result.Succeeded)
            {
                return Ok("User registered successfully");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(
                model.Email,
                model.Password,
                false,
                false
            );

            if (result.Succeeded)
            {
                // Return a JWT token or some JSON data
                var user = await _userManager.FindByEmailAsync(model.Email);
                var token = GenerateJwtToken(user);

                return Ok(new { Message = "User logged in successfully", Token = token });
            }

            return Unauthorized(new { Message = "Invalid login attempt" });
        }

/*[HttpPost]
public async Task<IActionResult> CreateFullQuiz(FullQuizData quizData)
{
    // Create FullQuiz first
    var fullQuiz = new FullQuiz
    {
        Title = quizData.Title,
        Description = quizData.Description
    };
    _context.FullQuizzes.Add(fullQuiz);
    await _context.SaveChangesAsync();

    // Now create quiz questions
    foreach (var question in quizData.Questions)
    {
        var quizQuestion = new QuizQuestion
        {
            OriginalSentence = question.OriginalSentence,
            NewSentence = question.NewSentence,
            CorrectWord = question.CorrectWord,
            Options = question.Options,
            FullQuizId = fullQuiz.Id // Associate with FullQuiz
        };
        _context.QuizQuestions.Add(quizQuestion);
    }
    await _context.SaveChangesAsync();

    return Ok(new { Message = "Quiz created successfully!" });
}*/
[HttpPost("create-full-quiz")]
    public async Task<IActionResult> CreateFullQuiz([FromBody] FullQuizData fullQuizData)
    {
        if (fullQuizData == null || fullQuizData.Questions == null || !fullQuizData.Questions.Any())
        {
            return BadRequest("Quiz data is invalid.");
        }

        // Map FullQuizData to FullQuiz
        var fullQuiz = new FullQuiz
        {
            Title = fullQuizData.Title,
            Description = fullQuizData.Description,
            CreatedAt = DateTime.Now,
            QuizQuestions = fullQuizData.Questions.Select(q => new QuizQuestion
            {
                OriginalSentence = q.OriginalSentence,
                NewSentence = q.NewSentence,
                CorrectWord = q.CorrectWord,
                Options = q.Options // Ensure Options is in the correct format
            }).ToList()
        };

        _context.FullQuizzes.Add(fullQuiz);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Full quiz created successfully.", QuizId = fullQuiz.Id });
    }
        // GET: api/quiz/all-quizzes
    /*[HttpGet("all-quizzes")]
    public async Task<ActionResult<IEnumerable<FullQuiz>>> GetAllQuizzes()
    {
        var quizzes = await _context.FullQuizzes
            .Include(q => q.QuizQuestions)
            .ToListAsync();

        return Ok(quizzes);
    }
    */
[HttpGet("all-quizzes")]
public async Task<ActionResult<IEnumerable<FullQuizDto>>> GetAllQuizzes()
{
    var quizzes = await _context.FullQuizzes
        .Include(q => q.QuizQuestions)
        .ToListAsync();

    var quizDtos = quizzes.Select(quiz => new FullQuizDto
    {
        Id = quiz.Id,
        Title = quiz.Title,
        Description = quiz.Description,
        CreatedAt = quiz.CreatedAt,
        QuizQuestions = quiz.QuizQuestions.Select(q => new QuizQuestionDto
        {
            Id = q.Id,
            OriginalSentence = q.OriginalSentence,
            NewSentence = q.NewSentence,
            CorrectWord = q.CorrectWord,
            Options = q.Options
        }).ToList()
    }).ToList();

    return Ok(quizDtos);
} 
    // POST: api/quiz/submit-answers
[HttpPost("submit-answers")]
public async Task<IActionResult> SubmitAnswers([FromBody] QuizAnswerData quizAnswerData)
{
    if (quizAnswerData == null || quizAnswerData.Answers == null || !quizAnswerData.Answers.Any())
    {
        return BadRequest("Answer data is invalid.");
    }

    var quiz = await _context.FullQuizzes
        .Include(q => q.QuizQuestions)
        .FirstOrDefaultAsync(q => q.Id == quizAnswerData.QuizId);

    if (quiz == null)
    {
        return NotFound("Quiz not found.");
    }

    int correctAnswers = 0;

    foreach (var answer in quizAnswerData.Answers)
    {
        var question = quiz.QuizQuestions.FirstOrDefault(q => q.Id == answer.QuestionId);
        if (question != null)
        {
            var correctOption = question.CorrectWord;
            if (answer.SelectedOption == correctOption)
            {
                correctAnswers++;
            }
        }
    }

    int totalQuestions = quiz.QuizQuestions.Count;
    double scorePercentage = ((double)correctAnswers / totalQuestions) * 100;

    // Optionally, save the result to the database (if you implement user accounts)

    return Ok(new { CorrectAnswers = correctAnswers, TotalQuestions = totalQuestions, Score = scorePercentage });
}
// GET: api/quiz/{id}
[HttpGet("{id}")]
public async Task<ActionResult<FullQuiz>> GetQuizById(int id)
{
    var quiz = await _context.FullQuizzes
        .Include(q => q.QuizQuestions)
        .FirstOrDefaultAsync(q => q.Id == id);

    if (quiz == null)
    {
        return NotFound("Quiz not found.");
    }

    return Ok(quiz);
}


        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("YourNewSecureKeyThatIsAtLeast16CharsLong")
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience: "yourdomain.com",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
            [Compare(
                "Password",
                ErrorMessage = "The password and confirmation password do not match."
            )]
            public string ConfirmPassword { get; set; }
        }

        public class LoginViewModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }

    }
}

/*using System.ComponentModel.DataAnnotations;
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
}*/
