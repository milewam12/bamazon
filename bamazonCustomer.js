//Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId);
  allItems();
  
});


function allItems() {
    connection.query('SELECT*FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log('Checkout our list of products for sale ',results, "\n");
        console.log(" END of the products ------------------------------------------------------------------------->\n")
        askClient();
    })
    
}

// //The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

var askClient = function () {
    inquirer.prompt([

        {
            type: "input",
            name: "iterm_id",
            message: "Please provide the ID number of the product you would like to purchase today.",
            validate: function (value) {
                if(isNaN(value)==false){
                    return true
                    
                }else{
                    console.log("\n"+ value + " is not a valid number. Please enter a valid ID number");
                    return false
                    
                }
                
            }
        },

        {
            type: "input",
            name: "units_tobuy",
            message: "How many units of the product you would like to buy.",
            validate: function (value) {
                if(isNaN(value)==false){
                    return true
                    
                }else{
                    console.log( "\n"+ value + " is not a valit unit number. Please enter a number");
                    return false
                    
                }
                
            }
        }
    ]).then(function (answer) {
        console.log(answer)
        
    });
}

var placeOrder = function(id, units_tobuy) {
    
}




// connection.end();