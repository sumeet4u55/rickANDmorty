const selectElement = document.querySelector('.applied_filters_sorting > select');
const componentParent = document.querySelector('.main_content');

const filterParent = document.querySelector('.filter_nav');

const filterText = document.querySelector('.applied_filters_label');
const selected_filters = document.querySelector('.applied_filters_selected_filters');

const mobilePlus = document.querySelector('.filter_nav_filters_add_filter');
const mobileGender = document.querySelector('.filter_nav_gender');
const mobileSpecies = document.querySelector('.filter_nav_species');


let totalFilters = {
    gender: [],
    species: []
};
let filterOrder = 'ascending';

function filterContent(filter){
    let request = new XMLHttpRequest();
    let data = null;
    if(filter == 'male' || filter == 'female' || filter == 'unknown'){
        totalFilters.gender.push(filter);
    } else {
        totalFilters.species.push(filter);
    }
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            componentParent.innerHTML = data.html;
            selected_filters.innerHTML = data.filterHtml;
        }
    };
    filterText.className = 'applied_filters_label';
    request.open('GET', '/filter');
    request.setRequestHeader('filters', JSON.stringify(totalFilters) );
    request.setRequestHeader('order', filterOrder );
    request.send(null);
}

function removeFilter(filter){
    let request = new XMLHttpRequest();
    let data = null;
    if(filter == 'male' || filter == 'female' || filter == 'unknown'){
        let index = totalFilters.gender.indexOf(filter);
        totalFilters.gender.splice(index, 1);
    } else {
        let index = totalFilters.species.indexOf(filter);
        totalFilters.species.splice(index, 1);
    }
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            componentParent.innerHTML = data.html;
            selected_filters.innerHTML = data.filterHtml;
        }
    };
    if(!totalFilters.gender.length && !totalFilters.species.length){
        filterText.className = 'applied_filters_label applied_filters_label_hidden';
    }
    request.open('GET', '/filter');
    request.setRequestHeader('filters', JSON.stringify(totalFilters) );
    request.setRequestHeader('order', filterOrder );
    request.send(null);
}


filterParent.addEventListener('click', (e) => {
    if(e.target.type == 'checkbox'){
        if(e.target.checked){
            filterContent(e.target.value);
        } else {
            removeFilter(e.target.value);
        }
    }
});


selectElement.addEventListener('change', async (e)=>{
    e.preventDefault();

    let request = new XMLHttpRequest();
    let data = null;
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            componentParent.innerHTML = data.html;
            selected_filters.innerHTML = data.filterHtml;
        }
    };
    request.open('GET', '/mainTemplate');
    request.setRequestHeader('sort', e.target.value);
    request.setRequestHeader('filters', JSON.stringify(totalFilters) );
    filterOrder = e.target.value;
    request.send(null);
});

selected_filters.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.classList.value == 'filters_close'){
        let value = e.target.parentElement.children[0].textContent;
        removeFilter(value);
        let allCheckBox = document.querySelectorAll('input[type="checkbox"]');

        [].some.call(allCheckBox, (el)=>{
            if(el.value == value){
                el.checked = false;
                return true;
            }
        });
    }
});

mobilePlus.addEventListener('click', () => {
    if(mobileGender.classList.contains('collapse')){
        mobileGender.classList.remove('collapse');
        mobileSpecies.classList.remove('collapse');
    } else {
        mobileGender.classList.add('collapse');
        mobileSpecies.classList.add('collapse');
    }
});