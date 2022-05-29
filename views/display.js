const element = document.getElementById("myBtn");
let u='';

//console.log(u);


element.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const URL = tabs[0].url;
    u = URL;
    console.log(u);
    
    
    
  

    fetch('http://127.0.0.1:9999/get', {
  
	
      // Adding method type
      method: "POST",
      body: JSON.stringify({
        URL: u
    
      }),
  
      
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      // Converting to JSON
      .then(response => response.json())

      // Displaying results to console
      .then(json => {
        if (json) {
          
        
          
          //console.log("form", json.data.j.loadingExperience.metrics);
          document.getElementById("title").innerHTML = json.data.title;
          document.getElementById("d").innerHTML = json.data.d;
          document.getElementById("url").innerHTML = json.data.url;
          document.getElementById("canon").innerHTML = json.data.canonical;
          document.getElementById("robot").innerHTML = json.data.robots;
          document.getElementById("h1").innerHTML = json.data.c1;
          document.getElementById("h2").innerHTML = json.data.c2;
          document.getElementById("h3").innerHTML = json.data.c3;
          document.getElementById("links").innerHTML = json.data.c + 2;
          //console.log("form", json.data.j.loadingExperience.metrics);
          document.getElementById("f").innerHTML = json.data.j.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile;
          document.getElementById("i").innerHTML = json.data.j.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile;
          document.getElementById("e").innerHTML = json.data.j.audits.estimated-input-latency.displayValue;
        }
        

      });
    
      
      
      
  });
  
  //document.getElementById("demo").innerHTML = "Hello World";
});