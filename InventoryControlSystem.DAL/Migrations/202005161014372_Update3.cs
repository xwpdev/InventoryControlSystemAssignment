namespace InventoryControlSystem.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Inventories", "AddedDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Inventories", "UpdatedDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Inventories", "UpdatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Inventories", "AddedDate", c => c.DateTime(nullable: false));
        }
    }
}
