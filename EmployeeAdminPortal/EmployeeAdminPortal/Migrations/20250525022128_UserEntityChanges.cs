using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeAdminPortal.Migrations
{
    /// <inheritdoc />
    public partial class UserEntityChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSuperAdmin",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSuperAdmin",
                table: "AspNetUsers");
        }
    }
}
