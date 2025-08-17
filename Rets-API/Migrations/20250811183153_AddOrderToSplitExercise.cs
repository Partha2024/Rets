using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rets_API.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderToSplitExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "SplitExercises",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "SplitExercises");
        }
    }
}
