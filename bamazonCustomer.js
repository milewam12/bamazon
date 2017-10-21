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
        askClientId(results);
    })
    
}

// //The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
function askClientId () {
    inquirer.prompt([

        {
           type: "input",
            name: "item_id",
            message: "Please provide the ID number of the product you would like to purchase today.",
            validate: function (answer) {
                if(isNaN(answer)==false){
                    return true
                    
                }else{
                    console.log("\n"+ answer + " is not a valid number. Please enter a valid ID number");
                    return false
                }
             
            }
        },  
    ]).then(function (answer) {
        var product = answer.item_id;
        if(product){
            howManyUnits(product);
        } else{
            console.log("\nThat item is not in the inventory.");
            allItems();
        }
        
    });
}


// The second message should ask how many units of the product they would like to buy.

function howManyUnits(product) {
    inquirer.prompt([
    {
    type: "input",
    name: "units_tobuy",
    message: "How many products you would like to buy.",
    validate: function (ans) {
        if(isNaN(ans)==false){
            return true
            
        }else{
            console.log( "\n"+ ans + " is not a valit unit number. Please enter a number");
            return false   
        } 
    }
}

//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
]).then(function (ans) {
    var units = parseInt(ans.units);
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    if (units >product.stock_quantity){
        console.log ("Sorry! product not available in stock")
        // allItems();
    } else{
        makePurchase(product, units);
    }
    
});
    
}

// However, if your store does have enough of the product, you should fulfill the customer's order.

function makePurchase(product, units) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id =?",
        [units.units_tobuy, product.item_id], function (error, res) {
            console.log("Purchased has been processed " + JSON.stringify(res)+ "\n");
            // //I'm stuck in trying to udpdate the database. Using JSON.stringify(res) to see the result. The row's aren't updated after runing the makePurchase function

            console.log ("BUY MORE!!!!\n")
            allItems();
        }
    )
    
}

