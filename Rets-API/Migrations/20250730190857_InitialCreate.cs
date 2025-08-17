using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rets_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs");

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseId",
                table: "ExerciseLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs");

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseId",
                table: "ExerciseLogs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
