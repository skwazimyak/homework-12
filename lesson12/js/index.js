import {dataPizza} from './data.js'

const [...radios] = document.querySelectorAll("#pizza input");
const ingridients = document.querySelector('.ingridients');
const cake = document.querySelector(".table");


const pizza = {
    size: {
        "size": "big",
        "price": 100
    },
    topping : []
}

radios.forEach(el => {
    el.addEventListener('change', (e) => {
      const findElement = dataPizza.size.findIndex(function(size){
           return size.size === e.target.id
       })       
       pizza.size = dataPizza.size[findElement]
       showPrice(pizza)
    })
})

ingridients.addEventListener('click', e => {
    const sauceElement = dataPizza.sauce.findIndex(el => {
       return el.name === e.target.id
    })

    const toppingElement = dataPizza.topping.findIndex(el => {
       return el.name === e.target.id
    })    

    if(sauceElement !== -1){
        pizza.sauce = {...dataPizza.sauce[sauceElement], src : e.target.src};
       
    }

    if(toppingElement !== -1){
        pizza.topping.push({...dataPizza.topping[toppingElement], src : e.target.src});
       
    }
   showPrice(pizza)
})


function showPrice (pizza) {
    const [...children] = cake.children;
    children.forEach(img => img.remove());
    const cakeimage = createImage('../images/klassicheskij-bortik_1556622914630.png', 'cake');
    cake.append(cakeimage)

    const elemrntPrice = document.querySelector('#price');
    const sauce = document.querySelector('#sauce');
    const topping = document.querySelector("#topping");

    let badgeIndex = -1
    let price = 0;
    price = price +  parseFloat(pizza.size.price);


    if(pizza.sauce){
        price = price + parseFloat(pizza.sauce.price);
        cake.append(createImage(pizza.sauce.src));
        sauce.textContent = pizza.sauce.publickName
    }

    if(pizza.topping.length > 0){
        const [...telement] = topping.children;
        telement.forEach(el => el.remove())
        price = pizza.topping.reduce(function(acc, top ){
            cake.append(createImage(top.src));
            badgeIndex++
            const [...cakeChildren] = cake.children
            topping.append(badge(top.publickName, badgeIndex, (e) => {
                price -= top.price
                elemrntPrice.textContent = price + ' грн.'
                e.target.parentElement.remove()
                pizza.topping.splice(e.target.parentElement.id, 1)
                cakeChildren.forEach((el,index) => {
                    if(Boolean(pizza.sauce) && index === parseInt(e.target.parentElement.id)+2){
                        el.remove()
                    }
                    else if(!Boolean(pizza.sauce) && index === parseInt(e.target.parentElement.id)+1){
                        el.remove()
                    }
                })
                
            }))
            return acc + top.price;
        }, price)
    }
    

    elemrntPrice.textContent = price + ' грн.'
}

function createImage (src, alt = 'pizza') {
    const img = document.createElement('img')
    img.src = src;
    img.alt = alt

    return img
}

function badge (name, index, listener) {
    const badge = document.createElement('span');
    const del = document.createElement('span');
    badge.className = "badge";
    badge.id = index
    del.innerText = 'x';
    del.className = 'del'
    badge.innerText = name;
    del.addEventListener('click', listener);
    badge.append(del)
    return badge
}
 
showPrice(pizza)