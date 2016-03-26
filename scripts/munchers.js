"use strict";

// This object serves as a namespace for our custom code, thus preventing the
// pollution of the global scope.
var munchers = {};

munchers.createMonster = function(){ return {}; };

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

    // fills the board with numbers, and producdes multiples of said numbers. 
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
    },

    // return the number we are looking for multiples of.
    number: function () {
      return _number;
    },

    // Clears the grid.
    reset: function () {
      for(var w = 0; w < GRID_WIDTH; ++w)
        for(var h = 0; h < GRID_HEIGHT; ++h)
          _grid[w][h] = '';
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
            g += _grid[w][h] + (_grid[w][h] < 10 ? "    " : "   ");
          else 
            g += "T    ";
        }
        console.log(g + "\n");
      }
    }

  } // end of grid
} // end of createGrid


// Creates an encapsulated leaderboard object.
munchers.createLeaderBoard = function () {
  var MAX_NUM_HIGH_SCORES = 10;
  var highScores = [];
        
  return {
    // Return a copy of the high scores array. The score objects in the array
    // are also copies of the original array's scores, thus effectively
    // encapsulating the member data.
    getScores: function () {
      var copy = [];
            
      highScores.map(function (highScore) {
        copy.push(Object.assign(highScore));
      });
            
      return copy;
    },
        
    /* If the parameter score beats the lowest high score, add the score to
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

        // Check to see if the parameter score qualifies.
        var indexToInsert = highScores.findIndex(function (highScore) {
          if (_score > highScore) {
            return true;
          }
        });

        // If the parameter score doesn't qualify.
        if (indexToInsert === -1) {
          // If the leaderboard isn't full, add the new score anyway.
          if (highScores.length < MAX_NUM_HIGH_SCORES) {
            highScores.push(_score);
          } else {
            return false;
          }
        } else {
          // Insert the new high score.
          highScores.splice(indexToInsert, 0, newHighScore);
        }                

        // Remove lowest high score if too many scores exist.
        if (highScores.length > MAX_NUM_HIGH_SCORES) {
          highScores.pop();
        }
                
        return true;
      }  // end of if (score == null || score == undefined)
    },  // end of submitScore()
    
    purgeScores: function () {
        highScores = [];
    }
  }  // end of created leaderboard object
}  // end of createLeaderBoard()

munchers.leaderBoard = munchers.createLeaderBoard();
munchers.grid = munchers.createGrid();

