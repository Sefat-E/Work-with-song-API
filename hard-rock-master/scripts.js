
const searchButton = document.getElementById('searchButton');
const searchList = document.getElementById('search-list');

searchButton.addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
     document.getElementById('searchInput').value ="";
    // if (searchInput) {
     fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
      .then(res => res.json())
      .then(data => {
            
          let firstTen = data.data.slice(0,10);
          searchList.innerHTML = ' ';
        for (let i = 0; i < firstTen.length; i++) {
            let titleShort = data.data[i];
            let artist =  data.data[i].artist.name;
              
            let image =  data.data[i].album.cover;
            const result = document.createElement('div');

            searchList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-8">
                        <h3 class="lyrics-name">${titleShort.title}</h3>
                        <p class="author lead">Album by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-1">
                   <img src="${image}" >
                        
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="getLyrics('${titleShort.artist.name}','${titleShort.title}')" >Get Lyrics</button>
                    </div>
                </div>`;
                
            
                searchList.appendChild(result);
                

            }
        })
          
       
        })  

        
   
       
    const singleLyrics = document.getElementById('SongLyrics');
    
    function getLyrics(artist,title){
       fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
         .then(res => res.json())
         .then (data =>{
             
            singleLyrics.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
            <pre class="text-white">${data.lyrics}</pre><button class=" btn btn-success text-white"onclick="goBack()">Back</button>`;
              
                                                              
            searchList.style.display = "none";
         })
    
    } 
    function goBack() {
        searchList.style.display = "block";
        singleLyrics.innerHTML = "";
    }
