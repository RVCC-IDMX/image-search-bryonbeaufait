const form = document.querySelector('.search-form');
const template = document.querySelector('#template');
const container = document.querySelector('.container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // console.table(response);
  let i = 0;

  response.results.forEach((post) => {
    i++;
    if (i < 11) {
      // console.log(post);
      const clone = template.content.cloneNode(true);
      const user = clone.querySelector('.post__user');
      user.innerText = post.user.name;
      const desc = clone.querySelector('.post__desc');
      desc.innerText = post.description;
      const img = clone.querySelector('.post__img');
      img.src = post.urls.small;

      container.appendChild(clone);
      // post.urls.small image
      // const body = post.desc;
    }
  });

  /*
  some sample code
    const dataObj = response.results[0];
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;
  */

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
