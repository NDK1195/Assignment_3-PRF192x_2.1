'use strict';
/*** DOM ELEMENTS ***/
const newsContainerEle = document.getElementById('news-container');
/*** FUNCTIONS ***/

// Get news data from api function
const getNews = async function () {
  try {
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=sports&apiKey=81da8df56501440193866309c5fa2827'
    );
    const data = await response.json();
    console.log(data);

    renderNews(data);
  } catch (error) {
    console.error(error.message);
  }
};
getNews();

// Render news function
const renderNews = function (data) {
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
