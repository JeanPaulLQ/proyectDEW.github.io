const forma = document.querySelector(".estado");
const alert = document.querySelector(".alert");
const notas = document.getElementById("notas");
const btnguardar = document.querySelector(".btn-guardar");
const contenedor = document.querySelector(".notas-contenedor");
const lista = document.querySelector(".lista-notas");
const btnlimpiar = document.querySelector(".btn-limpiar");
let editElement;
let editFlag = false;
let editID = "";
forma.addEventListener("submit", addItem);
btnlimpiar.addEventListener("click", clearItems);

function addItem(e) {
    e.preventDefault();
    const value = notas.value;
    const id = new Date().getTime().toString();
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("item-notas");
        element.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                <button type="button" class="btn-edit">
                 Edit 
                </button>
                <button type="button" class="btn-borrar">
                 X 
                </button>
              </div>
            `;
        const deleteBtn = element.querySelector(".btn-borrar");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".btn-edit");
        editBtn.addEventListener("click", editItem);
        lista.appendChild(element);
        displayAlert("item añadido a la lista", "success");
        contenedor.classList.add("notas-visible");       
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Se actualizo", "success");   
        setBackToDefault();
    } else {
        displayAlert("Ingrese un valor", "danger");
    }
}
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}
function clearItems() {
    const items = document.querySelectorAll(".item-notas");
    if (items.length > 0) {
        items.forEach(function (item) {
            lista.removeChild(item);
        });
    }
    contenedor.classList.remove("notas-visible");
    displayAlert("Lista vacia", "danger");
    setBackToDefault();
}
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    lista.removeChild(element);
    if (lista.children.length === 0) {
        contenedor.classList.remove("notas-visible");
    }
    displayAlert("item removido", "danger");
    setBackToDefault();
}
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    notas.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    btnguardar.textContent = "editar";
}
function setBackToDefault() {
    notas.value = "";
    editFlag = false;
    editID = "";
    btnguardar.textContent = "cargar";
}
function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("item-notas");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
            <button type="button" class="btn-edit">
            Edit
             </button>
            <button type="button" class="btn-borrar">
            X 
            </button>
        </div>
            `;
    const deleteBtn = element.querySelector(".btn-borrar");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".btn-edit");
    editBtn.addEventListener("click", editItem);
    lista.appendChild(element);
}
