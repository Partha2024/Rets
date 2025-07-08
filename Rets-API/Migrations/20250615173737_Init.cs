using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Rets_API.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    ExerciseId = table.Column<string>(type: "text", nullable: false),
                    ExerciseName = table.Column<string>(type: "text", nullable: false),
                    ExerciseImage = table.Column<string>(type: "text", nullable: false),
                    ExerciseType = table.Column<string>(type: "text", nullable: false),
                    MuscleGroup = table.Column<string>(type: "text", nullable: false),
                    PrimaryMuscle = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.ExerciseId);
                });

            migrationBuilder.CreateTable(
                name: "Splits",
                columns: table => new
                {
                    SplitId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SplitName = table.Column<string>(type: "text", nullable: false),
                    DefaultDay = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Splits", x => x.SplitId);
                });

            migrationBuilder.CreateTable(
                name: "SplitExercise",
                columns: table => new
                {
                    SplitId = table.Column<int>(type: "integer", nullable: false),
                    ExerciseId = table.Column<string>(type: "text", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SplitExercise", x => new { x.SplitId, x.ExerciseId });
                    table.ForeignKey(
                        name: "FK_SplitExercise_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SplitExercise_Splits_SplitId",
                        column: x => x.SplitId,
                        principalTable: "Splits",
                        principalColumn: "SplitId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SplitExercise_ExerciseId",
                table: "SplitExercise",
                column: "ExerciseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SplitExercise");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Splits");
        }
    }
}
