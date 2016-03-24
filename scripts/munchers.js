// This object serves as a namespace for our custom code, thus preventing the
// pollution of the global scope.
var app = {};

// Creates an encapsulated leaderboard object.
app.createLeaderBoard = function () {
  var MAX_NUM_HIGH_SCORES = 10;
  var highScores = [];
        
  return {
    // Return a copy of the high scores array. The score objects in the array
    // are also copies of the original array's scores, thus effectively
    // encapsulating the member data.
    getScores: function () {
      var copy = [];
            
      highScores.map(function (highScore) {
        result.push(Object.assign(highScore));
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
      if (_score == null || _score == undefined || isNan(score)) {
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
          if (highScore.length < MAX_NUM_HIGH_SCORES) {
            highScores.push(score);
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

app.leaderBoard = app.createLeaderBoard();
