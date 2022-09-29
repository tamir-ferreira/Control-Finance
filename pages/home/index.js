const emptyList = document.querySelector('.empty-list');
const totalizer = document.querySelector('.totalizer').children[1];
const filterButtons = document.querySelectorAll('[data-filter-button]')


/* ----------- FUNÇÃO RENDERIZAR ITENS NA TELA ------------ */
function renderItems(array, variation = false) {
    const listCards = document.querySelector('.list-cards');
    let valueTotal = sumTotal(array);
    if (variation) valueTotal = Math.abs(valueTotal);
    listCards.innerHTML = '';

    array.forEach(element => {
        const category = (element.categoryID == 0) ? 'Entrada' : 'Saída';
        const li = document.createElement('li');
        const spanValue = document.createElement('span');
        const spanType = document.createElement('span');
        const div = document.createElement('div');
        const button = document.createElement('button');
        const img = document.createElement('img');
        
        li.setAttribute("data-cards-control", element.id);
        li.className = "card";
        spanValue.innerText = `R$  ${element.value.toFixed(2).replace('.', ',')}`;
        spanType.className = "button-greylow";
        spanType.innerText = category;
        img.className = "trash-img";

        listCards.appendChild(li);
        li.append(spanValue,div);
        div.append(spanType, button);
        button.appendChild(img);
    });

    totalizer.textContent = `R$ ${valueTotal.toFixed(2).replace('.', ',')}`;
}


/* ------- FUNÇÃO SOMAR VALORES DO ARRAY ---------- */
function sumTotal(array) {
    let sum = 0;
    array.forEach(element => sum = (element.categoryID == 0) ? sum + element.value : sum - element.value);
    return sum;
}


/* ----------- FUNÇÃO FILTRAR OS TIPOS DE DADOS A EXIBIR ------------ */
function filterTypes() {
    let activeButton = '';
    filterButtons.forEach(element => {
        if (element.classList.contains('button-pressed')) activeButton = element.getAttribute('data-filter-button');

        element.onclick = () => {
            insertedValuesfiltered = [];
            filterButtons.forEach(element => element.classList.remove('button-pressed'));
            selectType(element.getAttribute('data-filter-button'));
            mapItems();
        }
    });
    return activeButton;
}
filterTypes();


/* ----------- FUNÇÃO VERIFICAR TIPO DE DADOS SELECIONADO ------------ */
function selectType(element) {
    switch (element) {
        case 'all-button' || '':
            filterButtons[0].classList.add('button-pressed');
            renderItems(insertedValues);
            break;
        case 'in-button':
            filterButtons[1].classList.add('button-pressed');
            insertedValuesfiltered = insertedValues.filter(element => element.categoryID == 0);
            renderItems(insertedValuesfiltered);
            break;
        case 'out-button':
            filterButtons[2].classList.add('button-pressed');
            insertedValuesfiltered = insertedValues.filter(element => element.categoryID == 1);
            renderItems(insertedValuesfiltered, true);
            break;
    }
}


/* ----------- FUNÇÃO MAPEAR BOTOES DOS CARDS EXIBIDOS ------------ */
function mapItems() {
    const cardsControl = document.querySelectorAll('[data-cards-control]');
    cardsControl.forEach(element => {
        element.children[1].children[1].onclick = () => {
            let id = element.getAttribute('data-cards-control');
            removeItems(id);
        };
    });
}


/* ------- FUNÇÃO REMOVER CARDS TELA */
function removeItems(id) {
    const indexValues = insertedValues.findIndex(element => element.id == Number(id));
    const indexFiltred = insertedValuesfiltered.findIndex(element => element.id == Number(id));
    const activeFilter = filterTypes();

    insertedValues.splice(indexValues, 1);
    if (activeFilter == 'all-button' || activeFilter == '') renderItems(insertedValues);
    
    if (activeFilter == 'in-button') {
        insertedValuesfiltered.splice(indexFiltred, 1);
        renderItems(insertedValuesfiltered);
    }
    if (activeFilter == 'out-button') {
        insertedValuesfiltered.splice(indexFiltred, 1);
        renderItems(insertedValuesfiltered, true);
    }
    if (insertedValues.length === 0) emptyList.style.display = 'flex';

    mapItems();
}
