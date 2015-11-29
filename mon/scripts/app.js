//Building a hypothetical template to use later:
var MainView = Backbone.View.extend({
  tagName: 'section', //we want our container element to be a section
  className: 'button', //giving our container element a class called button
  template: _.template($('#mainTemplate').html()), //make template from html

  initialize: function(){
    //anything we want to run every time the main page refreshes.
  },

  render: function(){  //we will call this function later, manually
    // This will modify the automatically generated element's html.
    // We will use the template that we defined above, and pass data into the template function call
    // so that we can have access to that data inside of the function template.
    this.$el.html(this.template({ button: this.button }));
  }
  // So, now, this.$el has our new HTML section. But, it has not been added to the screen yet.
  // We add it to the screen later (By referencing the element's $el property).
  // See the game method on our AppRouter for an example.

}); //END of buttonView (template) function




//////////// ROUTER //////////////

// Create a function that we want to access later.
var AppRouter = Backbone.Router.extend({
  // Define the urls that we want to make accessible by the user:
  // the key is the url, the value is the function that we want to invoke
  // when the url is accessed.
  routes: {
    "": "loading",
    "main": "main", //need to create a function called main
    "play": "game", //need to create a function called game
    "leaderboard": "leaderboard", //need to a function called leaderboard
    "settings": "settings" //need to create function called settings
  },

  loading: function() {
    var router = this;
    $('.buttons').html('<h2>Loading...</h2>');
    setTimeout(function(){
      router.navigate('main', {trigger: true});
    }, 4000);
  },

// Create a function that runs when we access the index.html page, or '#'
  main: function() {
    //when the main page loads, append three buttons onto the screen

      // Reset the buttons container to have empty html
      $('.buttons').html('');
      // Everytime we run the main function, we want to append three new buttons to the buttons container (play,leaderboard, and settings)
      var createButtons = function(){
        $('.buttons').append('<a href="#play" class="play">Play</a>');
        $('.buttons').append('<a href="#leaderboard" class="leaderboard">Leaderboard</a>');
        $('.buttons').append('<a href="#settings" class="settings">Settings</a>');
      }
      createButtons();
  },

  //create functions for each button (that will be invoked when clicked):
  game: function(){  //game function, to fire when we click 'play' btn
  console.log('the game button was clicked');
    // Reset the buttons container to have empty html
    $('.buttons').html('');
    //append an img to the buttons container after it's cleared
    var displayGame = function(){
      $('.buttons').append('<h1>GAME ON!</h1><a class="player">1 Player</a><a class="player">2 Players</a><a class="player">3 Players</a><a class="home" href="#main">Home</a>')
    }
    displayGame();
  },

  leaderboard: function(){ //Leaderboard function, to fire when we click 'leaderboard' btn

  // Reset the buttons container to have empty html
    $('.buttons').html('');
    $('.buttons').append('<h2>Super Players</h2>');
    $('.buttons').append(
    '<ul><li>Peter - 1458</li><li>Jeffrey - 1296</li><li>Mary Ellen - 846</li></ul>');
    $('.buttons').append('<a class="home" href="#main">Home</a>');
  },

  settings: function(){
    //settings function, to fire when we click 'settings' btn

    // Reset the buttons container to have empty html
      $('.buttons').html('');
      $('.buttons').append('<h2>Settings</h2>');
      $('.buttons').append('<p>Mode: Normal</p>');
      $('.buttons').append('<p>Music: On</p>');
      $('.buttons').append('<p>Level: 5</p>');
      $('.buttons').append('<a class="home" href="#main">Home</a>');
  }
}); // END of AppRouter

// create a new instance of our App router, to handle routes later
var router = new AppRouter();

// Listen for url changes, so that we can intercept them,
// and act upon the urls that the user navigates to.
Backbone.history.start();
