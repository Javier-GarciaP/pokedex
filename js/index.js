const api = "https://pokeapi.co/api/v2/pokemon/";
const contenedor = document.querySelector("#contenedor-pokemon");
const botones = document.querySelectorAll('.btn-header')
const pokemon = 151;

for (let i = 1; i <= pokemon; i++) {
  fetch(api + i)
    .then((res) => res.json())
    .then((data) => imprimirDatos(data));
}

function imprimirDatos(data) {
  let tipos = data.types.map(
    (types) => `
        <p class="${types.type.name}">${types.type.name}</p>
    `
  );
  tipos = tipos.join("");

  let id = data.id.toString();
  if (id.length === 1) {
    id = "#00" + id;
  } else if (id.length === 2) {
    id = "#0" + id;
  }

  const card = document.createElement("div");
  card.classList.add("card-pokemon");
  card.innerHTML = `
    <div class="imagen-pokemon ${data.types[0].type.name}-bg"><img src="${data.sprites.other["official-artwork"].front_default}" alt=""></div>
        <div class="datos-pokemon">
            <p class="numero-pokemon">${id}</p>
            <p class="nombre-pokemon">${data.name}</p>
        </div>
        <div class="tipos-pokemon">
            ${tipos}
        </div>
    </div>
    `;

  contenedor.append(card);
}

botones.forEach(boton => boton.addEventListener("click", (event)=>{
    const tipoBoton = event.currentTarget.id
    contenedor.innerHTML = ''
    for (let i = 1; i <= pokemon; i++) {
        fetch(api + i)
          .then((res) => res.json())
          .then((data) => {
            if(tipoBoton === 'ver-todos'){
                imprimirDatos(data)
            }else{
                const tipos = data.types.map(types => types.type.name)
                for(i = 0; i < tipos.length; i++){
                    if(tipos[i] == tipoBoton){
                        imprimirDatos(data)
                    }
                }
            }
          });
      }
}))
