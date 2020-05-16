namespace InventoryControlSystem.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Inventories", "AddedByName", c => c.String());
            AddColumn("dbo.Inventories", "UpdatedName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Inventories", "UpdatedName");
            DropColumn("dbo.Inventories", "AddedByName");
        }
    }
}
