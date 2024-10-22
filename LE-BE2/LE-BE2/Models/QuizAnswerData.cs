using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SynonymReplacer.Models
{
public class QuizAnswerData
{
    public int QuizId { get; set; }
    public List<AnswerData> Answers { get; set; }
}

public class AnswerData
{
    public int QuestionId { get; set; }
    public string SelectedOption { get; set; }
}
}