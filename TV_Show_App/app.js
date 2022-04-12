const form = document.querySelector('#searchForm');
const imgs = document.querySelector('.imgs');
form.addEventListener('submit',async e =>
{
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {params: {q:searchTerm}};
    const res = await axios.get(`https://api.tvmaze.com/search/shows`,config);
    const details = res.data;
    console.log(details);
    removeAllChildNodes(imgs);
    showImg(details);
    form.elements.query.value = '';
})
const showImg = (details) =>
{
    if(details.length>0)
    {
        for(let result of details)
        {
            if(result.show.image)
            {

                if(document.querySelector('.noresult'))
                {
                    nores = document.querySelector('.noresult').remove();
                }
                const eachShowDiv = document.createElement('div');
                eachShowDiv.classList.add('eachShowDiv');
                imgs.append(eachShowDiv);

                //appending the image...
                const showPoster = document.createElement('IMG');
                showPoster.classList.add('poster');
                showPoster.src = result.show.image.medium;
                eachShowDiv.append(showPoster);

                //making a div of details for the following show
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('detailsDiv');
                eachShowDiv.append(detailsDiv);

                //appending show title
                const showTitle = document.createElement('p');
                showTitle.classList.add('titleName');
                showTitle.innerHTML = `<span>Name</span><br>${result.show.name}`
                detailsDiv.append(showTitle);

                //appending rating
                if(result.show.rating.average)
                {
                    const showRating = document.createElement('p');
                    showRating.classList.add('language');
                    showRating.innerHTML=`<span>Genres</span><br>${result.show.rating.average}`
                    detailsDiv.append(showRating);
                }

                //appending langauge 
                if(result.show.language)
                {
                    const showLang = document.createElement('p');
                    showLang.classList.add('language');
                    showLang.innerHTML=`<span>Language</span><br>${result.show.language}`
                    detailsDiv.append(showLang);
                }

                //appending link
                if(result.show.url)
                {
                    const showLink = document.createElement('p');
                    showLink.classList.add('language');
                    showLink.innerHTML=`<a href=${result.show.url} target='_blank'>Official Site</a><br>`
                    detailsDiv.append(showLink);
                }
            }

        }
    }
    else
    {
        if(!document.querySelector('.noresult'))
        {
            const noResult = document.createElement('h1');
            noResult.classList.add('noresult');
            noResult.textContent = 'No Result :('
            document.body.append(noResult);
        }
    }
}
const removeAllChildNodes = (parent) =>
{
    while(parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}