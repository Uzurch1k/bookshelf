import { fetchGeneral, fetchCategories, fetchCategory } from './fetch-api';


//Containers
const booksContainer = document.querySelector('.books-container');
const catsContainer = document.querySelector('.categories-menu');


// ==============================================================
//Function for display books
export async function displayTop() {
     const windowWidth = window.innerWidth;
     const booksPerRow = booksPerRowFunc(windowWidth);
     const renderedTop = await fetchGeneral(booksPerRow);

     booksContainer.innerHTML = renderedTop;
     wrapLastWord();
};


// ==============================================================
//Function for display categories
export async function displayCategories() {
    const renderedCats = await fetchCategories();

    catsContainer.innerHTML = renderedCats;
};


// ==============================================================
//Function for display category books
export async function displayCategory(catName) {
    const renderedCat = await fetchCategory(catName);

     booksContainer.innerHTML = renderedCat;
     wrapLastWord();
}

// ==============================================================
//Function for wrapp last title word
function wrapLastWord() {
    const title = document.querySelector('.books-title');
    const textContent = title.textContent.split(" ");
    const lastWord = textContent.pop();

    const updatedContent = textContent.join(" ") + (textContent.length > 0 ? ` <span  class="books-title-color">${lastWord}</span>` : lastWord);

    title.innerHTML = updatedContent;
}


//Fontiono for detectiong books per row
function booksPerRowFunc(windowWith) {
    let booksCount = 3;

    if(windowWith >= 1440) {
        booksCount = 5;
    } 
    
    if(windowWith < 768) {
        booksCount = 1;
    }

    return booksCount;
}


//function for change books display
const windowWidthStart = window.innerWidth;
let ctrlBreikpoint = booksPerRowFunc(windowWidthStart);

async function changeTopDisplay() {
    const isAllCats = document.querySelector('.categories-nav.active').dataset.catname;

    if(!isAllCats) {
        const windowWidth = window.innerWidth;
        const booksPerRow = booksPerRowFunc(windowWidth);

        if(ctrlBreikpoint !== booksPerRow) {
            ctrlBreikpoint = booksPerRow;
            const renderedTop = await fetchGeneral(booksPerRow);

            booksContainer.innerHTML = renderedTop;
            wrapLastWord();
        }
    }
}



// ==============================================================
if(booksContainer) {
    displayTop();
    displayCategories();

    catsContainer.addEventListener('click', e => {
        e.preventDefault();
    
        const target = e.target;
    
        if(target.tagName === 'A') {
            const catName = target.dataset.catname;
    
            catsContainer.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            
            if(catName) {
                displayCategory(catName);
            } else {
                displayTop();
            }
        }
    });
    
    booksContainer.addEventListener('click', e => {
        e.preventDefault();
    
        const target = e.target;
    
        if(target.classList.contains('books-btn')) {
            const catName = target.dataset.catname;
    
            catsContainer.querySelector('.active').classList.remove('active');
            catsContainer.querySelector('[data-catname="'+catName+'"]').classList.add('active');
            
            displayCategory(catName);
        }
    });


    window.addEventListener("resize", changeTopDisplay);
}