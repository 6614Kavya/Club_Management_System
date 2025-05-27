using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeAdminPortal.Migrations
{
    /// <inheritdoc />
    public partial class BookingTeamChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_TeamId",
                table: "Bookings",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Teams_TeamId",
                table: "Bookings",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Teams_TeamId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_TeamId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Bookings");
        }
    }
}
