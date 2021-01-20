using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dani_Planer_NedeljaID",
                table: "Dani");

            migrationBuilder.DropForeignKey(
                name: "FK_Obaveze_Dani_DanID",
                table: "Obaveze");

            migrationBuilder.RenameColumn(
                name: "DanID",
                table: "Obaveze",
                newName: "Danid");

            migrationBuilder.RenameIndex(
                name: "IX_Obaveze_DanID",
                table: "Obaveze",
                newName: "IX_Obaveze_Danid");

            migrationBuilder.AddForeignKey(
                name: "FK_Dani_Planer_NedeljaID",
                table: "Dani",
                column: "NedeljaID",
                principalTable: "Planer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obaveze_Dani_Danid",
                table: "Obaveze",
                column: "Danid",
                principalTable: "Dani",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dani_Planer_NedeljaID",
                table: "Dani");

            migrationBuilder.DropForeignKey(
                name: "FK_Obaveze_Dani_Danid",
                table: "Obaveze");

            migrationBuilder.RenameColumn(
                name: "Danid",
                table: "Obaveze",
                newName: "DanID");

            migrationBuilder.RenameIndex(
                name: "IX_Obaveze_Danid",
                table: "Obaveze",
                newName: "IX_Obaveze_DanID");

            migrationBuilder.AddForeignKey(
                name: "FK_Dani_Planer_NedeljaID",
                table: "Dani",
                column: "NedeljaID",
                principalTable: "Planer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Obaveze_Dani_DanID",
                table: "Obaveze",
                column: "DanID",
                principalTable: "Dani",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
