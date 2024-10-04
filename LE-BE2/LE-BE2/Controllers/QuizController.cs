using System.Collections.Generic; // Make sure to include this for List<T>
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
