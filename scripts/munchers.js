"use strict";
// username: fsunumbermunchers@gmail.com
// password: gotta munch em all
var myDatabase = new Firebase("https://fsu-number-munchers.firebaseio.com");
// This object serves as a namespace for our custom code, thus preventing the
// pollution of the global scope.
var munchers = {};
// userData stores the auth object which is returned by FaceBook authenication. 
var userData;
// Local Game variable. Used to load the phaser.io gameboard and also to test for existing game.
var game;
// Local Leaderboard Json
var leaderBoardJSON;
myDatabase.orderByChild("score").on("child_added", function(snapshot) {
    leaderBoardJSON = snapshot.val();
});
// tableRows acts as a Table ID selector for any individual cell in the aray.
var _tableRows = new Array(10);
        for (var i = 0; i < 10; i++){
            _tableRows[i] = new Array(3);
        }
        _tableRows[0][0] = "row-1__player";
        _tableRows[0][1] = "row-1__school";
        _tableRows[0][2] = "row-1__score";
        _tableRows[0][3] = "row-1__date";

        _tableRows[1][0] = "row-2__player";
        _tableRows[1][1] = "row-2__school";
        _tableRows[1][2] = "row-2__score";
        _tableRows[1][3] = "row-2__date";

        _tableRows[2][0] = "row-3__player";
        _tableRows[2][1] = "row-3__school";
        _tableRows[2][2] = "row-3__score";
        _tableRows[2][3] = "row-3__date";

        _tableRows[3][0] = "row-4__player";
        _tableRows[3][1] = "row-4__school";
        _tableRows[3][2] = "row-4__score";
        _tableRows[3][3] = "row-4__date";

        _tableRows[4][0] = "row-5__player";
        _tableRows[4][1] = "row-5__school";
        _tableRows[4][2] = "row-5__score";
        _tableRows[4][3] = "row-5__date";

        _tableRows[5][0] = "row-6__player";
        _tableRows[5][1] = "row-6__school";
        _tableRows[5][2] = "row-6__score";
        _tableRows[5][3] = "row-6__date";

        _tableRows[6][0] = "row-7__player";
        _tableRows[6][1] = "row-7__school";
        _tableRows[6][2] = "row-7__score";
        _tableRows[6][3] = "row-7__date";

        _tableRows[7][0] = "row-8__player";
        _tableRows[7][1] = "row-8__school";
        _tableRows[7][2] = "row-8__score";
        _tableRows[7][3] = "row-8__date";

        _tableRows[8][0] = "row-9__player";
        _tableRows[8][1] = "row-9__school";
        _tableRows[8][2] = "row-9__score";
        _tableRows[8][3] = "row-9__date";

        _tableRows[9][0] = "row-10__player";
        _tableRows[9][1] = "row-10__school";
        _tableRows[9][2] = "row-10__score";
        _tableRows[9][3] = "row-10__date";
var tableRows = _tableRows;


munchers.createMonster = function(){ return {}; };
munchers.createPlayer = function(){ return { name: "player" } };


/*
 *  Module      : Muncher's Grid
 *  Date Created: 3/24/2016
 *  Author      : (Stephen) Ben Switzer
 *  Description : 
 *  This grid will house all of the numbers
 *  in a 2 dimensional array (_grid object). These multiples will be random 
 *  and it will be up to the player to select the numbers that
 *  are multiple of the value stored in _number. 
 *  The grid's dimensions are set using the GRID_HEIGHT and GRID_WIDTH
 *  variables. 
 *  
 *  -- generateMonster() - places a monster on the perimeter of the grid.
 *  this will be placed at random (if the (player/a troggle) isn't already
 *  occupying the square).
 *
 *  -- generateMultiple() - sets the _number variable to a random number
 *  between 2 and 11. This will be used to determine the multiples the 
 *  player must search for on the grid.
 *
 *  -- grid() - returns the _grid object.
 *
 *  -- fill() - fills up the board with random numbers and random multiples
 *  of the _number variable. It uses 2 for loops to iterate over every
 *  position on the grid from (0, 0) to (GRID_WIDTH - 1, GRID_HEIGHT - 1).
 *
 *  -- number() - returns the value of _number. 
 *
 *  -- reset() -- clears the grid, sets every position int he grid to ''.
 *
 *  -- debug() -- displays the current grid's dimensions and the value of
 *  _number. Prints out the entire grid in console, showing the positions 
 *  of the troggles and player. 
 */
munchers.createGrid = function () {
  // Height and Width of the grid.
  var GRID_HEIGHT = 6;
  var GRID_WIDTH = 5;
  
  // the grid array
  var _grid = [];

  // The number the player will have to find multiples of.
  var _number; 
  
 return {
    // This function is used to generate a monster onto the board
    // from a corner of the board.
    generateMonster: function () {
        // position to generate troggle
        var h = 0, w = 0;
        

        var corner = parseInt(Math.random() * 4);
        
        // 0 = top line
        if(corner === 0)
        {
          w = parseInt(Math.random() * GRID_WIDTH);
        }
        // 1 = left line
        else if(corner === 1)
        {
          h = parseInt(Math.random() * GRID_HEIGHT);
        }
         // 2 = bottom line
        else if(corner === 2)
        {
          h = GRID_HEIGHT - 1;
          w = parseInt(Math.random() * GRID_WIDTH);
        }
        // 3 = right line 
        else 
        {
          w = GRID_WIDTH - 1;
          h = parseInt(Math.random() * GRID_HEIGHT);
        }

        // if an object isn't already in place, then place a monster.
        if(typeof _grid[w][h] !== "object")
        {
          _grid[w][h] = munchers.createMonster();
        }        
    },

    // Generate a number between 2 and 12
    generateMultiple: function(){
      _number = parseInt((Math.random() * 10) + 2);
    },

    // Returns the grid object.
    grid: function () { 
      return _grid; 
    },

    // fills the board with numbers, and produces multiples of said numbers. 
    fill: function () {
        for(var w = 0; w < GRID_WIDTH; ++w)
        {
          _grid[w] = [];
          for(var h = 0; h < GRID_HEIGHT; ++h){

            // assign a random number to c.
            var c = parseInt(Math.random() * 5);
           
            // take the number and apply a multipler. 
            var multiplied = _number * parseInt((1 + (Math.random() * 5)));
            
            // so if the value of c is 3, then we will 
            // a) assign the grid position to the multiplied number, or
            // b) take the multipled number and add a random number to it. 
            _grid[w][h] = parseInt( c % 3 == 0 ? 
              multiplied            
              : (multiplied + ((Math.random() + 1) * 11 ) )
              );  

          } // end of height for loop.
        } // end of width for loop.

        _grid[2][2] = munchers.createPlayer();
    },

    // return the number we are looking for multiples of.
    number: function () {
      return _number;
    },

    // Clears the grid.
    reset: function () {
      for(var w = 0; w < GRID_WIDTH; ++w)
      {
        for(var h = 0; h < GRID_HEIGHT; ++h)
        {
          _grid[w][h] = '';
        }
      }
    },

    /*
     *   Debug Methods
     */

    // Prints out a current display of the grid.
    debug: function()
    {
      console.log("Grid dimensions: " + GRID_WIDTH + " by " + GRID_HEIGHT + "\n");
      console.log("     Multiples of " + _number + "\n");
       for(var h = 0; h < GRID_HEIGHT; ++h)
       {
        var g = "";
        for(var w = 0; w < GRID_WIDTH; ++w)
        {
          if(typeof _grid[w][h] !== "object")
          {
            g += _grid[w][h] + (_grid[w][h] < 10 ? "    " : "   ");
          }
          else 
          {
            if(_grid[w][h].name == undefined)
              g += "T    ";
            else
              g += "M    ";
          }
        }
        console.log(g + "\n");
      }
    }

  } // end of grid
} 
munchers.grid = munchers.createGrid();

/*
 *  Module      : Munchers' Leader Board
 *  Date Created: 3/22/2016
 *  Author      : Brent Miller & Nicholas Voran
 *
 *  Description : The Leaderboard is a FireBase-persisted top 10 leaderboard.
 *      It is persisted using the munchers.fireFunctions() library, and requires
 *      a minimum of a mere score to add a new score to the Leaderboard.
 *  
 *  
 *  -- getScores() - returns a copy of the application's current high scores as
 *  an array of objects. A high score object follows the following template:
 *  {
 *    score: number
 *    playerName: string
 *    schoolName: string
 *    date: Date
 *  }
 *
 *  -- submitScore() - accepts a score for submission to the leader board. It
 *  stores the score if (1) the parameters are valid AND (2a) the score is
 *  higher than the lowest current high score OR (2b) the leader board has not
 *  yet reached its defined maximum number of high scores.
 *
 *  -- clear() - purges the leader board of scores.
 * 
 * -- print() - prints the All_Time_Leaderboard to an HTML table
 * 
 * -- print_School() - prints the School_Specific_Leaderboard to an HTML table
 */
munchers.createLeaderBoard = function () {
  var MAX_NUM_HIGH_SCORES = 10;
        
  return {
    // Return a copy of the high scores array. The score objects in the array
    // are also copies of the original array's scores, thus effectively
    // encapsulating the member data.
    getScores: function () {
       return munchers.fire.getScores();
    },
    
        
    /* IF (1) the parameter score beats the lowest high score OR (2) the leader
     * board has not reached the maximum number of scores, THEN add the score to
     * the high scores array and pop the lowest score.
     *
     * number _score:      The ending game's final score.
     * string _playerName: The current player's name.
     * string _schoolName: The current player's school's name.
     *
     * returns boolean: True means the score was added to the board, false
     *                  means it was not.
     */
    submitScore: function (_score, _schoolName) { 
      var userData = myDatabase.getAuth();
      var _playerName;
      
      // If the caller didn't pass in a valid score, just return false.
      if (_score == null || _score == undefined || isNaN(_score)) {
        return false;
      } else {
          
        // If _schoolName is blank, insert "Anonymous"
        // If user is not logged in, terminate
            // Firebase push requires a defined value for all parameters
        
        if (!userData){
            _playerName = "Anonymous";
        } 
        else {
            _playerName = userData.facebook.displayName;
        }
        
        if (_schoolName == null || _schoolName == undefined){
            _schoolName = "Anonymous";
        }
        
        // Create date object to pull strings from
        var tempDate = new Date();

        // Create new JSON date boject compatible with Firebase
        var _date = {
            Year:  tempDate.getFullYear(),
            Month: tempDate.getMonth(),
            Day:   tempDate.getDate()
        }  

        // Create newHighScore object encapsilating new date object and player score information
        var newHighScore = {
          score:      _score,
          playerName: _playerName,
          schoolName: _schoolName,
          date:       _date
        };  
        
        // Check if All_Time_Leaderboard is full
        if (munchers.fire.getEntryCount() < MAX_NUM_HIGH_SCORES){
            myDatabase.push(newHighScore).setPriority(newHighScore.score);
        } else {
            // Else if high score qualifies for All_TimeLeaderboard
            if ((munchers.fire.getLowScore()).score < newHighScore.score){
                myDatabase.push(newHighScore).setPriority(newHighScore.score);
                munchers.fire.trimTheEnds();
            }
        }      
        return true;
      }  // end of if (score == null || score == undefined)
    },  // end of submitScore()

    // Clear all leaderboards - primarily for testing purposes.
    clear: function () {
        myDatabase.remove();
    },
    // Purpose: 
    // Function Call: munchers.leaderBoard.print()
    print: function () {
        console.log("Starting getScores()");
         var leaderBoardArray = munchers.fire.getScores();
            console.log("getScores() completed");
         var leaderBoardLength = leaderBoardArray.length; 
            console.log("leaderBoardLength: ", leaderBoardLength);
         for (var i=0; i < leaderBoardLength; ++i){
            document.getElementById(tableRows[i][0]).innerHTML = leaderBoardArray[i].playerName;
            document.getElementById(tableRows[i][1]).innerHTML = leaderBoardArray[i].schoolName;
            document.getElementById(tableRows[i][2]).innerHTML = leaderBoardArray[i].score;
            document.getElementById(tableRows[i][3]).innerHTML = leaderBoardArray[i].date.Month + "/" + leaderBoardArray[i].date.Day + "/" + leaderBoardArray[i].date.Year;
         }
            console.log("End of print()");
         return true;
    }
  };  // end of created leaderboard object
}  
munchers.leaderBoard = munchers.createLeaderBoard();

/************************************************************************************
 *  Module      : Munchers Firebase Functions (authentication & manipulation)
 *  Date Created: 3/26/16
 *  Author      : Nicholas Voran
 *  Description : 
 *      The Munchers Authentication Functions provide a method of authenticating
 *      a given user. During successful authentication, user data is provided by 
 *      Facebook in the form of of the authData object. This object contains useful 
 *      user data and authentication tokens to verify authentication at any time. The
 *      non-authentications provide utilities with which to store, retrieve, and 
 *      manipulate our data in Firebase.
 *  Documentation: Firebase Facebook Authentication 
 *      https://www.firebase.com/docs/web/guide/login/facebook.html
 *      The documentation above includes a listing of all member variables and 
 *      functions of the authData object.
 *  Functions:
 *      login()
 *          Description: Creates a pop-up window which will prompt the user to log in 
 *          using their facebook credentials. Once the user successfully authenticates,
 *          the userData object is populated with user information and auth tokens.
 *          Returns: N/A
 *      logout() 
 *          Description: Deauthenticates the currrent Firebase session.
 *          Returns: N/A
 *      getAllTimeLowScore()
 *          Description: 
 *          Returns:
 *      getSchoolLowScore(_schoolName)
 *          Description: 
 *          Returns:
        getAllTimeEntryCount()
 *          Description: 
 *          Returns:
 *      getSchoolEntryCount(_schoolName)
 *          Description: 
 *          Returns:  
 *      
 ***********************************************************************************/
 munchers.fireFunctions = function(){
    var tempScore = {};
    var tempCount1;
    var tempCount2;
    return {
        // Purpose: Set up console feedback for user authentication and deauthentication
        // Function Call: munchers.fire.setAuth()
        setAuth: function(){
            myDatabase.onAuth(function(authData) {
                if (authData) {
                    console.log("Client Authenticated:", authData.facebook.displayName);
                    document.getElementById("phaser-canvas").style.color= "#000000";
                    document.getElementById("phaser-canvas").innerHTML = "";
                    document.getElementById("links__logout").style.display= "initial";
                    document.getElementById("links__logout").innerHTML = "Log Out (" + authData.facebook.displayName + ")";
                    document.getElementById("links__login").style.display= "none";
                } else {
                    console.log("Client Deauthenticated.");
                    document.getElementById("phaser-canvas").style.color= "#888888";
                    document.getElementById("phaser-canvas").innerHTML = "Welcome to Return of the Number Munchers!";
                    document.getElementById("links__login").style.display= "initial";
                    document.getElementById("links__logout").style.display= "none";
                }
            });
        },
        
        // Purpose: log the user into application using Firebase Facebook authentication.
        // Function Call: munchers.fire.login()
        login: function(){
            myDatabase.authWithOAuthPopup("facebook", function(error, authData){
                if (error) {
                    console.log("Login Failed!", error);
                } // end if(error)
                else {
                    // Assign user data to userData variable with munchers.js scope
                    userData = authData;
                } // end else
            },{
                remember: "sessionOnly"
            }); // end myDatabase.authWithOAuthPopup
        }, // end login()
        
        // Purpose: log the user out and print to console for verification.
        // Function Call: munchers.fire.logout()
        logout: function(){
            myDatabase.unauth();

        }, // end logout()
        
        // Purpose: Get lowest score (object) from All_Time_Leaderboard
        // Function Call: munchers.fire.getLowScore();
        getLowScore: function(){
            myDatabase.orderByChild("score").limitToFirst(1).once("child_added", function(snapshot) {
                tempScore = snapshot.val();
            });
    
            return tempScore;  
        }, // end 
        
        // Purpose: Get count of entries to All_Time_Leaderboard.
        // Function Call: munchers.fire.getEntryCount(); 
        getEntryCount: function(){
            myDatabase.once("value", function(snapshot) {
                tempCount1 = snapshot.numChildren();
           });
            return tempCount1;
        }, // end 
        
        // Purpose: Remove the lowest score from the All_Time_Leaderboard
        // Function Call: munchers.fire.trimTheEnds();
        trimTheEnds: function () {
            var tempKey;

            myDatabase.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
                tempKey = snapshot.key();
            });

            myDatabase.child(tempKey).remove();
        },

        // Purpose: Return local copy of All_Time_Leaderboard
        // Function Call: munchers.fire.getScores();
        getScores: function () {
            var localCopy = [];

            myDatabase.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    localCopy.unshift(childSnapshot.val());
                    //console.log("Logout successful:", userData.facebook.displayName);
                });  
            });
            
            return localCopy;
        }
    }; // end definition of fireFunctions object
} 
munchers.fire = munchers.fireFunctions();

munchers.phaserFunctions = function(){
    var confirmed;
    return {
        // Purpose:
        // Function Call: munchers.phaser.newGame();
        newGame: function(){
            var authTest = myDatabase.getAuth();
            if (authTest){
                if (game){
                    confirmed = confirm("Do you want to exit the existing game?");
                    if (confirmed){
                        document.getElementById("phaser-canvas").innerHTML = "";
                        munchers.phaser.loadPhaser();
                    } 
                } else {
                    document.getElementById("phaser-canvas").innerHTML = "";
                    munchers.phaser.loadPhaser();
                }
                
            } else {
                alert ("You must be logged in to play!");
            }
        },
        // Purpose:
        // Function Call: munchers.phaser.loadPhaser();
        loadPhaser: function(){
            // I want to play a game. </saw>
            game = new Phaser.Game(800, 500, Phaser.AUTO, 'phaser-canvas', { preload: preload, create: create, update: update });

            function preload () {                

            }
            function create () {

            }
            function update() {

            } 
        }
    };
}
munchers.phaser = munchers.phaserFunctions();
