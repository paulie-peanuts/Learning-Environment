using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SynonymReplacer.Models
{
    public class QuizQuestionDto
    {
        public int Id { get; set; }
        public string OriginalSentence { get; set; }
        public string NewSentence { get; set; }
        public string CorrectWord { get; set; }
        public string Options { get; set; }
    }
}
