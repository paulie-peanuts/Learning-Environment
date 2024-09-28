using Microsoft.EntityFrameworkCore;

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

    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

        public DbSet<QuizQuestion> QuizQuestions { get; set; }
    }
}
