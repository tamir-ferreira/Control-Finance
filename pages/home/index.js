const buttonModal = document.querySelectorAll('[data-modal-control]');
const containerModal = document.querySelector('.container-modal');
const emptyList = document.querySelector('.empty-list');
const totalizer = document.querySelector('.totalizer').children[1];
const filterButtons = document.querySelectorAll('[data-filter-button]')

/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */
/* -------------- NÃO ESQUECER DE SEPARAR A LÓGICA DO MODAL ------- */

filterTypes();

/* ----------- ABRIR E FECHAR MODAL ------------ */
buttonModal.forEach(element => {
    element.onclick = () => {
        containerModal.classList.toggle('show-modal');
        insertItems();
    }
});


/* ----------- FUNÇÃO INSERIR NOVO DADO NO ARRAY ------------ */
function insertItems() {
    const buttonInsert = document.getElementById('button-insert');
    const inputValue = document.getElementById('input-value');
    const typeButton = document.querySelectorAll('[data-type-button]')
    let categoryTemp = null;
    typeButton.forEach(element => {
        element.classList.remove('button-pressed')
        element.onclick = () => {
            if (element == typeButton[0]) {
                categoryTemp = 0;
                typeButton[0].classList.add('button-pressed')
                typeButton[1].classList.remove('button-pressed')
            } else {
                categoryTemp = 1;
                typeButton[1].classList.add('button-pressed')
                typeButton[0].classList.remove('button-pressed')
            }
        }
    });
    buttonInsert.onclick = () => {
        if (inputValue.valueAsNumber > 0 && categoryTemp != null) {
            const newValue = {
                id: insertedValues.length + 1,
                value: inputValue.valueAsNumber,
                categoryID: categoryTemp,
            }
            inputValue.value = '';
            insertedValues.push(newValue);
            selectType(filterTypes());
            mapItems();
            emptyList.style.display = 'none';
        }
    }
    categoryTemp = null
    inputValue.value = '';
    // typeButton[0].classList.remove('button-pressed')
    // typeButton[1].classList.remove('button-pressed')
}


/* ----------- FUNÇÃO MAPEAR ITENS DA TELA ------------ */
function mapItems() {
    const cardsControl = document.querySelectorAll('[data-cards-control]');
    cardsControl.forEach(element => {
        element.children[1].children[1].onclick = () => {
            let id = element.getAttribute('data-cards-control')
            removeItems(id, element)
        }
    });
}



/* ----------- FUNÇÃO RENDERIZAR ITENS NA TELA ------------ */
function renderItems(array, variation = false) {
    const listCards = document.querySelector('.list-cards');

    let valueTotal = sumTotal(array);
    listCards.innerHTML = '';
    if (variation) valueTotal = Math.abs(valueTotal);

    array.forEach(element => {
        const category = (element.categoryID == 0) ? 'Entrada' : 'Saída';


        listCards.innerHTML +=
            `
        <li class="card" data-cards-control="${element.id}">
            <span>R$  ${element.value.toFixed(2).replace('.', ',')}</span> 
            <div>
                <button class="button-greylow">${category}</button>
                <div class='trash-img'>
            </div>
        </li>
        `
    });
    totalizer.textContent = `R$ ${valueTotal.toFixed(2).replace('.', ',')}`;
}


/* ------- FUNÇÃO SOMAR DADOS PASSADOS POR PARÂMETROS ---------- */
function sumTotal(array) {
    let sum = 0;
    array.forEach(element => sum = (element.categoryID == 0) ? sum + element.value : sum - element.value);
    return sum;
}


/* ----------- FUNÇÃO FILTRAR OS DADOS ------------ */
function filterTypes() {
    let activeButton = '';
    filterButtons.forEach(element => {
        if (element.classList.contains('button-pressed')) activeButton = element.getAttribute('data-filter-button');

        element.onclick = () => {
            insertedValuesfiltered = [];
            filterButtons.forEach(element => element.classList.remove('button-pressed'));
            selectType(element.getAttribute('data-filter-button'))
            mapItems();
        }
    });
    return activeButton;
}

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


/* ------- FUNÇÃO REMOVER ITENS TELA */
function removeItems(id, element) {
    const indexValues = insertedValues.findIndex(element => element.id == Number(id))
    const indexFiltred = insertedValues.findIndex(element => element.id == Number(id))
    const activeFilter = filterTypes();

    insertedValues.splice(indexValues, 1);

    if (activeFilter == 'all-button' || activeFilter == '') {
        renderItems(insertedValues);
    }

    if (activeFilter == 'in-button') {
        insertedValuesfiltered.splice(indexFiltred, 1);
        renderItems(insertedValuesfiltered);
    }

    if (activeFilter == 'out-button') {
        insertedValuesfiltered.splice(indexFiltred, 1);
        renderItems(insertedValuesfiltered, true);
    }

    if (insertedValues.length === 0) {
        emptyList.style.display = 'flex';
    }

    element.remove();
    mapItems();
}
