export default function jsonView (data) {
  let rootElement = document.createElement('ul');
  rootElement.classList.add('jsv-top-parent', 'p-0', 'm-0');

  if (Array.isArray(data)) {
    const ul = document.createElement('ul');
    data.forEach(obj => {
      render(ul, obj, null);
    });

    rootElement.prepend(createSpanFold('[', null, null, ul.children.length));
    rootElement.appendChild(ul);
    rootElement.appendChild(createSpanFold(null, ']', null));
  }
  else {
    render(rootElement, data, null);
  }

  rootElement.addEventListener('click', (e) => {

    let target = e.target, parentTarget = target.parentNode;

    if (parentTarget.nodeName === 'LI' && target.classList.contains('jsv-fold')) {

      let isClosed = target.classList.contains('open-close');

      [...parentTarget.children].forEach(c => {
        if (!c.classList.contains('jsv-fold') && !c.classList.contains('jsv-fold-end')) {
          c.style.display = isClosed ? 'block' : 'none';
        }
      });

      target.classList.toggle('open-close');
      parentTarget.style.display = isClosed ? 'block' : 'flex';
    }
  }, false);

  return rootElement;
}

function render (rootElement, obj, parentKey) {

  const ul = document.createElement('ul');

  for (let [key, value] of Object.entries(obj)) {
    if (!isObj(value) && !Array.isArray(value)) {
      createListItems(ul, value, key)
    }

    if (Array.isArray(value)) {
      createArr(ul, value, key, false);
    }

    if (isObj(value)) {
      render(ul, value, key);
    }
  }

  const li = document.createElement('li');
  li.appendChild(createSpanFold('{', null, parentKey, ul.children.length));
  li.appendChild(ul);
  li.appendChild(createSpanFold(null, '}', null));
  rootElement.appendChild(li);
}

function createArr (rootElement, arr, key) {
  const ul = document.createElement('ul');

  arr.forEach(value => {
    createListItems(ul, value, null);
  });

  const li = document.createElement('li');
  li.appendChild(createSpanFold('[', null, key, ul.children.length));
  li.appendChild(ul);
  li.appendChild(createSpanFold(null, ']', key));
  rootElement.appendChild(li)
}

function createListItems (parentElement, value, key) {
  const li = document.createElement('li');
  if (Array.isArray(value)) {
    createArr(parentElement, value, null);
  }
  if (isObj(value)) {
    render(parentElement, value, null);
  }
  if (!isObj(value) && !Array.isArray(value)) {
    let typeValue = typeof value;

    if (typeValue === 'number') {
      typeValue = isFloatOrNumber(value) ? 'float' : 'number'
    }

    if (key) {
      li.innerHTML = typeValue === 'string'
        ? `"${key}": <span class="txt-${typeValue}">"${value}"</span>,`
        : `"${key}": <span class="txt-${typeValue}">${value}</span>,`;
    }
    else {
      li.innerHTML = typeValue === 'string'
        ? `<span class="txt-${typeValue}">"${value}"</span>,`
        : `<span class="txt-${typeValue}">${value}</span>,`;
    }

    parentElement.appendChild(li);
  }
}

function isObj (o) {
  return o != null && o.constructor.name === "Object"
}

function isFloatOrNumber (value) {
  return Number(value) === value && value % 1 !== 0
}

function createSpanFold (startDelimiter, endDelimiter, key, itemsLen = 0) {
  const span = document.createElement('span');

  if (startDelimiter) {
    span.classList.add('jsv-fold');
    span.innerHTML = key
      ? `"${key}": ${startDelimiter} <span class="txt-mute mr-10">${itemsLen} items</span>`
      : ` ${startDelimiter} <span class="txt-mute mr-10">${itemsLen} items</span>`;
  }
  else {
    span.classList.add('jsv-fold-end');
    span.innerHTML = endDelimiter;
  }

  return span;
}