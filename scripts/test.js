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
  
  newLog.innerHTML = testDescription;
  newLog.style.color = didTestPass ? 'green' : 'red';
  
  document.body.appendChild(newLog);
};



// LEADER BOARD TESTS

munchersTest.leaderBoardTests = {};

munchersTest.leaderBoardTests.shouldRejectNullScore = function () {
  var didReject1;
  var didReject2;

  munchers.leaderBoard.purgeScores();
  didReject1 = !munchers.leaderBoard.submitScore(null, 'player', 'school');
  didReject2 = Boolean(munchers.leaderBoard.getScores().length === 0);
  
  return Boolean(didReject1 && didReject2);
};

munchersTest.leaderBoardTests.shouldRejectUndefinedScore = function () {
  var didReject1;
  var didReject2;

  munchers.leaderBoard.purgeScores();
  didReject1 = !munchers.leaderBoard.submitScore(undefined, 'player', 'school');
  didReject2 = Boolean(munchers.leaderBoard.getScores().length === 0);
  
  return Boolean(didReject1 && didReject2);
};

munchersTest.leaderBoardTests.shouldRejectStringScore = function () {
  var didReject1;
  var didReject2;

  munchers.leaderBoard.purgeScores();
  didReject1 = !munchers.leaderBoard.submitScore('not a number', 'player', 'school');
  didReject2 = Boolean(munchers.leaderBoard.getScores().length === 0);
  
  return Boolean(didReject1 && didReject2);
};

munchersTest.leaderBoardTests.shouldAcceptValidScore = function () {
  var didAccept1;
  var didAccept2;

  munchers.leaderBoard.purgeScores();
  didAccept1 = munchers.leaderBoard.submitScore(100, 'player', 'school');
  didAccept2 = Boolean(munchers.leaderBoard.getScores().length > 0);
  
  return Boolean(didAccept1 && didAccept2);
};



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
      if( (isNaN(g[i][j]) && (typeof g[i][j] != "object"))) {
        blank = true;
        break;
      }
    }
  }

  return !blank;
}

munchersTest.gridTests.shouldInitializePlayer = function () {
  var g = munchersTest.gridTests.grid.grid();
  return g[2][2].name === "player";
}

munchersTest.gridTests.shouldProduceADivisibleNumber = function () {
  var g = munchersTest.gridTests.grid.grid();
  var num = munchersTest.gridTests.grid.number();
  var divible = false;
    
  for(var i = 0; i < 5; ++i) {
    for(var j = 0; j < 6; ++j) {
      if( g[i][j] % num == 0) {
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
  munchersTest.gridTests.grid.generateMonster();
  
  return t > 0;
}

munchersTest.gridTests.shouldClearTheGrid = function () {
  var g = munchersTest.gridTests.grid.grid();
  var blank = true;
    
  // test to make sure everything is ''
  for(var i = 0; i < 5; ++i) {
    for(var j = 0; j < 6; ++j) {
      if(g[i][j] != '') {
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



// RUN ALL TESTS HERE

window.onload = function () {
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
    'Should accept the submission of a valid score',
    munchersTest.leaderBoardTests.shouldAcceptValidScore()
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
    'Grid.generateMonster() produces a random troggle on the grid',
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
};
