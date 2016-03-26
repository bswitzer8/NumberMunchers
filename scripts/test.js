


(function GridUnitTest(){
  /*
  *  This is the unit tests for the munchers.grid
  */

  var grid = munchers.grid;
  grid.generateMultiple();
  grid.fill();

  (function generateMultipleAndNumberTest(){

    grid.generateMultiple();

    var g = grid.number();
    if(isNaN(g))
    {
      console.log("Grid.generateMultiple() failed to generate a number into _number. -- Test Failed");
    }
    else
    {
      console.log("Grid.generateMultiple() assigned a number to _number. -- Test Passed");
    }

    console.log(); // spacing 
  })();


  (function FillandGridTest(){
      
    var g = grid.grid();

    // test for grid being an array.
    if(Array.isArray(g))
    {
      console.log("Grid.grid() returns an array. -- Test Passed");
    }
    else
    {
      console.log("Grid.grid() doesn't return an array. -- Test Failed");
    }
    console.log(); // spacing

    var blank = false;

    // test for any blanks in the grid.
    for(var i = 0; i < 5; ++i)
    {
      for(var j = 0; j < 6; ++j)
      {
        if( (isNaN(g[i][j]) && (typeof g[i][j] != "object")))
        {
          blank = true;
          break;
        }
      }
    }

    if(!blank)
    {
      console.log("Grid.fill() fills the grid with numbers -- Test Passed");
    } 
    else
    {
      console.log("Grid.fill() didn't fill the grid with numbers -- Test Failed");
    }

    // test to make sure the player gets initialized.
    if(g[2][2].name == "player")
    {
      console.log("Grid.fill() initialized the player to [2][2]. -- Test Passed");
    } 
    else
    {
      console.log("Grid.fill() failed to load the player. -- Test Failed");
    }

    // check for any numbers divible by _number
    var divible = false;

    var num = grid.number();
    for(var i = 0; i < 5; ++i)
    {
      for(var j = 0; j < 6; ++j)
      {
        if( g[i][j] % num == 0)
        {
          divible = true;
          break;
        }
      }
    }

    if(divible)
    {
      console.log("Grid.fill() produced at least 1 number that is divible by " + num + " -- Test Passed");
    }
    else
    {
      console.log("Grid.fill() failed to produce any numbers divible by " + num + " -- Test Failed");
    }

    console.log(); // spacing
  })();


  (function generateMonsterTest(){

    var g = grid.grid();
    
    var t = 0; // if t is 1 at the end of this, then createMonster was called.

    // create a spy
    munchers.createMonster = function(){ ++t; return {} };

    grid.generateMonster();



    if( t > 0)
    {
      console.log("Grid.generateMonster() produces a random troggle on the grid. -- Test Passed");
    } 
    else
    {
      console.log("Grid.generateMonster() failed to procude a troggle on the field. -- Test Failed");
    }

    console.log(); // spacing
  })();


  (function resetTest(){
    var g = grid.grid();

    blank = true;
    
    // test to make sure everything is ''
    for(var i = 0; i < 5; ++i)
    {
      for(var j = 0; j < 6; ++j)
      {
        if(g[i][j] != '')
        {
          blank = false;
        }
      }
    }

    if(!blank)
    {
      console.log("Grid.reset() clears the grid, assigning all positions the value of '' -- Test Passed");
    } 
    else
    {
      console.log("Grid.fill() failed to clear the grid -- Test Failed");
    }

    console.log(); // spacing
  })();

  // display the grid.
  grid.debug();
})(); // end of Grid Unit Test