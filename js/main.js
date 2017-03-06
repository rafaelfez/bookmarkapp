//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){

  //get form values
  var siteName= document.getElementById('siteName').value;
  var siteUrl= document.getElementById('siteUrl').value;


  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  //Local storage test
  /*localStorage.setItem('test', 'Hello Word');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
*/

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else{
    //get bokmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }


  //Prevent form from submitting
  e.preventDefault();
}

function fetchBookmarks(){
  //get bokmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'
                                  '</h3>'+
                                  '</div>';
  }
}
