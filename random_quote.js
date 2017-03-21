

//jquery
$(document).ready(function(){
    
//greensock stuff
var $first = $('#firstLine'), $second = $('#secondLine'), $quote = $('#quoteHere'), $author = $('#authorHere');
$first.html($first.html().replace(/(.)/g, "<span>$1</span>").replace(/\s/g, " "));
$second.html($second.html().replace(/(.)/g, "<span>$1</span>").replace(/\s/g, " "));
$quote.html($quote.html().replace(/(.)/g, "<span>$1</span>").replace(/\s/g, " "));
$author.html($author.html().replace(/(.)/g, "<span>$1</span>").replace(/\s/g, " "));

TweenMax.staggerFromTo($first.find("span"), 1, {autoAlpha:0, color: 'red'}, {autoAlpha:1, color: '#333', delay: 0.5}, 0.07);
TweenMax.staggerFromTo($second.find("span"), 1, {autoAlpha:0, color: 'blue'}, {autoAlpha:1, color: '#333', delay: 0.5}, 0.05);
TweenMax.staggerFromTo($quote.find("span"), 3, {autoAlpha:0, color: 'green'}, {autoAlpha:1, color: '#333', delay: 6}, 0.1);
TweenMax.staggerFromTo($author.find("span"), 3, {autoAlpha:0, color: 'green'}, {autoAlpha:1, color: '#333', delay: 6}, 0.1);
TweenMax.from('.jumbotron', 2, {x:'-=800px', autoAlpha: 0, ease:Back.easeOut, delay: 4.5});
TweenMax.from('#quoteButton', 2.5, {autoAlpha: 0, rotation:'-360', delay: 6});
TweenMax.from('#twitterButton', 2.5, {autoAlpha: 0, rotation:'+360', delay: 6});
    

var quoteTracker = 0, currentInd;
var quotesArr = [
  {quote: "i don't give a shit", author:"honey badger"}, 
  {quote: "just do it", author: "nike"}, 
  {quote: "place your iron hand inside a velvet glove", author: "napoleon"},
  {quote: "any man who tries to be good all the time is bound to come to ruin among the great number who are not good", author: "niccolo machiavelli"},
  {quote: "don't make a girl a promise... if you know you can't keep it", author: "cortana"},     {quote: "not by speeches and votes of the majority are the great questions of the time decided, but by iron and blood", author: "otto von bismarck"},
  {quote: "somewhere, something incredible is waiting to be known", author: "carl sagan"},
  {quote: "awww yisss tickles", author: "(almost) every animal ever"}, 
  {quote: "misdirection. what the eyes see and the ears hear, the mind believes", author: "gabriel shear"},
  {quote: "the only true wisdom is in knowing you know nothing", author: "socrates"},
  {quote: "war is peace. freedom is slavery. ignorance is strength", author: "george orwell"},
  {quote: "all animals are equal, but some animals are more equal than others", author: "george orwell"},
  {quote: "this is your life and its ending one moment at a time", author: "chuck palahniuk"},
  {quote: "it's only after we've lost everything that we're free to do anything", author: "chuck palahniuk"},
  {quote: "the problem with quotes found on the internet is that they are often not true", author: "abraham lincoln"},
  {quote: "know thy self, know thy enemy. a thousand battles, a thousand victories", author: "sun tzu"},
  {quote: "that is not dead which can eternal lie, and with strange aeons even death may die", author: "h.p lovecraft"},
  {quote: "good night, good luck", author: "dying light"},
  {quote: "in the beginning, there was man. and for a time, it was good. but humanity's so-called civil societies soon fell victim to vanity and corruption. then man made the machine in his own likeness. thus did man become the architect of his own demise", author: "zion archive computer"},
  {quote: "software is eating the world, the web is eating software, and javascript rules the web", author: "eric elliott"},
  {quote: "there's no talent here, this is hard work, this is an obsession. talent does not exist, we are all equals as human beings. you could be anyone if you put in the time. you will reach the top, and that's that. i am not talented, i am obsessed", author: "conor mcgregor"},
  {quote: "always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live", author: "john woods"}, 
  {quote: "to the edge of the universe and back, endure and survive", author: "TLOU"},
  {quote: "you are a being unto yourself. you are a law unto yourself. each intelligence is holy. for all that lives is holy", author: "cicada 3301"},
  {quote: "start where you are. use what you have. do what you can", author: "arthur ashe"}];

//generate a sequence of quotes to avoid repetition and follow a random order
//fisher yates shuffle algo
function quoteSequence(){
  //console.log('shuffling');
  currentInd = quotesArr.length;
  var temp, pickMe;
  //while there are elements to shuffle
  while(currentInd !== 0){
    //console.log(currentInd);
    pickMe = Math.floor(Math.random()*currentInd);
    currentInd--;
    
    //swap
    temp = quotesArr[currentInd];
    quotesArr[currentInd] = quotesArr[pickMe];
    quotesArr[pickMe] = temp;
  }
  
}
  
  //shuffle the quotes (initial)
  quoteSequence();
  
  //quote button click
  $('#quoteButton').click(function(){
    
    $('#quoteHere').fadeOut('slow', function(){
      $('#quoteHere').html(quotesArr[quoteTracker].quote).fadeIn('slow');
    });
    $('#authorHere').fadeOut('slow', function(){
      $('#authorHere').html('<strong>' + quotesArr[quoteTracker].author + '</strong>').fadeIn('slow');
    });
    
    quoteTracker++;
    //update tweet button text + reload button
    var insertMe = quotesArr[quoteTracker].quote + " - " + quotesArr[quoteTracker].author;
    $('#twitterButton').html('<a class="twitter-share-button" href="https://twitter.com/share" data-url="https://nugoose.github.io" data-size="large" data-hashtags="freecodecamp"></a>');
    $('.twitter-share-button').attr('data-text', insertMe);
    twttr.widgets.load();
    
    
    //if all quotes have been used, generate new sequence
    if(quoteTracker === 23){
      //console.log('reshuffle');
      quoteSequence();
      quoteTracker = 0;
    }
    
    
  });//quote button click
  
});