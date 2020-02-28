
var root = document.getElementById('root');
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
}

function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'https://ghibliapi.herokuapp.com/films';
  
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
  
    // Response handlers.
    xhr.onload = function() {
        var data = JSON.parse(this.response);
        if (xhr.status >= 200 && xhr.status < 400) {
            data.forEach(element => {
              console.log(element.title)
            })
          } else {
            console.log('error')
        }

        // var text = xhr.responseText;
        // var title = getTitle(text);
        // alert('Response from CORS request to ' + url + ': ' + title);
    };
  
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };
  
    xhr.send();

    console.log(xhr);
}