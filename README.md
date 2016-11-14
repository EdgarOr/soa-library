MEAN Library Project
===============================

This project is an example of the use of the MEAN Stack to build a system with a service oriented architecture.

The project in composed by two subprojects, library-backend and library-frontend.

LIBRARY-BACKEND
-------------------

The library-backend has the mongodb schemas, the database, and a express server that atends the REST endpoints of the system.

DIRECTORY STRUCTURE
-------------------

```
bin
data
    db                   contains the database files
models
    database
        crud/            contains the .js files with the clases to make CRUD operations in the database
        schema/          contains the .js files with the entities database schemas of the system
node_modules             contains the node.js dependencies of the system
public
    images/              contains the images of the users registered on the system and the book covers              



```


The library-frontend has the single-page application and all the frontend dependencies (AngularJS, JQuery and Bootstrap).


# soa-library

To run this project in Windows.
In the cmd, navigate to directory /library, an then start the MongoDB server with 

                              "mongod ---dbpath data\db"

Then, in the same directory start the the node server with 

                              "npm start"
                              
If you want to keep track of the http requests attended by the server you should set a debug variable with this command before the "npm start"

                              "set DEBUG=library:*"
                              
