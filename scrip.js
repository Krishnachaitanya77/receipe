const searchbox=document.querySelector('.searchbox');
const searchbtn=document.querySelector('.searchbtn');
const receipecont=document.querySelector('.receipe-cont');
const receipedetailscontent=document.querySelector('.receipe-details-content');
const receipeclosebtn=document.querySelector('.receipe-close-btn');


const fetchReceipees = async (query) => {
    receipecont.innerHTML="<h2>Fetching Receipees.....</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        receipecont.innerHTML="";
        response.meals.forEach(meal => {
            const receipediv = document.createElement('div');
            receipediv.classList.add('recipe');
            receipediv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>
                <span>${meal.strArea}
                </span>
                Dish
                </p>
                <p>Belongs to <span>${meal.strCategory}
                </span>Category</p>
            `;
            const button=document.createElement('button');
            button.textContent="View Receipe";
            receipediv.appendChild(button);
            button.addEventListener('click',()=>{
                openrecepiepopup(meal);
            });
            receipecont.appendChild(receipediv);
        });
    } catch (error) {
        //console.error("Error fetching the recipes:", error);
        receipecont.innerHTML="<h2>Error fetching the recipes.....</h2>";
    }
};

const fetchingediants=(meal)=>{
    let ingrediantslist="";
    for(let i=1;i<=20;++i){
        const ingediant=meal[`strIngredient${i}`];
        if(ingediant){
            const measure=meal[`strMeasure${i}`];
            ingrediantslist+=`<li>${measure}${ingediant}</li>`
        }else{
            break;
        }
    }
    return ingrediantslist;
    
}
const openrecepiepopup=(meal)=>{
    receipedetailscontent.innerHTML=`
        <h2 class="recipiname">${meal.strMeal}</h2>
        <h3>Ingrediants</h3>
        <ul class="ingediantlist">${fetchingediants(meal)}</ul>
        <div class="instruct">
            <h3>Instructions:</h3>
            <p class="receipiinstruction">${meal.strInstructions}</p>
        </div>
    `
    
    receipedetailscontent.parentElement.style.display="block";
}
receipeclosebtn.addEventListener('click',()=>{
    receipedetailscontent.parentElement.style.display="none";
})

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchbox.value.trim();
    if(!searchinput){
        receipecont.innerHTML="<h2>Type the meal in the searchBox.....</h2>";
        return;
    }
    fetchReceipees(searchinput);
})