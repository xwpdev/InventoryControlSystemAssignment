namespace InventoryControlSystem.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Inventories", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Inventories", "Description");
        }
    }
}
