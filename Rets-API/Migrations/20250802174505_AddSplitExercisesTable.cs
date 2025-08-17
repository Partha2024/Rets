using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rets_API.Migrations
{
    /// <inheritdoc />
    public partial class AddSplitExercisesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SplitExercise_Exercises_ExerciseId",
                table: "SplitExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_SplitExercise_Splits_SplitId",
                table: "SplitExercise");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SplitExercise",
                table: "SplitExercise");

            migrationBuilder.RenameTable(
                name: "SplitExercise",
                newName: "SplitExercises");

            migrationBuilder.RenameIndex(
                name: "IX_SplitExercise_ExerciseId",
                table: "SplitExercises",
                newName: "IX_SplitExercises_ExerciseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SplitExercises",
                table: "SplitExercises",
                columns: new[] { "SplitId", "ExerciseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SplitExercises_Exercises_ExerciseId",
                table: "SplitExercises",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SplitExercises_Splits_SplitId",
                table: "SplitExercises",
                column: "SplitId",
                principalTable: "Splits",
                principalColumn: "SplitId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SplitExercises_Exercises_ExerciseId",
                table: "SplitExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_SplitExercises_Splits_SplitId",
                table: "SplitExercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SplitExercises",
                table: "SplitExercises");

            migrationBuilder.RenameTable(
                name: "SplitExercises",
                newName: "SplitExercise");

            migrationBuilder.RenameIndex(
                name: "IX_SplitExercises_ExerciseId",
                table: "SplitExercise",
                newName: "IX_SplitExercise_ExerciseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SplitExercise",
                table: "SplitExercise",
                columns: new[] { "SplitId", "ExerciseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SplitExercise_Exercises_ExerciseId",
                table: "SplitExercise",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SplitExercise_Splits_SplitId",
                table: "SplitExercise",
                column: "SplitId",
                principalTable: "Splits",
                principalColumn: "SplitId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
