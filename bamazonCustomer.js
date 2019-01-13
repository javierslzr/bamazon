var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "pogoplus82!",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");

  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(results);
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          message: "Select the ID of the item you would like to buy"
        },
        {
          name: "numberOfunits",
          type: "input",
          message: "How many units would you like to buy?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        // if (chosenItem.stock_quantity < parseInt(answer.numberOfunits)) {
        //   // bid was high enough, so update db, let the user know, and start over
        //   connection.query(
        //     "UPDATE products SET ? WHERE ?",
        //     [
        //       {
        //         stock_quantity: answer.numberOfunits
        //       },
        //       {
        //         id: chosenItem.id
        //       }
        //     ],
        //     function(error) {
        //       if (error) throw err;
        //       console.log("Item purchased successfully!");
        //       readProducts();
        //     }
        //   );
        // }
        // else {
        //   // bid wasn't high enough, so apologize and start over
        //   console.log("Your bid was too low. Try again...");
        //   readProducts();
        // }
      });
  });
  // connection.end();
};

// function start() {
//   inquirer
//     .prompt({
//       name: "buyAndhowMany",
//       type: "rawlist",
//       message: "Select the ID of the product you would like to buy",
//       choices: ["ID"]
//     })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.buyAndhowMany.toUpperCase() === "BUY") {
//         buy();
//       }
//       else {
//         howMany();
//       }
//     });
// }

// function buy() {
//   // query the database for all items being auctioned

// }


