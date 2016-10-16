# soa-library

To run this project in Windows.
In the cmd, navigate to directory /library, an then start the MongoDB server with 

                              "mongod ---dbpath data\db"

Then, in the same directory start the the node server with 

                              "npm start"
                              
If you want to keep track of the http requests attended by the server you should set a debug variable with this command before the "npm start"

                              "set DEBUG=library:*"
                              
