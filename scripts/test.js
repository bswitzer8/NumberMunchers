// namespace for our unit tests
var munchersTest = {};

// UTILITY FUNCTIONS

// Add a header to the page for the next block of test results.
munchersTest.describeBlock = function (description) {
  var newHeader = document.createElement('h4');
  
  newHeader.innerHTML = description;
  document.body.appendChild(newHeader);
};

// Log a test's result to the page.
munchersTest.logResult = function (testDescription, didTestPass) {
  var newLog = document.createElement('p');
  
  testDescription += ' -- ';
  testDescription += didTestPass ? 'PASSED' : 'FAILED';
  
  newLog.innerHTML   = testDescription;
  newLog.style.color = didTestPass ? 'green' : 'red';
  
  document.body.appendChild(newLog);
};



// LEADER BOARD TESTS

munchersTest.leaderBoardTests = {};

munchersTest.leaderBoardTests.shouldRejectNullScore = function () {
  var wasCallRejected;
  var isBoardEmpty;

  munchers.leaderBoard.clear();
  
  wasCallRejected = !munchers.leaderBoard.submitScore(null, 'school');
  isBoardEmpty    = munchers.leaderBoard.getScores().length === 0;
  
  return wasCallRejected && isBoardEmpty;
};

munchersTest.leaderBoardTests.shouldRejectUndefinedScore = function () {
  var wasCallRejected;
  var isBoardEmpty;

  munchers.leaderBoard.clear();
  
  wasCallRejected = !munchers.leaderBoard.submitScore(undefined, 'school');
  isBoardEmpty    = munchers.leaderBoard.getScores().length === 0;
  
  return wasCallRejected && isBoardEmpty;
};

munchersTest.leaderBoardTests.shouldRejectStringScore = function () {
  var wasCallRejected;
  var isBoardEmpty;

  munchers.leaderBoard.clear();
  
  wasCallRejected = !munchers.leaderBoard.submitScore('not a number', 'school');
  isBoardEmpty    = munchers.leaderBoard.getScores().length === 0;
  
  return wasCallRejected && isBoardEmpty;
};

munchersTest.leaderBoardTests.shouldRejectEmptyScore = function () {
  var wasCallRejected;
  var isBoardEmpty;

  munchers.leaderBoard.clear();
  
  wasCallRejected = !munchers.leaderBoard.submitScore();
  isBoardEmpty    = munchers.leaderBoard.getScores().length === 0;
  
  return wasCallRejected && isBoardEmpty;
};

munchersTest.leaderBoardTests.shouldAcceptValidScore = function () {
  var wasCallAccepted;
  var doesBoardHaveAScore;

  munchers.leaderBoard.clear();
  
  wasCallAccepted     = munchers.leaderBoard.submitScore(100, 'school');
  doesBoardHaveAScore = munchers.leaderBoard.getScores().length > 0;
  
  return wasCallAccepted && doesBoardHaveAScore;
};

munchersTest.leaderBoardTests.shouldAcceptScoreWithoutNames = function () {
  var wasCallAccepted;
  var doesBoardHaveAScore;

  munchers.leaderBoard.clear();
  
  wasCallAccepted     = munchers.leaderBoard.submitScore(100);
  doesBoardHaveAScore = munchers.leaderBoard.getScores().length > 0;
  
  return wasCallAccepted && doesBoardHaveAScore;
};

munchersTest.leaderBoardTests.shouldCreateHighScoreObjectWithCorrectProperties = function () {
  var highScoreObject;
  var objectPropertyNames;

  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(100, 'school');

  highScoreObject  = munchers.leaderBoard.getScores()[0];
  objectPropertyNames = Object.getOwnPropertyNames(highScoreObject);
  
  return objectPropertyNames.length   === 4 &&
    typeof highScoreObject.score      === 'number' &&
    typeof highScoreObject.playerName === 'string' &&
    typeof highScoreObject.schoolName === 'string';
};

munchersTest.leaderBoardTests.shouldUseTodaysDate = function () {
  var highScoreObject;
  var todaysDate = new Date();

  var isTodaysYear;
  var isTodaysMonth;
  var isTodaysDate;

  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(100, 'school');

  highScoreObject = munchers.leaderBoard.getScores()[0];

  isTodaysYear  = highScoreObject.date.Year === todaysDate.getFullYear();
  isTodaysMonth = highScoreObject.date.Month    === todaysDate.getMonth();
  isTodaysDate  = highScoreObject.date.Day     === todaysDate.getDate();

  return isTodaysYear && isTodaysMonth && isTodaysDate;
};

munchersTest.leaderBoardTests.shouldSortHighScoresByScore = function () {
  var isFirstScoreFirst;
  var isSecondScoreSecond;
  var isThirdScoreThird;
  
  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(22, 'score');
  munchers.leaderBoard.submitScore(1,  'score');
  munchers.leaderBoard.submitScore(333,  'score');
  
  isFirstScoreFirst   = munchers.leaderBoard.getScores()[0].score === 333;
  isSecondScoreSecond = munchers.leaderBoard.getScores()[1].score === 22;
  isThirdScoreThird   = munchers.leaderBoard.getScores()[2].score === 1;

  return isFirstScoreFirst && isSecondScoreSecond && isThirdScoreThird;
}

munchersTest.leaderBoardTests.shouldEnforceMaxNumOfScores = function () {
  var numScoresSubmitted = 0;
  var numScoresStored;
  
  munchers.leaderBoard.clear();
  
  for (var i = 0; i < 11; ++i) {
    munchers.leaderBoard.submitScore(i);
    ++numScoresSubmitted;
  }
  
  numScoresStored = munchers.leaderBoard.getScores().length;
  
  return numScoresSubmitted === 11 && numScoresStored === 10;
}

munchersTest.leaderBoardTests.shouldEncapsulateHighScoresArray = function () {
  var isHighScoresArrayPublic;
  var copyOfArray;
  var doChangesPropogate;
  
  isHighScoresArrayPrivate =
    munchers.leaderBoard.hasOwnProperty('highScores') === false;
  
  munchers.leaderBoard.clear();
  copyOfArray = munchers.leaderBoard.getScores();  
  munchers.leaderBoard.submitScore(333, 'score');
  doChangesPropogate = copyOfArray.length === munchers.leaderBoard.getScores().length;

  return isHighScoresArrayPrivate && !doChangesPropogate;
}

munchersTest.leaderBoardTests.shouldPrintLeaderboardTable = function () {
    munchers.leaderBoard.clear();
    munchers.leaderBoard.submitScore(22, 'score');
    munchers.leaderBoard.submitScore(1,  'score');
    munchers.leaderBoard.submitScore(333,  'score');
    return munchers.leaderBoard.print();
}

// GRID TESTS

munchersTest.gridTests = {};

munchersTest.gridTests.grid = munchers.grid;
munchersTest.gridTests.grid.generateMultiple();
munchersTest.gridTests.grid.fill();

munchersTest.gridTests.generateMultipleAndNumberTest = function () {
  munchersTest.gridTests.grid.generateMultiple();
  return !isNaN( munchersTest.gridTests.grid.number() )
}

munchersTest.gridTests.shouldProduceGridAsArray = function () {
  return Array.isArray( munchersTest.gridTests.grid.grid() );
}

munchersTest.gridTests.shouldFillGridWithNumbers = function () {
  var g = munchersTest.gridTests.grid.grid();
  var blank = false;

  // test for any blanks in the grid.
  for(var i = 0; i < 5; ++i) {
    for(var j = 0; j < 6; ++j) {
      if( (isNaN(g[i][j].value) && (typeof g[i][j].value != "object"))) {
        blank = true;
        break;
      }
    }
  }

  return !blank;
}

munchersTest.gridTests.shouldInitializePlayer = function () {
  var g = munchersTest.gridTests.grid.grid();
  return g[2][2].value.name === "player";
}

munchersTest.gridTests.shouldProduceADivisibleNumber = function () {
  var g = munchersTest.gridTests.grid.grid();
  var num = munchersTest.gridTests.grid.number();
  var divible = false;
    
  for(var i = 0; i < 5; ++i) {
    for(var j = 0; j < 6; ++j) {
      if( g[i][j].value % num == 0) {
        divible = true;
        break;
      }
    }
  }

  return divible;
}

munchersTest.gridTests.shouldProduceARandomTroggle = function () {
  var g = munchersTest.gridTests.grid.grid();
  var t = 0; // if t is 1 at the end of this, then createMonster was called.

  munchers.createMonster = function() { ++t; return {} };  // create a spy
  munchersTest.gridTests.grid.spawnMonster();
  
  return t > 0;
}

munchersTest.gridTests.shouldClearTheGrid = function () {
  var g = munchersTest.gridTests.grid.grid();
  var blank = true;
    
  // test to make sure everything is ''
  for(var i = 0; i < 5; ++i) {
    for(var j = 0; j < 6; ++j) {
      if(g[i][j].value != '') {
        blank = false;
      }
    }
  }

  return !blank;
}

munchersTest.gridTests.shouldDebugTheGrid = function () {
  munchersTest.gridTests.grid.debug();
  return true;
}

// FireBase Tests
munchersTest.fireTests = {};

munchersTest.fireTests.testSubmit = function () {
	munchers.leaderBoard.submitScore(Math.floor((Math.random() * 100) + 1), "score");
}
munchersTest.fireTests.testAllTimeLowScore = function () {

  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(22, 'score');
  munchers.leaderBoard.submitScore(1, 'score');
  munchers.leaderBoard.submitScore(333, 'score');
  
  return munchers.fire.getLowScore().score === 1;
}
munchersTest.fireTests.testAlltimeEntryCount = function () {

  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(22,  'score');
  munchers.leaderBoard.submitScore(1, 'score');
  munchers.leaderBoard.submitScore(333,  'score');
	
  return munchers.fire.getEntryCount()===3;
}
munchersTest.fireTests.testTrimTheEnds = function () {
 
  munchers.leaderBoard.clear();
  munchers.leaderBoard.submitScore(22, 'score');
  munchers.leaderBoard.submitScore(1, 'score');
  munchers.leaderBoard.submitScore(333, 'score');
  munchers.fire.trimTheEnds();
  var countIsTwo = munchers.fire.getEntryCount()===2;
  var lowestScoreRemoved = munchers.fire.getLowScore().score === 22;
  return countIsTwo && lowestScoreRemoved;
}

// RUN ALL TESTS HERE
munchersTest.RunTests = function () {    
  // LEADER BOARD TESTS
  munchersTest.describeBlock('The Leader Board =>');

  munchersTest.logResult(
    'Should reject the submission of a null score',
    munchersTest.leaderBoardTests.shouldRejectNullScore()
  );
  
  munchersTest.logResult(
    'Should reject the submission of an undefined score',
    munchersTest.leaderBoardTests.shouldRejectUndefinedScore()
  );
  
  munchersTest.logResult(
    'Should reject the submission of a score of type string',
    munchersTest.leaderBoardTests.shouldRejectStringScore()
  );
  
  munchersTest.logResult(
    'Should reject the submission of an empty score',
    munchersTest.leaderBoardTests.shouldRejectEmptyScore()
  );
  
  munchersTest.logResult(
    'Should accept the submission of a valid score',
    munchersTest.leaderBoardTests.shouldAcceptValidScore()
  );
  
  munchersTest.logResult(
    'Should accept the submission of a score without names',
    munchersTest.leaderBoardTests.shouldAcceptScoreWithoutNames()
  );

  munchersTest.logResult(
    'Should create a high score object with the correct properties',
    munchersTest.leaderBoardTests.shouldCreateHighScoreObjectWithCorrectProperties()
  );
  
  munchersTest.logResult(
    "Should use today's date for the high score's date property",
    munchersTest.leaderBoardTests.shouldUseTodaysDate()
  );

  munchersTest.logResult(
    'Should sort high scores by score',
    munchersTest.leaderBoardTests.shouldSortHighScoresByScore()
  );
  
  munchersTest.logResult(
    'Should enforce a max number of high scores',
    munchersTest.leaderBoardTests.shouldEnforceMaxNumOfScores()
  );

  munchersTest.logResult(
    'Should encapsulate the high scores objects',
    munchersTest.leaderBoardTests.shouldEncapsulateHighScoresArray()
  );

  munchersTest.logResult(
    'Should print leaderboard table',
    munchersTest.leaderBoardTests.shouldPrintLeaderboardTable()
  );
  
  // GRID TESTS
  munchersTest.describeBlock('The Grid =>');
  
  munchersTest.logResult(
    'Grid.generateMultiple() assigned a number to _number',
    munchersTest.gridTests.generateMultipleAndNumberTest()
  );
  
  munchersTest.logResult(
    'Grid.grid() returns an array',
    munchersTest.gridTests.shouldProduceGridAsArray()
  );
  
  munchersTest.logResult(
    'Grid.fill() fills the grid with numbers',
    munchersTest.gridTests.shouldFillGridWithNumbers()
  );
  
  munchersTest.logResult(
    'Grid.fill() initialized the player to [2][2]',
    munchersTest.gridTests.shouldInitializePlayer()
  );
  
  munchersTest.logResult(
    'Grid.fill() produced at least 1 divisible number',
    munchersTest.gridTests.shouldProduceADivisibleNumber()
  );
  
  munchersTest.logResult(
    'Grid.spawnMonster() produces a random troggle on the grid',
    munchersTest.gridTests.shouldProduceARandomTroggle()
  );
  
  munchersTest.logResult(
    "Grid.reset() clears the grid, assigning all positions the value of ''",
    munchersTest.gridTests.shouldClearTheGrid()
  );
  
  munchersTest.logResult(
    'Grid.debug() prints the grid (see your console for the ouput)',
    munchersTest.gridTests.shouldDebugTheGrid()
  );
  
  // DATABASE TESTS
  munchersTest.describeBlock('The Database =>');
  
  munchersTest.logResult(
    'All Time Low Score Returned Successfully',
	munchersTest.fireTests.testAllTimeLowScore()
  );
  munchersTest.logResult(
    'All time leadeboard entry count returned sucessfully',
	munchersTest.fireTests.testAlltimeEntryCount()
  );
  munchersTest.logResult(
    'Lowest score removed successfully from All Time Leaderboard',
	munchersTest.fireTests.testTrimTheEnds()
  );
}

window.onload = function () {
    var userData = myDatabase.getAuth();
    munchersTest.RunTests();
};  