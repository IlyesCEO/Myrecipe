//ARROW
let arrowfavorite = document.querySelector(".arrowfavorite");
let favorites = document.querySelector(".favorites");
let favimg = document.querySelector(".favimg");
//header part
let searchEl = document.querySelector(".searchEl");
let inputEl = document.querySelector(".in-area");
let crossEl = document.querySelector(".cross");

//DAILY PART
let categoryEl = document.querySelector(".categories");
let dailyImage = document.querySelector(".image");
let youtube = document.querySelector(".youtube-link");
let recipeEl = document.querySelector(".recipe");
let ingredients = document.querySelector(".ingredients-button");

let theborder = document.querySelector(".border");

//CATEGORY PART
let ingredientsEL = document.querySelector(".ingredients-El");

let ingredientsDropDown = document.querySelector(".ingredients");
let recipeDiscription = document.querySelector(".discription");

//FAVORITES
let favfood = document.querySelector(".favfood");

arrowfavorite.addEventListener("click", () => {
  if (favorites.style.transform == "translateX(100%)") {
    favimg.src = "/cross.png";
    favorites.style.transform = "translateX(0%)";
    arrowfavorite.style.transform = "translateX(-29.5vw)";
  } else {
    favimg.src = "/chevron.png";
    arrowfavorite.style.transform = "translateX(0vw)";
    favorites.style.transform = "translateX(100%)";
  }
});

//DAILY GENERATING FOOD FUNCTION
async function dailyphp() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();

  dailyImage.style.background = `url(${data.meals[0].strMealThumb})`;
  let newP = document.createElement("p");
  newP.innerHTML = `Today's Recipe`;
  dailyImage.appendChild(newP);

  dailyImage.style.backgroundSize = "cover";
  dailyImage.style.backgroundPosition = "center center";

  recipeDiscription.textContent = data.meals[0].strInstructions;
  youtube.href = data.meals[0].strYoutube;

  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0][`strIngredient${i}`] != "" &&
      data.meals[0][`strIngredient${i}`] != "null"
    ) {
      let liEl = document.createElement("LI");
      let imgEl = document.createElement("img");
      let AEl = document.createElement("A");

      imgEl.src = "/search.png";

      AEl.appendChild(imgEl);
      AEl.href = `https://www.google.com/search?q=${
        data.meals[0][`strIngredient${i}`]
      }`;

      AEl.target = "_blank";

      liEl.textContent = `${data.meals[0][`strIngredient${i}`]}   ${
        data.meals[0][`strMeasure${i}`]
      }`;

      ingredientsEL.appendChild(liEl);

      liEl.appendChild(AEl);
    }
  }
}
dailyphp();

//SEARCH BAR DISPLAY
searchEl.addEventListener("click", () => {
  setTimeout(() => {
    searchEl.style.display = "none";
  }, 30);

  inputEl.style.right = "2%";
});
crossEl.addEventListener("click", () => {
  inputEl.style.right = "-70%";
  searchEl.style.display = "block";
});

//MAIN FUNCTION : GENERATIN FOOD BY CATEGORY AND DISPLAYING RECIPE INGREDIENTS AND YOUTUBE LINK FOR EVERY FOOD

async function fetchingCategory(foodCategory) {
  //fetching different food types by category
  const respond = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`
  );
  const DaData = await respond.json();
  theborder.style.display = "block";
  theborder.innerHTML = foodCategory;

  let mealsCategory = document.querySelector(".by-category"); //THE CLASS THAT CONTAINS ALL THE FOODS IN ONE TYPE

  mealsCategory.innerHTML = "";

  let Darecipe = document.querySelectorAll(".Darecipe");

  //RENDERING THE RECIPE AND THE INGREDIENTS FOR EACH FOOD IN THE CATEGORY GENERATED
  console.log(DaData.meals);
  for (let i = 0; i < DaData.meals.length; i++) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${DaData.meals[i].strMeal}`
    );
    const data = await resp.json(); //fetching the food

    //RENDERING THE IMAGE RECIPE INGREDIENTS FOR EACH FOOD

    //rednering(,DaData.meals[i].strMeal,data.meals[0].strYoutube,data.meals[0].strInstructions)
    mealsCategory.innerHTML += `<h2 class="category-name">${DaData.meals[i].strMeal} :</h2>

    <section id="Da" class="Darecipe">

    <div>
      <div class="image-part">
        <img src="/heart.png" class="hearty">
        <div class="foodyimage"></div>
      </div>
      <div class="icons">
        <ul>
          <li class="recipe catrecipe">
            <img src="/cook-book.png" alt="" height="40px" />

            <p>recipe</p>
          </li>
          <li class="ingredients-button ingre">
            <img src="/ingredients.png" alt="" height="40px" />

            <p>ingredients</p>
          </li>
          <li>
            <a class="youtube youtube-link" href="${data.meals[0].strYoutube}" target="_blank"
              ><img src="/youtube.png" alt="" height="40px" />
              <p>
                video <br/>
                Tutorial
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div>

  <div class="Cat-discription">
  <h1 class="clicked-feature">${data.meals[0].strMeal}'s Recipe :</h1>
  <p>
  ${data.meals[0].strInstructions}
  </p>
</div>
<div class="justcute cutty"></div>`;

    //  LAST IS YOUTUBE LINK ---> SEARCH BAR ---->ADD COOL STUFF ANNIMATION WRAP THE FOOD IN A FLEX OR GRID DISPLAY
    let newmealCating = document.createElement("ul"); //UL ELEMENT
    newmealCating.className = "ingredients-El";
    let dacutty = document.querySelectorAll(".cutty");

    for (let n = 1; n <= 20; n++) {
      if (
        data.meals[0][`strIngredient${n}`] != "" &&
        data.meals[0][`strIngredient${n}`] != "null"
      ) {
        let AEl = document.createElement("A");

        let mewmealCatingLI = document.createElement("li"); //LI ELEMENT
        mewmealCatingLI.innerHTML = `${data.meals[0][`strIngredient${n}`]}  ${
          data.meals[0][`strMeasure${n}`]
        }`;
        let imgEl = document.createElement("img");
        imgEl.src = "/search.png";
        AEl.appendChild(imgEl);
        AEl.href = `https://www.google.com/search?q=${
          data.meals[0][`strIngredient${n}`]
        }`;
        AEl.target = "_blank";

        mewmealCatingLI.appendChild(AEl);

        newmealCating.appendChild(mewmealCatingLI);
      }
    }

    dacutty[i].appendChild(newmealCating);
    dacutty[i].style.display = "none";
    /**/

    mealsCategory.innerHTML += `
  </div>
  </section>`;
  }

  //PROBLEM WITH CLOSE BRACKETS MIGHT HAVE MISSED SOME EVERYTHING WAAS WORKING ALL FINE
  let ingredients_button = document.querySelectorAll(".ingre");

  let cuttyAll = document.querySelectorAll(".cutty");

  let bycatDiscription = document.querySelectorAll(".Cat-discription"); //RECIPE TEXT
  let categoriesrecipes = document.querySelectorAll(".catrecipe"); //RECIPE BUTTON

  let youtubelink = document.querySelectorAll(".yoyo");

  let imagesfood = document.querySelectorAll(".foodyimage"); //gathering all the classes for food images

  let DaHeart = document.querySelectorAll(".hearty"); //WE ARE HERE
  function fav() {
    for (let i = 0; i < DaHeart.length; i++) {
      DaHeart[i].addEventListener("click", () => {
        let favmeal = document.createElement("p");

        let newdiv = document.createElement("div");
        newdiv.appendChild(favmeal);

        console.log(DaData.meals[i].strMeal);
        favmeal.innerHTML = DaData.meals[i].strMeal;
        favfood.appendChild(favmeal);

        DaHeart[i].src = "/heartRed.png";
      });
    }
  }
  fav();
  for (let j = 0; j < imagesfood.length; j++) {
    //RENDERING FOOD IMAGE
    imagesfood[j].style.background = `url(${DaData.meals[j].strMealThumb})`;
    imagesfood[j].style.backgroundSize = "cover";
    imagesfood[j].style.backgroundPosition = "center center";

    ingredients_button[j].addEventListener("click", () => {
      console.log("Rest1");
      console.log(cuttyAll[j]);
      bycatDiscription[j].style.display = "none";
      if (cuttyAll[j].style.display == "none") {
        cuttyAll[j].style.display = "block";
      } else {
        cuttyAll[j].style.display = "none";
      }
    }); //EVENT LISTENER RECIPE

    categoriesrecipes[j].addEventListener("click", () => {
      console.log("Rest2");
      cuttyAll[j].style.display = "none";

      if (bycatDiscription[j].style.display == "none") {
        bycatDiscription[j].style.display = "block";
      } else {
        bycatDiscription[j].style.display = "none";
      }
    }); //EVENT LISTENER RECIPE
  } //FOR LOOP
} //END OF FETCHCATEGORY FUNCTION

//RENDERING

//FIRST PAGE UI

async function loading() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await resp.json(); //FETCHING ALL CATEGORIES ON THE SLIDE

  for (let i = 0; i < data.categories.length; i++) {
    categoryEl.innerHTML += `<div class="singleEl">
        <div class="single" background=""></div>
        <div class="category catname">
          ${data.categories[i].strCategory}
        </div>
      </div>`;
  } //RENDERING CATEGORIES

  let singly = document.querySelectorAll(".single");

  for (let i = 0; i < singly.length; i++) {
    singly[i].style.background = `url(${data.categories[i].strCategoryThumb})`;
    singly[i].style.backgroundRepeat = "no-repeat";
    singly[i].style.backgroundSize = "cover";
    singly[i].style.backgroundPosition = "center center";
  }
  /* */
  let singleEl = document.querySelectorAll(".singleEl");
  // let categoryname = document.querySelectorAll(".catname");
  singleEl.forEach((element) => {
    element.addEventListener("click", () => {
      fetchingCategory(element.children[1].innerHTML.trim());
      console.log(element.getElementsByTagName("div")[1].innerHTML.trim());
    });
  });
}

loading();

recipeEl.addEventListener("click", () => {
  if (recipeDiscription.style.display == "block") {
    recipeDiscription.style.display = " none";
    console.log("inside 1");
    ingredientsDropDown.style.display = "none";
  } else {
    recipeDiscription.style.display = " block";
    console.log("inside 2");
    ingredientsDropDown.style.display = "none";
  }
});

ingredients.addEventListener("click", () => {
  if (ingredientsDropDown.style.display == "block") {
    ingredientsDropDown.style.display = "none";
    console.log("inside -1");
    recipeDiscription.style.display = " none";
  } else {
    console.log("inside -2");
    ingredientsDropDown.style.display = "block";
    recipeDiscription.style.display = " none";
  }
});
let mealsCategory = document.querySelector(".by-category");
let input_El = document.querySelector(".input");
input_El.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    const respond = await fetch(`
      https://www.themealdb.com/api/json/v1/1/search.php?s=${input_El.value}`);
    const data = await respond.json();
    mealsCategory.innerHTML = "";
    theborder.style.display = "block";
    theborder.innerHTML = input_El.value;
    for (let i = 0; i < data.meals.length; i++) {
      //RENDERING THE IMAGE RECIPE INGREDIENTS FOR EACH FOOD

      //rednering(,DaData.meals[i].strMeal,data.meals[0].strYoutube,data.meals[0].strInstructions)
      mealsCategory.innerHTML += `<h2 class="category-name">${data.meals[i].strMeal} :</h2>
    
        <section id="Da" class="Darecipe">
    
        <div>
          <div class="image-part">
            <p>Today's Recipe</p>
            <div class="foodyimage"></div>
          </div>
          <div class="icons">
            <ul>
              <li class="recipe catrecipe">
                <img src="/cook-book.png" alt="" height="40px" />
    
                <p>recipe</p>
              </li>
              <li class="ingredients-button ingre">
                <img src="/ingredients.png" alt="" height="40px" />
    
                <p>ingredients</p>
              </li>
              <li>
                <a class="youtube youtube-link" href="${data.meals[i].strYoutube}" target="_blank"
                  ><img src="/youtube.png" alt="" height="40px" />
                  <p>
                    video <br/>
                    Tutorial
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
    
      <div class="Cat-discription">
      <h1 class="clicked-feature">${data.meals[i].strMeal}'s Recipe :</h1>
      <p>
      ${data.meals[i].strInstructions}
      </p>
    </div>
    <div class="justcute cutty"></div>`;

      //  LAST IS YOUTUBE LINK ---> SEARCH BAR ---->ADD COOL STUFF ANNIMATION WRAP THE FOOD IN A FLEX OR GRID DISPLAY
      let newmealCating = document.createElement("ul"); //UL ELEMENT
      newmealCating.className = "ingredients-El";
      let dacutty = document.querySelectorAll(".cutty");

      for (let n = 1; n <= 20; n++) {
        if (
          data.meals[i][`strIngredient${n}`] != "" &&
          data.meals[i][`strIngredient${n}`] != "null"
        ) {
          let AEl = document.createElement("A");

          let mewmealCatingLI = document.createElement("li"); //LI ELEMENT
          mewmealCatingLI.innerHTML = `${data.meals[0][`strIngredient${n}`]}  ${
            data.meals[i][`strMeasure${n}`]
          }`;
          let imgEl = document.createElement("img");
          imgEl.src = "/search.png";
          AEl.appendChild(imgEl);
          AEl.href = `https://www.google.com/search?q=${
            data.meals[i][`strIngredient${n}`]
          }`;
          AEl.target = "_blank";

          mewmealCatingLI.appendChild(AEl);

          newmealCating.appendChild(mewmealCatingLI);
        }
      }

      dacutty[i].appendChild(newmealCating);
      dacutty[i].style.display = "none";
      /**/

      mealsCategory.innerHTML += `
      </div>
      </section>`;
    }

    //PROBLEM WITH CLOSE BRACKETS MIGHT HAVE MISSED SOME EVERYTHING WAAS WORKING ALL FINE
    let ingredients_button = document.querySelectorAll(".ingre");

    let cuttyAll = document.querySelectorAll(".cutty");

    let bycatDiscription = document.querySelectorAll(".Cat-discription"); //RECIPE TEXT
    let categoriesrecipes = document.querySelectorAll(".catrecipe"); //RECIPE BUTTON

    let youtubelink = document.querySelectorAll(".yoyo");

    let imagesfood = document.querySelectorAll(".foodyimage"); //gathering all the classes for food images

    for (let j = 0; j < imagesfood.length; j++) {
      //RENDERING FOOD IMAGE
      imagesfood[j].style.background = `url(${data.meals[j].strMealThumb})`;
      imagesfood[j].style.backgroundSize = "cover";
      imagesfood[j].style.backgroundPosition = "center center";

      ingredients_button[j].addEventListener("click", () => {
        console.log("Rest1");
        console.log(cuttyAll[j]);
        bycatDiscription[j].style.display = "none";
        if (cuttyAll[j].style.display == "none") {
          cuttyAll[j].style.display = "block";
        } else {
          cuttyAll[j].style.display = "none";
        }
      }); //EVENT LISTENER RECIPE

      categoriesrecipes[j].addEventListener("click", () => {
        console.log("Rest2");
        cuttyAll[j].style.display = "none";
        if (bycatDiscription[j].style.display == "none") {
          bycatDiscription[j].style.display = "block";
        } else {
          bycatDiscription[j].style.display = "none";
        }
      }); //EVENT LISTENER RECIPE
    }
  }
});
