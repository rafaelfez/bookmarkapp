//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){

  //get form values
  var siteName= document.getElementById('siteName').value;
  var siteUrl= document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

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

  //clear form
  document.getElementById('myForm').reset();

  //re-fetch bookmarks
  fetchBookmarks();

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
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
  }
}

function deleteBookmark(url){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throught bookmarks
  for(var i=0; i<bookmarks.length;i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i=1);
    }
  }

  //re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-fetch bookmarks
  fetchBookmarks();
}

function validateForm(siteName, siteUrl){

  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
