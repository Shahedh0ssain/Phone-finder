
/* global variable */
const showDetile = document.getElementById('show-detile');
const searchResult = document.getElementById('search-result');
const showBtn = document.getElementById('show-btn');

/* end */
/* spinner function */
const toggleShow = displayStyle => {
	document.getElementById('spinner').style.display = displayStyle;
}
/* end */
//searchPhone start
const searchPhone = () => {

	const searchFiled = document.getElementById('search-filed');
	const searchText = searchFiled.value;
	//toggle spinner
	toggleShow('block');
	searchFiled.value = '';
	//showDetile clear
	showDetile.textContent = '';

	if (searchText == '') {
		toggleShow('none');
		showBtn.textContent = '';
		searchResult.textContent = '';
		const errorMassage = document.getElementById('errorMassage2');
		errorMassage.textContent = '';

		errorMassage.innerHTML = `<p class='text-center'>Please Write something</p>`;

	} else {
		errorMassage.textContent = '';

		const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
		//console.log(url);
		fetch(url)
			.then(res => res.json())
			.then(data => displaySearchResult(data.data.slice(0, 3)))
	}//else
};//searchPhone End


const displaySearchResult = datas => {
	//const dataS = datas.slice(0,5);

	//remove all search result :
	searchResult.textContent = '';
	errorMassage.textContent = '';
	//showDetile.textContent='';
	if (datas.length == 0) {
		//console.log('no result found');
		showBtn.textContent = '';
		toggleShow('none');
		errorMassage2.textContent = '';

		const errorMassage = document.getElementById('errorMassage');

		errorMassage2.innerHTML = `<p class='text-center'>Result not found</p>`;

	} else {

		errorMassage2.textContent = '';

		datas.forEach(data => {

			const div = document.createElement('div');
			div.classList.add('col');
			div.innerHTML = `   <div class="card my-3 bg-white rounded shadow-sm"> <img src="${data.image}" class="card-img-top img-fluid p-3 " alt="..."> <div class="card-body"> <h5 class="card-title">${data.phone_name}</h5> <p class="card-text"> ${data.brand}</p>
	                              </div> <div class="card-footer">
								  <button onclick="lodeDetiles('${data.slug}')" class="text-muted btn btn-primary  text-light">detiles</button>
								</div>`;


			searchResult.appendChild(div);

		});
		toggleShow('none');

		showBtn.innerHTML = `
  <button  onclick="" class="btn btn-primary d-flex  m-5">Show More</button>`;


	};
	//else
};
/* end function */

const lodeDetiles = id => {

	const urls = `https://openapi.programming-hero.com/api/phone/${id}`;
	fetch(urls)
		.then(res => res.json())
		.then(data => displayDetiles(data.data))
}

const displayDetiles = detile => {

	//Cleat showDetile data
	showDetile.textContent = '';
	//	errorMassage2.textContent ='';

	//end
	const div = document.createElement('div');
	div.classList.add('card');
	div.innerHTML = `
 		<img src="${detile.image}" class=" img-fluid p-3 card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title"> Model : ${detile?.name}</h5> <p class="card-text">Release date : ${detile.releaseDate ? detile.releaseDate : "Result not found"}</p><p class="card-text">storage : ${detile?.mainFeatures?.memory}</p> 
 		<p class="card-text">displaySize: ${detile?.mainFeatures?.displaySize}</p> 
 		<p class="card-text">Sensor: ${detile?.mainFeatures?.sensors}</p> 
 		<p class="card-text">Other: ${detile?.others?.WLAN}</p></div>
 		
 		`;
	//	 show detile append
	showDetile.appendChild(div);
};
