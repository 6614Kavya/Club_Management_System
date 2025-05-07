using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeAdminPortal.Migrations
{
    /// <inheritdoc />
    public partial class MovedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_FieldPart_FieldPartId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_FieldPart_Fields_FieldId",
                table: "FieldPart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FieldPart",
                table: "FieldPart");

            migrationBuilder.RenameTable(
                name: "FieldPart",
                newName: "FieldParts");

            migrationBuilder.RenameIndex(
                name: "IX_FieldPart_FieldId",
                table: "FieldParts",
                newName: "IX_FieldParts_FieldId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FieldParts",
                table: "FieldParts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_FieldParts_FieldPartId",
                table: "Bookings",
                column: "FieldPartId",
                principalTable: "FieldParts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FieldParts_Fields_FieldId",
                table: "FieldParts",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_FieldParts_FieldPartId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_FieldParts_Fields_FieldId",
                table: "FieldParts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FieldParts",
                table: "FieldParts");

            migrationBuilder.RenameTable(
                name: "FieldParts",
                newName: "FieldPart");

            migrationBuilder.RenameIndex(
                name: "IX_FieldParts_FieldId",
                table: "FieldPart",
                newName: "IX_FieldPart_FieldId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FieldPart",
                table: "FieldPart",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_FieldPart_FieldPartId",
                table: "Bookings",
                column: "FieldPartId",
                principalTable: "FieldPart",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FieldPart_Fields_FieldId",
                table: "FieldPart",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
