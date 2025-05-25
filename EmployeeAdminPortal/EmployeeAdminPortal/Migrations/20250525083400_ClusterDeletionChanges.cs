using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeAdminPortal.Migrations
{
    /// <inheritdoc />
    public partial class ClusterDeletionChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserTeamRoles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserFieldRoles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserClubRoles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserTeamRoles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserFieldRoles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserClubRoles");
        }
    }
}
