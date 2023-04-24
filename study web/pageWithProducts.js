'use strict';

let console = JSON.parse(localStorage.getItem('console')) || [];
const consoleDOM = document.querySelector('.console);
const addToConsoleButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CONSOLE"]');

if (console.length > 0) {
  console.forEach(consoleItem => {
    const member = consoleItem;
    insertItemToDOM(member);
    countConsoleTotal();

    addToCartButtonsDOM.forEach(addToConsoleButtonDOM => {
      const memberDOM = addToConsoleButtonDOM.parentNode;

      if (memberDOM.querySelector('.member__name').innerText === member.name) {
        handleActionButtons(addToConsoleButtonDOM, member);
      }
    });
  });
}

addToConsoleButtonsDOM.forEach(addToConsoleButtonDOM => {
  addToConsoleButtonDOM.addEventListener('click', () => {
    const memberDOM = addToConsoleButtonDOM.parentNode;
    const member = {
      image: memberDOM.querySelector('.member__image').getAttribute('src'),
      name: memberDOM.querySelector('.member__name').innerText,
      point: memberDOM.querySelector('.member__point').innerText,
      quantity: 1
    };

    const isInConsole = console.filter(consoleItem => consoleItem.name === member.name).length > 0;

    if (!isInConsole) {
      insertItemToDOM(member);
      console.push(member);
      saveConsole();
      handleActionButtons(addToConsoleButtonDOM, member);
    }
  });
});

function insertItemToDOM(member) {
  consoleDOM.insertAdjacentHTML(
    'beforeend',
    `
    <div class="console__item">
      <img class="console__item__image" src="${member.image}" alt="${member.name}">
      <h3 class="console__item__name">${member.name}</h3>
      <h3 class="console__item__point">${member.point}</h3>
      <button class="btn btn--primary btn--small${member.quantity === 1 ? ' btn--danger' : ''}" data-action="DECREASE_ITEM">&minus;</button>
      <h3 class="console__item__quantity">${member.quantity}</h3>
      <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
    </div>
  `
  );

  addConsoleFooter();
}

function handleActionButtons(addToConsoleButtonDOM, member) {
  addToConsoleButtonDOM.innerText = 'changeing';
  addToConsoleButtonDOM.disabled = true;

  const consoleItemsDOM = consoleDOM.querySelectorAll('.console__item');
  consoleItemsDOM.forEach(consoleItemDOM => {
    if (consoleItemDOM.querySelector('.console__item__name').innerText === member.name) {
      consoleItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(member, consoleItemDOM));
      consoleItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(member, consoleItemDOM, addToConsoleButtonDOM));
      consoleItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(member, consoleItemDOM, addToConsoleButtonDOM));
    }
  });
}

function increaseItem(member, consoleItemDOM) {
  console.forEach(consoleItem => {
    if (consoleItem.name === member.name) {
      consoleItemDOM.querySelector('.console__item__quantity').innerText = ++consoleItem.quantity;
      consoleItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
      saveConsole();
    }
  });
}

function decreaseItem(member, consoleItemDOM, addToConsoleButtonDOM) {
  console.forEach(consoleItem => {
    if (consoleItem.name === member.name) {
      if (consoleItem.quantity > 1) {
        consoleItemDOM.querySelector('.console__item__quantity').innerText = --consoleItem.quantity;
        saveConsole();
      } else {
        removeItem(member, consoleItemDOM, addToConsoleButtonDOM);
      }

      if (consoleItem.quantity === 1) {
        consoleItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
      }
    }
  });
}

function removeItem(member, consoleItemDOM, addToConsoleButtonDOM) {
  consoleItemDOM.classList.add('console__item--removed');
  setTimeout(() => cartItemDOM.remove(), 250);
  console = cart.filter(consoleItem => consoleItem.name !== member.name);
  saveConsole();
  addToConsoleButtonDOM.innerText = 'Add To Table';
  addToConsoleButtonDOM.disabled = false;

  if (console.length < 1) {
    document.querySelector('.console-footer').remove();
  }
}

function addConsoleFooter() {
  if (document.querySelector('.console-footer') === null) {
    consoleDOM.insertAdjacentHTML(
      'afterend',
      `
      <div class="console-footer">
        <button class="btn btn--danger" data-action="CLEAR_CONSOLE">Clear All</button>
        <button class="btn btn--primary" data-action="CHECKOUT">ADD</button>
      </div>
    `
    );

    document.querySelector('[data-action="CLEAR_CONSOLE"]').addEventListener('click', () => clearConsole());
    document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
  }
}

function clearConsole() {
  consoleDOM.querySelectorAll('.console__item').forEach(consoleItemDOM => {
    consoleItemDOM.classList.add('console__item--removed');
    setTimeout(() => consoleItemDOM.remove(), 250);
  });

  console = [];
  localStorage.removeItem('cart');
  document.querySelector('.console-footer').remove();

  addToConsoleButtonsDOM.forEach(addToConsoleButtonDOM => {
    addToConsoleButtonDOM.innerText = 'Add points';
    addToConsoleButtonDOM.disabled = false;
  });
}

function countConsoleTotal() {
  let consoleTotal = 0;
  console.forEach(consoleItem => (consoleTotal += consoleItem.quantity * consoleItem.point));
  document.querySelector('[data-action="CHECKOUT"]').innerText = `Add ${consoleTotal} points`;
}

function saveConsole() {
  localStorage.setItem('point', JSON.stringify(console));
  countConsoleTotal();
}
