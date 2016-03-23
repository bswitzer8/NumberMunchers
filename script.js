function createLeaderBoard () {
  var MAX_NUM_HIGH_SCORES = 10;
  var highScores = [];
        
  return {
    // Return a copy of the high scores array.
    getScores: function () {
      var copy = [];
            
      highScores.map(function (highScore) {
        result.push(highScore);
      });
            
      return copy;
    },
        
    /* If the parameter score beats the lowest high score, add the score to
     * the high scores array and pop the lowest score.
     *
     * string _playerName: The current player's name.
     * number _score:      The ending game's final score.
     * string _schoolName: The current player's school's name.
     * Date   _date:       The date the game ended.
     *     (An undefined inDate parameter defaults to the current date.)
     *
     * returns boolean: True means the score was added to the board, false
     *                  means it was not.
     */
    submitScore: function (_playerName, _score, _schoolName, _date) {
      // If the caller didn't pass in the score, just return false.
      if (_score == null && _score == undefined) {
        return false;
      } else {
        var newHighScore = {
          playerName: _playerName,
          score:      _score,
          schoolName: _schoolName,
          date:       (_date == null || _date == undefined) ? new Date() :
                           _date;
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
                
          // Remove lowest high score if too many scores exist.
          if (highScores.length > MAX_NUM_HIGH_SCORES) {
            highScores.pop();
          }
                
          return true;                
        }
      }  // end of if (score == null || score == undefined)
    }  // end of submitScore()
  }  // end of created leaderboard object
}  // end of createLeaderBoard()
