using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LE_BE2.Migrations
{
    /// <inheritdoc />
    public partial class AddFullQuizTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FullQuizId",
                table: "QuizQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FullQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FullQuizzes", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_QuizQuestions_FullQuizId",
                table: "QuizQuestions",
                column: "FullQuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_FullQuizzes_FullQuizId",
                table: "QuizQuestions",
                column: "FullQuizId",
                principalTable: "FullQuizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_FullQuizzes_FullQuizId",
                table: "QuizQuestions");

            migrationBuilder.DropTable(
                name: "FullQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_QuizQuestions_FullQuizId",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "FullQuizId",
                table: "QuizQuestions");
        }
    }
}
