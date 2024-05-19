using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bookStore_project.Migrations
{
    /// <inheritdoc />
    public partial class addeddiscountproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "Books",
                newName: "ImageUrl");

            migrationBuilder.AddColumn<int>(
                name: "Discount",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "756536fb-07c3-45da-a2b4-f535e2e74306");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "3154e4a6-cd63-45cd-9a2a-ab789d1ead09");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Books",
                newName: "imageUrl");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "da143fb6-6e08-4b2e-9f09-c6b0bf38cd63");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "b445484f-0a3d-4c8c-8b75-b567bfb72463");
        }
    }
}
