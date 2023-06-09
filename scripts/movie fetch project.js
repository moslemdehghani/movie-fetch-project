let movieSearchBox = document.getElementById("movie-search-box")
let searchList = document.getElementById("search-list")
let resultGrid = document.getElementById("result-grid")

async function loadMovies(searchTerm){
	const url = `http://omdbapi.com/?s=${searchTerm}&apikey=fe952248`
	const res = await fetch(`${url}`);
	const data = await res.json();
	//console.log(data.Search)
	if(data.Response == "True") displayMovieList(data.Search)//console.log(data) 
	}
//loadMovies('dark knight')
function findmovies(){
	let searchTerms = (movieSearchBox.value).trim();
	if(searchTerms.length > 0){
		searchList.classList.remove('hide-search-list')
		loadMovies(searchTerms)
	}else{
		searchList.classList.add('hide-search-list')
	}
}

function displayMovieList(movies){
	searchList.innerHTML = "";
	for(let idx = 0 ; idx < movies.length ; idx++){
		let movieListItem = document.createElement("div");
		//console.log(movieListItem)
		movieListItem.dataset.id = movies[idx].imdbID;
		movieListItem.classList.add('search-list-item');
		if(movies[idx].Poster !=  'N/A'){
			moviePoster = movies[idx].Poster;
		}
		else{
			moviePoster = 'image_not_found.png'
		}
			
		
		movieListItem.innerHTML = `<div class="search-list-item"><div class="search-item-thambnail"><img src="${moviePoster}" alt="img"></div><div class="search-item-info"><h3>${movies[idx].Title}</h3><p>${movies[idx].Year}</p></div></div>`;
		searchList.appendChild(movieListItem)
	}
	loadMovieDetail();
}

function loadMovieDetail(){
	const searchListMovie = searchList.querySelectorAll('.search-list-item');
	searchListMovie.forEach(movie =>  {
		movie.addEventListener("click" , async () => {
			//console.log(movie.dataset.id)
			
			searchList.classList.add('hide-search-list')
			movieSearchBox.value="";
			const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fe952248`)
			const movieDetails = await result.json();
			//console.log(movieDetails)
			displayMovieDetail(movieDetails)
		
		})
		
	})
}
function displayMovieDetail(details){
	resultGrid.innerHTML = `
				<div class="movie-poster">
				 <img src=" ${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie-poster">
				</div>
				<div class="movie-info">
				<h1 class="movie-title">${details.Title}</h1>
					<ul class="movie-misc-info">
						<li class="year">${details.Year}</li>
						<li class="rated">${details.Rated}</li>
						<li class="released">${details.Released}</li>
					</ul>
					<p class="genre"><b>genre:</b>${details.Genre}</p>
					
					<p class="writer"><b>writer:</b>${details.Writer}</p>
					
					<p class="actors"><b>actors:</b>${details.Actors}</p>
					
					<p class="plot"><b>plot:</b>${details.Plot}</p>
					
					<p class="language"><b>language:</b>${details.Language}</p>
					<p class="awards"><b><i class="fas-fa-award"></i></b>${details.Awards}</p>
				</div>
			`
}
	
	
	
	
	
	
	
	
	
	
	
