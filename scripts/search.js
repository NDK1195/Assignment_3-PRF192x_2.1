'use strict';
/*** DOM ELEMENTS ***/
const inpSearchEle = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
const navPageNumEle = document.getElementById('nav-page-num');
const newsContainerEle = document.getElementById('news-container');
const btnPrevPage = document.getElementById('btn-prev');
const btnNextPage = document.getElementById('btn-next');
const pageNumEle = document.getElementById('page-num');

/*** GLOBAL VARIABLES ***/

let currentPage = 1;
let totalNewsResult = 0;
let searchKey = '';

/*** FUNCTIONS ***/

// Check current page to hide button function
// Input: total news result, page size
const checkCurrentPage = function (totalResults, pageSize = 10) {
  if (currentPage === 1) {
    btnPrevPage.classList.remove('d-block');
    btnPrevPage.classList.add('d-none');
    btnNextPage.classList.remove('d-none');
    btnNextPage.classList.add('d-block');
  } else if (totalResults / pageSize <= currentPage) {
    btnNextPage.classList.remove('d-block');
    btnNextPage.classList.add('d-none');
    btnPrevPage.classList.remove('d-none');
    btnPrevPage.classList.add('d-block');
  } else {
    btnNextPage.classList.remove('d-none');
    btnPrevPage.classList.remove('d-none');
    btnNextPage.classList.add('d-block');
    btnPrevPage.classList.add('d-block');
  }
};

// Get news data from api function
const getNews = async function (currentPage, searchKey) {
  // Display page number navigation
  navPageNumEle.classList.remove('d-none');
  navPageNumEle.classList.add('d-block');
  // Check current page to display prev, next button
  checkCurrentPage(totalNewsResult);
  try {
    // Fetch news data
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchKey}&page=${currentPage}&searchIn=title&pageSize=10&sortBy=relevancy&language=en&from=2023-07-15&apiKey=264b39aa1b4a4e219510a03165fc49d8`
    );
    const data = await response.json();

    totalNewsResult = data.totalResults;
    // Display news
    renderNews(data);
  } catch (error) {
    console.error(error.message);
  }
};

// Render news function
const renderNews = function (data) {
  // Clear content in container
  newsContainerEle.innerHTML = '';
  // Add new article
  for (const article of data.articles) {
    const newArticle = `
          <div class="card ">
             <div class="card mb-3">
               <div class="row no-gutters">
                 <div class="col-md-4">
                   <img
                     src="${
                       article.urlToImage ? article.urlToImage : '../img/Image_not_available.png'
                     }"
                     class="card-img"
                     alt="article-img"
                     style="max-height:330px"
                   />
                 </div>
                 <div class="col-md-8">
                   <div class="card-body ">
                     <h5 class="card-title">
                       ${article.title}
                     </h5>
                     <p class="card-text">
                       ${article.content}
                     </p>
                     <a
                       href="${article.url}"
                       class="btn btn-primary"
                       >View</a
                     >
                   </div>
                 </div>
               </div>
             </div>
           </div>`;

    newsContainerEle.insertAdjacentHTML('beforeend', newArticle);
  }
};
/*** EVENTS ***/

// Handle search button click event
btnSearch.addEventListener('click', function () {
  // Get data from input
  searchKey = inpSearchEle.value.trim();
  // Check if value is empty
  if (searchKey === '') {
    alert('Please enter key word you want to search');
  } else {
    // Get news base on search key
    getNews(currentPage, searchKey);
    // Empty search bar
    inpSearchEle.innerHTML = '';
  }
});

// Handle prev button click event
btnPrevPage.addEventListener('click', function () {
  currentPage--;
  getNews(currentPage, searchKey);

  pageNumEle.innerText = currentPage;
});

// Handle next button click event
btnNextPage.addEventListener('click', function () {
  currentPage++;
  getNews(currentPage, searchKey);

  pageNumEle.innerText = currentPage;
});
