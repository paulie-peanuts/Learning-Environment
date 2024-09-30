using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace SynonymReplacer.Models
{
    public class QuizQuestion
    {
        public int Id { get; set; }
        public string OriginalSentence { get; set; }
        public string NewSentence { get; set; }
        public string CorrectWord { get; set; }
        public string Options { get; set; }
    }

    public class QuizDbContext : IdentityDbContext<IdentityUser>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

        public DbSet<QuizQuestion> QuizQuestions { get; set; }
    }
}
