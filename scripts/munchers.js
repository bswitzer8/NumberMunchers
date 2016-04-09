// username: fsunumbermunchers@gmail.com
// password: gotta munch em all

var myDatabase = new Firebase("https://fsu-number-munchers.firebaseio.com/")
var allTimeScoresRef = myDatabase.child("All_Time_Leaderboard");
//var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + newHighScore.schoolName);

"use strict";

// This object serves as a namespace for our custom code, thus preventing the
// pollution of the global scope.
var munchers = {};
// userData stores the auth object which is returned by FaceBook authenication. This variable contains 
// user information.
var userData;
// tableRows acts as a Table ID selector for any individual cell in the aray.
var _tableRows = new Array(10);
        for (var i = 0; i < 10; i++){
            _tableRows[i] = new Array(3);
        }
        _tableRows[0][0] = "TR1TD1";
        _tableRows[0][1] = "TR1TD2";
        _tableRows[0][2] = "TR1TD3";
        _tableRows[0][3] = "TR1TD4";
        _tableRows[1][0] = "TR2TD1";
        _tableRows[1][1] = "TR2TD2";
        _tableRows[1][2] = "TR2TD3";
        _tableRows[1][3] = "TR2TD4";
        _tableRows[2][0] = "TR3TD1";
        _tableRows[2][1] = "TR3TD2";
        _tableRows[2][2] = "TR3TD3";
        _tableRows[2][3] = "TR3TD4";
        _tableRows[3][0] = "TR4TD1";
        _tableRows[3][1] = "TR4TD2";
        _tableRows[3][2] = "TR4TD3";
        _tableRows[3][3] = "TR4TD4";
        _tableRows[4][0] = "TR5TD1";
        _tableRows[4][1] = "TR5TD2";
        _tableRows[4][2] = "TR5TD3";
        _tableRows[4][3] = "TR5TD4";
        _tableRows[5][0] = "TR6TD1";
        _tableRows[5][1] = "TR6TD2";
        _tableRows[5][2] = "TR6TD3";
        _tableRows[5][3] = "TR6TD4";
        _tableRows[6][0] = "TR7TD1";
        _tableRows[6][1] = "TR7TD2";
        _tableRows[6][2] = "TR7TD3";
        _tableRows[6][3] = "TR7TD4";
        _tableRows[7][0] = "TR8TD1";
        _tableRows[7][1] = "TR8TD2";
        _tableRows[7][2] = "TR8TD3";
        _tableRows[7][3] = "TR8TD4";
        _tableRows[8][0] = "TR9TD1";
        _tableRows[8][1] = "TR9TD2";
        _tableRows[8][2] = "TR9TD3";
        _tableRows[9][0] = "TR10TD1";
        _tableRows[9][1] = "TR10TD2";
        _tableRows[9][2] = "TR10TD3";
        _tableRows[9][3] = "TR10TD4";
var tableRows = _tableRows;

/*
<table style="width:100%">
	<tr>
        <td id="TR1TD1"></td>
        <td id="TR1TD2"></td>
        <td id="TR1TD3"></td>
        <td id="TR1TD4"></td>
    </tr>
    <tr id="TR2">
        <td id="TR2TD1"></td>
        <td id="TR2TD2"></td>
        <td id="TR2TD3"></td>
        <td id="TR2TD4"></td>
    </tr>
    <tr id="TR3">
        <td id="TR3TD1"></td>
        <td id="TR3TD2"></td>
        <td id="TR3TD3"></td>
        <td id="TR3TD4"></td>
    </tr>
    <tr id="TR4">
        <td id="TR4TD1"></td>
        <td id="TR4TD2"></td>
        <td id="TR4TD3"></td>
        <td id="TR4TD4"></td>
    </tr>
    <tr id="TR5">
        <td id="TR5TD1"></td>
        <td id="TR5TD2"></td>
        <td id="TR5TD3"></td>
        <td id="TR5TD4"></td>
    </tr>
    <tr id="TR6">
        <td id="TR6TD1"></td>
        <td id="TR6TD2"></td>
        <td id="TR6TD3"></td>
        <td id="TR6TD4"></td>
    </tr>
    <tr id="TR7">
        <td id="TR7TD1"></td>
        <td id="TR7TD2"></td>
        <td id="TR7TD3"></td>
        <td id="TR7TD4"></td>
    </tr>
    <tr id="TR8">
        <td id="TR8TD1"></td>
        <td id="TR8TD2"></td>
        <td id="TR8TD3"></td>
        <td id="TR8TD4"></td>
    </tr>
    <tr id="TR9">
        <td id="TR9TD1"></td>
        <td id="TR9TD2"></td>
        <td id="TR9TD3"></td>
        <td id="TR9TD4"></td>
    </tr>
    <tr id="TR10">
        <td id="TR10TD1"></td>
        <td id="TR10TD2"></td>
        <td id="TR10TD3"></td>
        <td id="TR10TD4"></td>
    </tr>
*/

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
 * -- print_AllTime() - prints the All_Time_Leaderboard to an HTML table
 * 
 * -- print_School() - prints the School_Specific_Leaderboard to an HTML table
 */
munchers.createLeaderBoard = function () {
  var MAX_NUM_HIGH_SCORES = 10;
        
  return {
    // Return a copy of the high scores array. The score objects in the array
    // are also copies of the original array's scores, thus effectively
    // encapsulating the member data.
    getScores_AllTime: function () {
       return munchers.fire.getScores_AllTime();
    },
    
    getScores_School: function () {
       return munchers.fire.getScores_School();
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
        
        // Create new reference to school specific leaderboard
        var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + newHighScore.schoolName);
        
        // Check if All_Time_Leaderboard is full
        if (munchers.fire.getEntryCount_AllTime() < MAX_NUM_HIGH_SCORES){
            allTimeScoresRef.push(newHighScore).setPriority(newHighScore.score);
        } else {
            // Else if high score qualifies for All_TimeLeaderboard
            if (munchers.fire.getLowScore_AllTime()._score < newHighScore.score){
                allTimeScoresRef.push(newHighScore).setPriority(newHighScore.score);
                trimTheEnds_AllTime();
            }
        }

        // Check if School_Specific_Leaderboard is full
        if (munchers.fire.getEntryCount_School(newHighScore.schoolName) < MAX_NUM_HIGH_SCORES){
            schoolScoresRef.push(newHighScore).setPriority(newHighScore.score);
        } else {
            // Else if high score qualifies for School_Specific_Leaderboard
            if (munchers.fire.getLowScore_School(newHighScore.schoolName) < newHighScore.score){
                schoolScoresRef.push(newHighScore).setPriority(newHighScore.score);
                trimTheEnds_School(newHighScore.schoolName);
            }
        }
        
        return true;
      }  // end of if (score == null || score == undefined)
    },  // end of submitScore()

    // Clear all leaderboards - primarily for testing purposes.
    clear: function () {
        myDatabase.remove();
    },
    
    print_AllTime: function () {
         var leaderBoard = munchers.fire.getScores_AllTime();
         var leaderBoardLength = leaderBoard.length; 
         for (var i=0; i < leaderBoardLength; i++){
            document.getElementById(tableRows[i][0]).innerHTML = leaderBoard[i].score;
            document.getElementById(tableRows[i][1]).innerHTML = leaderBoard[i].playerName;
            document.getElementById(tableRows[i][2]).innerHTML = leaderBoard[i].schoolName;
            document.getElementById(tableRows[i][3]).innerHTML = leaderBoard[i].date.Month + "/" + leaderBoard[i].date.Day + "/" + leaderBoard[i].date.Year;
         }
         return true;
    },
    
    print_School: function (_schoolName) {
         var leaderBoard = munchers.fire.getScores_School(_schoolName);
         var leaderBoardLength = leaderBoard.length; 
         for (var i=0; i < leaderBoardLength; i++){
             document.getElementById(tableRows[i]).innerHTML = leaderBoard[i].score + " " + leaderBoard[i].playerName + " " + leaderBoard[i].schoolName;
         }
         return true;
    }
  };  // end of created leaderboard object
}  // end of createLeaderBoard()

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
                } // end else
            },{
                remember: "sessionOnly"
            }); // end myDatabase.authWithOAuthPopup
            
           document.getElementById("logout-link").style.display= "initial";
           document.getElementById("login-link").style.display= "none";
        }, // end login()
        
        // Purpose: log the user out and print to console for verification.
        // Function Call: munchers.fire.logout()
        logout: function(){
            myDatabase.unauth() 
            {
                console.log("Logout successful:", userData.facebook.displayName);
            }; 
            document.getElementById("logout-link").style.display= "none";
            document.getElementById("login-link").style.display= "initial";
        }, // end logout()
        
        // Purpose: Get lowest score (object) from All_Time_Leaderboard
        // Function Call: munchers.fire.getLowScore_AllTime();
        getLowScore_AllTime: function(){
            allTimeScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
                tempScore = snapshot.val();
            });
    
            return tempScore;  
        }, // end 
        
        // Purpose: Get lowest score (object) from School_Specific_Leaderboard
        // Function Call: munchers.fire.getLowScore_School(_schoolName); 
        getLowScore_School: function(_schoolName) {
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);

            schoolScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
                tempScore = snapshot.val();
            });

            return tempScore;
        }, // end
        
        // Purpose: Get count of entries to All_Time_Leaderboard.
        // Function Call: munchers.fire.getEntryCount_AllTime(); 
        getEntryCount_AllTime: function(){
           allTimeScoresRef.once("value", function(snapshot) {
                tempCount = snapshot.numChildren();
           });

           return tempCount;
        }, // end 
        
        // Purpose: Get count of entries to School_Specific_Leaderboard.
        // Function Call: munchers.fire.getEntryCount_School(_schoolName);
        getEntryCount_School: function (_schoolName){
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);

            schoolScoresRef.once("value", function(snapshot) {
                tempCount = snapshot.numChildren();
            });
            
            return tempCount; 
        },
        
        // Purpose: Remove the lowest score from the All_Time_Leaderboard
        // Function Call: munchers.fire.trimTheEnds_AllTime();
        trimTheEnds_AllTime: function () {
            var tempKey;

            allTimeScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
                tempKey = snapshot.key();
            });

            allTimeScoresRef.child(tempKey).remove();
        },
        
        // Purpose: Remove the lowest score from the School_Specific_Leaderboard
        // Function Call: munchers.fire.trimTheEnds_School(_schoolName);
       trimTheEnds_School: function (_schoolName){
            var tempKey;
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _schoolName);

            schoolScoresRef.orderByChild("score").limitToFirst(1).on("child_added", function(snapshot) {
                tempKey = snapshot.key();   
            });

            schoolScoresRef.child(tempKey).remove();
        },

        // Purpose: Return local copy of All_Time_Leaderboard
        // Function Call: munchers.fire.getScores_AllTime();
        getScores_AllTime: function () {
            var localCopy = [];

            allTimeScoresRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    localCopy.unshift(childSnapshot.val());
                });     
            });
            
            return localCopy;
        },

        // Purpose: Return local copy of School_Specific_Leaderboard
        // Function Call: munchers.fire.getScores_School(_school);
        getScores_School: function (_school) {
            var schoolScoresRef = myDatabase.child("School_Specific_Leaderboards/" + _school);
            var localCopy = [];

            schoolScoresRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    localCopy.unshift(childSnapshot.val());
                });     
            });
    
            return localCopy;
        }
    }; // end definition of fireFunctions object
} // end fireFunctions
// set munchers.fire name accessibility

munchers.fire = munchers.fireFunctions();

/*

if (!userData){
        munchers.fire.login();
    }
    if (userData) {
        console.log("User " + userData.facebook.displayName + " is logged in with " + userData.provider);
        munchersTest.RunTests();
    } else {
        console.log("User is logged out");
    }

*/