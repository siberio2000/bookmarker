// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save bookmark
function saveBookmark(e) {
   // Get form values
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;

   if (!validateForm(siteName, siteUrl)) {
     return false;
   }
  

   // Create an object to submit data to Localstorage
   var bookmark = {
       name: siteName,
       url: siteUrl
   }

  if(localStorage.getItem('bookmarks') === null) {
    // Init Array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // as long as localstorage accepts strings only, we need to modify JSON to string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
      // Get saved bookmarks from localStorage, we need to return value to JSON format with parse
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // Add bookmark to Array
      bookmarks.push(bookmark);
      // Re-set back to LocalStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }


  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();


    // Prevent form from submitting
    e.preventDefault();

}


// Delete bookMark function
// To delete first fetch bookmarks from LocalStorage, then loop throught them, and check if current one we looping through matches the url, and if it does we gonna splice these out, and we gonna re-set LocalStorage
function deleteBookmark(url) {
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // Loop through bookmarks
   for (var i = 0; i < bookmarks.length; i++) {
       // if current iteration i is equal to url that's passed up in parameter (url) that we now we want it to delete
      if(bookmarks[i].url == url) {
         // Remove from array. We want to splice it from current iteration i, and splice out one from that
         bookmarks.splice(i, 1);
      }
   }
   // Re-set LocalStorage under the loop 
   // Re-set back to LocalStorage after we delete it
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   // Re-fetch bookmarks
   fetchBookmarks();
}

 // Get bookmarks
 function fetchBookmarks() {
    // Get saved bookmarks from localStorage, we need to return value to JSON format with parse
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   // Get output ID
   var bookmarksResults = document.getElementById('bookmarksResults');

   // Build output
   bookmarksResults.innerHTML = "";

   // loop throught bookmarks that on the LocalStorage, and then output them one by one inside div
   for(var i = 0; i < bookmarks.length; i++) {
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      // Apply output to main.html file
      bookmarksResults.innerHTML += '<div class="well well-sm">'+
                                    '<h3>' + name +
                                    '<a class="btn btn-default" target="_blank" href="https:\//\\'+ url +'">Visit</a>' + 
                                    '<a onclick="deleteBookmark(\''+ url +'\')" class="btn btn-danger" href="#">Delete</a>' + 
                                    '</h3>' + 
                                    '</div>';
   }

}


function validateForm(siteName, siteUrl) {
    // Validation - to avoid empty string
    if(!siteName || !siteUrl) {
        alert('Please insert data')
    return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
    alert('Please use valid url with http');
    return false;
    }

    return true;
}