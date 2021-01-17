using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planer",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planer", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Dani",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    NedeljaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dani", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dani_Planer_NedeljaID",
                        column: x => x.NedeljaID,
                        principalTable: "Planer",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Obaveze",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Predmet = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Boja = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Hitno = table.Column<int>(type: "int", nullable: false),
                    DanID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Obaveze", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Obaveze_Dani_DanID",
                        column: x => x.DanID,
                        principalTable: "Dani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dani_NedeljaID",
                table: "Dani",
                column: "NedeljaID");

            migrationBuilder.CreateIndex(
                name: "IX_Obaveze_DanID",
                table: "Obaveze",
                column: "DanID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Obaveze");

            migrationBuilder.DropTable(
                name: "Dani");

            migrationBuilder.DropTable(
                name: "Planer");
        }
    }
}
