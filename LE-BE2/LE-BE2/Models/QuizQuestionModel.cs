using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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

        // Foreign key to FullQuiz
        public int? FullQuizId { get; set; }
        public FullQuiz FullQuiz { get; set; } // Navigation property to FullQuiz
    }

    public class FullQuiz
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation property for related quiz questions
        public ICollection<QuizQuestion> QuizQuestions { get; set; }
    }
public class FullQuizData
{
    public string Title { get; set; } // Quiz title
    public string Description { get; set; } // Quiz description
    public List<QuizQuestionData> Questions { get; set; } // List of quiz questions
}

public class QuizQuestionData
{
    public string OriginalSentence { get; set; }
    public string NewSentence { get; set; }
    public string CorrectWord { get; set; }
    public string Options { get; set; } // Comma-separated or a list of options
}

    public class QuizDbContext : IdentityDbContext<IdentityUser>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options) { }

        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<FullQuiz> FullQuizzes { get; set; }  // Add FullQuiz DbSet
        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<QuizQuestion>()
        .HasOne(q => q.FullQuiz)
        .WithMany(f => f.QuizQuestions)
        .HasForeignKey(q => q.FullQuizId)
        .OnDelete(DeleteBehavior.Cascade);  // Set cascade delete if needed
}

    }
}
