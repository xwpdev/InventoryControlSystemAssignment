
# Inventory Control System - Assignment
Simple Inventory Control System with CRUD operations to manage item data. Built using ASP.NET WebAPI and Angular Frond-ent. Styled using Bootstrap and NG-Bootstrap. DB is based on MSSQL server.

## Back-end 
Developed using ASP.NET WebAPI2

To debug the application, open *InventoryControlSystem.sln* using Visual Studio (2017/2019) and build the solution. Database is developed using Entity Framework Code-First approach. Migrations can be found in *InventoryControlSystem.DAL* project. Change the connection string poiting to your database and run the migrations.

Swagger UI is available for the API where you can see the available endpoints. The default API url is [https://localhost:44364/](https://localhost:44364/) where the Front-end is linked to this URL.

## Front-end
Developed using Angular 9 
Styled using Boostrap 4

To start the Angular application, open *InventoryControlSystem.UI* folder using VS Code (or editor of your choice). 

Run **npm install** if you are first time loading the project. 
Then, run  **ng serve --open** to start debugging the application

Application will start in default url: [http://localhost:4200/](http://localhost:4200/). Angular app is default linked to API endpoint mentioned above.

Auth0 is used as the Authentication / SSO provider. Application *Login* is redirected to Auth0.

That's it. If you have any questions, reach out to me on charith.suriyakula@gmail.com
