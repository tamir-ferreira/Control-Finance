const buttonModal = document.querySelectorAll('[data-modal-control]');
const containerModal = document.querySelector('.container-modal');
const emptyList = document.querySelector('.empty-list');
const totalizer = document.querySelector('.totalizer').children[1];

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
            // filterTypes();
            renderItems(insertedValues);
            mapItems();
            emptyList.style.display = 'none';
        }
    }
    categoryTemp = null
    inputValue.value = '';
    // typeButton[0].classList.remove('button-pressed')
    // typeButton[1].classList.remove('button-pressed')
}

/* ----------- FUNÇÃO PARA MAPEAR ITENS ------------ */
function mapItems() {
    const cardsControl = document.querySelectorAll('[data-cards-control]');
    cardsControl.forEach(element => {
        element.children[1].children[1].onclick = () => {
            let id = element.getAttribute('data-cards-control')
            // console.dir(id);
            removeItems(id, element)

        }
    });

}

/* ----------- FUNÇÃO RENDERIZAR EM TELA ------------ */
function renderItems(array, variation = false) {
    const listCards = document.querySelector('.list-cards');

    let valueTotal = sumTotal(array);
    listCards.innerHTML = '';
    if (variation) valueTotal = Math.abs(valueTotal);
    
    console.log(array)
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
    array.forEach(element => {
        sum = (element.categoryID == 0) ? sum + element.value : sum - element.value
    });
    return sum;
}


/* ----------- FUNÇÃO FILTRAR OS DADOS ------------ */
function filterTypes() {
    const filterButtons = document.querySelectorAll('[data-filter-button]')
    let activeButton = '';
    filterButtons.forEach(element => {
        // console.log(element.classList.contains('button-pressed'));
        if (element.classList.contains('button-pressed')) {
            activeButton = element.getAttribute('data-filter-button');

        }

        element.onclick = () => {
            insertedValuesfiltered = [];

            filterButtons.forEach(element => element.classList.remove('button-pressed'));

            switch (element) {
                case filterButtons[0]:
                    filterButtons[0].classList.add('button-pressed')
                    renderItems(insertedValues);
                    break;
                case filterButtons[1]:
                    filterButtons[1].classList.add('button-pressed')
                    insertedValuesfiltered = insertedValues.filter(element => element.categoryID == 0)
                    renderItems(insertedValuesfiltered);
                    break;
                case filterButtons[2]:
                    filterButtons[2].classList.add('button-pressed')
                    insertedValuesfiltered = insertedValues.filter(element => element.categoryID == 1)
                    renderItems(insertedValuesfiltered, true);
                    break;
            }

            mapItems(); 
        }
        
    });
    console.log(activeButton);
    return activeButton;

}


/* ------- FUNÇÃO REMOVER ITENS TELA */
// Criar função responsável por remover os dados a partir do ID passado como argumento e atualizar o array's de objetos insertedValues e insertedValuesfiltered
function removeItems(id, element) {
    // console.log(id)
    let index = insertedValues.findIndex(element => element.id == Number(id))
    
    // element.remove();
    // sumTotal(insertedValues)
    // filterTypes();
    let activeFilter = filterTypes();
    // console.log(filterTypes())

    if (activeFilter == 'all-button' || activeFilter == '') {
        insertedValues.splice(index, 1);
        renderItems(insertedValues);
        console.log('render all')
        
    }

    if (activeFilter == 'in-button') {
        renderItems(insertedValuesfiltered);
        console.log('render in')
    }

    if (activeFilter == 'out-button') {
        renderItems(insertedValuesfiltered, true);
        console.log('render out')
    }

    if (insertedValues.length === 0) {
        emptyList.style.display = 'flex';
    }
    // renderItems(insertedValues);
    // totalizer.textContent = `R$ ${sumTotal(insertedValues).toFixed(2).replace('.', ',')}`;
    mapItems();
}
