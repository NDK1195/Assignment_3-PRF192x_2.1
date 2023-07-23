'use strict';
/*** DOM ELEMENTS ***/
const newsContainerEle = document.getElementById('news-container');
const btnPrevPage = document.getElementById('btn-prev');
const btnNextPage = document.getElementById('btn-next');
const pageNumEle = document.getElementById('page-num');

/*** GLOBAL VARIABLES ***/

let currentPage = 1;
let totalNewsResult = 0;

/*** FUNCTIONS ***/

// Check current page to hide button function
// Input: total news result, page size
const checkCurrentPage = function (totalResults, pageSize = 10) {
  if (currentPage === 1) {
    btnPrevPage.classList.remove('d-block');
    btnPrevPage.classList.add('d-none');
  } else if (totalResults / pageSize <= currentPage) {
    btnNextPage.classList.remove('d-block');
    btnNextPage.classList.add('d-none');
  } else {
    btnNextPage.classList.add('d-block');
    btnPrevPage.classList.add('d-block');
  }
};

// Get news data from api function
const getNews = async function (page) {
  // Check current page to display prev, next button
  checkCurrentPage(totalNewsResult);
  try {
    // Fetch news data
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=10&page=${page}&apiKey=81da8df56501440193866309c5fa2827`
    );
    const data = await response.json();
    console.log(data);
    totalNewsResult = data.totalResults;
    // Display news
    renderNews(data);
  } catch (error) {
    console.error(error.message);
  }
};
getNews(currentPage);

// Render news function
const renderNews = function (data) {
  // Clear content in container
  newsContainerEle.innerHTML = '';
  // Add new article
  for (const article of data.articles) {
    const newArticle = `
         <div class="card flex-row flex-wrap">
            <div class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img
                    src="${
                      article.urlToImage ? article.urlToImage : '../img/Image_not_available.png'
                    }"
                    class="card-img"
                    alt="article-img"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
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
// Handle prev button click event
btnPrevPage.addEventListener('click', function () {
  currentPage--;
  getNews(currentPage);

  pageNumEle.innerText = currentPage;
});

// Handle next button click event
btnNextPage.addEventListener('click', function () {
  currentPage++;
  getNews(currentPage);

  pageNumEle.innerText = currentPage;
});
