
const innerWidth = window.innerWidth;
const appHeight = window.innerHeight;
const cellWidth = innerWidth / 100;
const cellHeight = innerWidth / 100;
const tabRows = parseInt(appHeight / cellWidth);
const tableCells = 100 * tabRows;
const table = document.getElementById('table-cont');
const colors = ['red', 'blue', 'yellow', 'pink', 'green'];
const modalEl = document.querySelector('.modal');
let colorSelected = 'red';
let estructura = '';

for (let i = 0; i < tableCells; i++) {

    estructura += `<div id="${i}" class="cellItem"  style="width: ${cellWidth}px; height: ${cellHeight}px; border: .5px solid black;"> </div>`
}
table.innerHTML = estructura;

const cellItems = document.querySelectorAll('.cellItem');

for (let i = 0; i < cellItems.length; i++) {
    cellItems[i].addEventListener('click', function (ev) {

        setItemColor(cellItems[i], false);
    });
    cellItems[i].addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        generateModalColors(ev.pageX, ev.pageY);
    });
    cellItems[i].addEventListener('mouseover', function (ev) {

        if (ev.buttons === 1 || ev.buttons === 3) {
            setItemColor(cellItems[i], true);
        }

    });


}

/**
 * 
 * Función que recibe un elemento html y setea su color , en caso de que paintOver sea false le que ya tengo un color seteado lo remueve y en paintOver sea true
 * este cambia el color por el nuevo elegido.
 * @param {HTMLElement} element 
 * @param {boolean} paintOver
 */
const setItemColor = (element, paintOver) => {
    if (element.style.getPropertyValue('background') && !paintOver) {
        element.style.removeProperty('background');
    } else {
        element.style.background = colorSelected;
    }
};

/**
 * Función que genera la modal para elegir colores y recibe como parametros la posición del mouse en eje x e y para mostrar la modal
 * en esa posición.
 * @param {number} mousePositionX 
 * @param {number} mousePositionY 
 */
const generateModalColors = (mousePositionX, mousePositionY) => {

    const colorsList = document.getElementById('colors-list');
    let listItems = '';

    for (let i = 0; i < colors.length; i++) {
        listItems += `<li><button class="btn-color ${colors[i] === colorSelected ? 'active' : ''}" onclick="setGlobalColor('${colors[i]}')" style="background:${colors[i]};" onclick="setColor(${colors[i]})"></button></li>`;
    }
    colorsList.innerHTML = listItems;
    modalEl.style.removeProperty('display');
    modalEl.style.top = mousePositionY + 'px';
    modalEl.style.left = mousePositionX + 'px';

};

/**
 * Función que detecta cuando el mouse dejo la modal de colores y la cierra.
 */
modalEl.addEventListener('mouseleave', function (ev) {

    closeModal();
});

/**
 * Función para cerrar la modal de colores;
 */
const closeModal = () => {
    modalEl.style.display = 'none';
};

/**
 * Función que recibe el color elegido para setearlo como nuevo color global.
 * @param {string} color 
 */
const setGlobalColor = (color) => {
    colorSelected = color;
    closeModal();
};