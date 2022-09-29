const buttonModal = document.querySelectorAll('[data-modal-control]');
const containerModal = document.querySelector('.container-modal');


/* ----------- ABRIR E FECHAR MODAL ------------ */
buttonModal.forEach(element => {
    element.onclick = () => {
        containerModal.classList.toggle('show-modal');
        insertItems();
    }
});


/* ----------- FUNÇÃO INSERIR NOVOS DADOS DO MODAL ------------ */
function insertItems() {
    const buttonInsert = document.getElementById('button-insert');
    const inputValue = document.getElementById('input-value');
    const typeButton = document.querySelectorAll('[data-type-button]');
    let categoryTemp = null;

    typeButton.forEach(element => {
        element.classList.remove('button-pressed');
        element.onclick = () => {
            if (element == typeButton[0]) {
                categoryTemp = 0;
                typeButton[0].classList.add('button-pressed');
                typeButton[1].classList.remove('button-pressed');
            } else {
                categoryTemp = 1;
                typeButton[1].classList.add('button-pressed');
                typeButton[0].classList.remove('button-pressed');
            }
        }
    });

    buttonInsert.onclick = () => {
        if (categoryTemp != null) {
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
}