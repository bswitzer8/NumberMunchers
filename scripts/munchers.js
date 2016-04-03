// username: fsunumbermunchers@gmail.com
// password: gotta munch em all

//var myDatabase = new Firebase("https://fsu-number-munchers.firebaseio.com/")
//var allTimeScoresRef = myDatabase.child("All_Time_Leaderboard");
//var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + newHighScore.schoolName);

"use strict";

// This object serves as a namespace for our custom code, thus preventing the
// pollution of the global scope.
var munchers = {};
var userData;

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
} // end of createGrid



/*
 *  Module      : Munchers' Leader Board
 *  Date Created: 3/22/2016
 *  Author      : Brent Miller
 *
 *  Description : 
 *  The leader board will house the game's high scores during runtime. It
 *  validates any score submitted to it and retains all valid scores that are
 *  the ten highest scores submitted to it during runtime. For now, the leader
 *  board module does not persist its scores - some other mechanism in the
 *  application will have to handle that responsibility. Technically speaking,
 *  the module is implemented as an encapsulated JavaScript object that stores
 *  the high scores as private member data.
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
 *  -- generateMultiple() - sets the _number variable to a random number
 *  between 2 and 11. This will be used to determine the multiples the 
 *  player must search for on the grid.
 *
 *  -- grid() - returns the _grid object.
 *
 *  -- submitScore() - accepts a score for submission to the leader board. It
 *  stores the score if (1) the parameters are valid AND (2a) the score is
 *  higher than the lowest current high score OR (2b) the leader board has not
 *  yet reached its defined maximum number of high scores.
 *
 *  -- clear() - purges the leader board of scores.
 */
munchers.createLeaderBoard = function () {
  var MAX_NUM_HIGH_SCORES = 10;
  var highScores = [];
        
  return {
    // Return a copy of the high scores array. The score objects in the array
    // are also copies of the original array's scores, thus effectively
    // encapsulating the member data.
    getScores: function () {
      var copyOfArray = [];
            
      highScores.map(function (highScore) {
        var copyOfObject = {};

        Object.assign(copyOfObject, highScore)
        copyOfArray.push(copyOfObject);
      });
            
      return copyOfArray;
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
    submitScore: function (_score, _playerName, _schoolName) {
      // If the caller didn't pass in a valid score, just return false.
      if (_score == null || _score == undefined || isNaN(_score)) {
        return false;
      } else {
        var newHighScore = {
          score:      _score,
          playerName: _playerName,
          schoolName: _schoolName,
          date:       new Date()
        };
        
        //var allTimeScoresRef = myDatabase.child("All_Time_Leaderboard");
        var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + newHighScore.schoolName);
        // Check if parameter score is higher than lowest score in array.
        var arrayIndexToInsert = highScores.findIndex(function (highScore) {
          if (_score > highScore.score) {
            return true;
          }
        });

        // If the parameter score doesn't qualify.
        if (arrayIndexToInsert === -1) {
          // If the leaderboard isn't full, add the new score anyway.
          if (highScores.length < MAX_NUM_HIGH_SCORES) {
            highScores.push(newHighScore);
          } else {
            return false;
          }
        } else {
          // Insert the new high score.
          highScores.splice(arrayIndexToInsert, 0, newHighScore);
        }                

        // Remove lowest high score if too many scores exist.
        if (highScores.length > MAX_NUM_HIGH_SCORES) {
          highScores.pop();
        }
        
        // Add score to the All Time Leaderboard
        // var allTimeScoresRef = myDatabase.child("All_Time_Leaderboard");
        allTimeScoresRef.push(newHighScore).setPriority(newHighScore.score);
        //Add score to School Specific Leaderboard
        //var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + newHighScore.schoolName);
        schoolScoresRef.push(newHighScore).setPriority(newHighScore.score);
                
        return true;
      }  // end of if (score == null || score == undefined)
    },  // end of submitScore()
    
    clear: function () {
        highScores = [];
    }
  }  // end of created leaderboard object
}  // end of createLeaderBoard()



munchers.leaderBoard = munchers.createLeaderBoard();
munchers.grid = munchers.createGrid();

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
    var tempCount;
    return {
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
                    console.log("Authentication Successful:", userData.facebook.displayName);
                    document.getElementById("WelcomeMessage").innerHTML = "Welcome " + userData.facebook.displayName + "!";
                } // end else
            },{
                remember: "sessionOnly"
            }); // end myDatabase.authWithOAuthPopup
        }, // end login()
        
        // Purpose: log the user out and print to console for verification.
        // Function Call: munchers.fire.logout()
        logout: function(){
            myDatabase.unauth()
            {
                console.log("Logout successful:", userData.facebook.displayName);
                document.getElementById("WelcomeMessage").innerHTML = "Goodbye " + userData.facebook.displayName + "!";
            }; 
        }, // end logout()
        
        // Purpose: Get lowest score (object) from All_Time_Leaderboard
        // Function Call: munchers.fire.getAllTimeLowScore();
        getLowScore_AllTime: function(){
            allTimeScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
            tempScore = snapshot.val();
            });
            return tempScore;  
        }, // end 
        
        // Purpose: Get lowest score (object) from School_Specific_Leaderboard
        // Function Call: munchers.fire.getSchoolLowScore(_schoolName); 
        getLowScore_School: function(_schoolName){
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);
            schoolScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
            tempScore = snapshot.val();
            });
            return tempScore;
        }, // end
        
        // Purpose: Get count of entries to All_Time_Leaderboard.
        // Function Call: munchers.fire.getAllTimeEntryCount(); 
        getEntryCount_AllTime: function(){
           allTimeScoresRef.once("value", function(snapshot) {
                tempCount = snapshot.numChildren();
           });
           return tempCount;
        }, // end 
        
        // Purpose: Get count of entries to School_Specific_Leaderboard.
        // Function Call: munchers.fire.getSchoolEntryCount(_schoolName);
        getEntryCount_School: function (_schoolName){
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);
            schoolScoresRef.once("value", function(snapshot) {
                tempCount = snapshot.numChildren();
           });
           return tempCount; 
        },
        
        // Purpose: 
        // Function Call: 
        trimTheEnds_AllTime: function (){
           var tempKey;
           var AllDatabase = new Firebase("https://fsu-number-munchers.firebaseio.com/All_Time_Leaderboard/");
            allTimeScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
            tempKey = snapshot.key();
            return;
            });
            AllDatabase.child(tempKey).remove();

        },
        
        // Purpose: 
        // Function Call: 
       trimTheEnds_School: function (_schoolName){
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);
            schoolScoresRef.once("value", function(snapshot) {
                
            });
        }
        
        // Purpose: 
        // Function Call: 
        
    }; // end definition of fireFunctions object
} // end fireFunctions
// set munchers.fire name accessibility
munchers.fire = munchers.fireFunctions();
