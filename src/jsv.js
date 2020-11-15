function jsonView (data) {
  let rootElement = document.createElement('ul');
  rootElement.classList.add('jsv-top-parent', 'p-0', 'm-0')

  if (Array.isArray(data)) {
    data.forEach(obj => {
      render(rootElement, obj, null, true);
    });

    rootElement.prepend(createLiFold('[', null));
    rootElement.appendChild(createLiFold(null, ']'));
  }
  else {
    render(rootElement, data, null, false);
  }

  let isChildrenHided = false;
  rootElement.addEventListener('click', (e) => {

    let target = e.target;
    let parentTarget = target.parentNode;

    if (parentTarget.classList.contains('jsv-top-parent') || (parentTarget.nodeName === 'LI' && target.classList.contains('jsv-fold'))) {

      [...parentTarget.children].forEach(c => {
        if (!c.classList.contains('jsv-fold') && !c.classList.contains('jsv-fold-end')) {
          c.style.display = isChildrenHided ? 'block' : 'none'
        }
      });

      isChildrenHided = !isChildrenHided;
    }
  }, false);

  return rootElement
}

function render (rootElement, obj, parentKey, isObjInsideArr) {

  const ul = document.createElement('ul');

  for (let [key, value] of Object.entries(obj)) {
    if (!isObj(value) && !Array.isArray(value)) {
      createListItems(ul, value, key)
    }

    if (Array.isArray(value)) {
      createArr(ul, value, key, false);
    }

    if (isObj(value)) {
      render(ul, value, key, false);
    }
  }

  const li = document.createElement('li');

  if (parentKey) {
    li.appendChild(createLiFold('{', null, parentKey));
  }
  else {
    li.appendChild(createLiFold('{', null, null));
  }

  li.appendChild(ul);
  li.appendChild(createLiFold(null, '}', null));
  rootElement.appendChild(li)
}

function createArr (rootElement, arr, key) {
  const ul = document.createElement('ul');

  arr.forEach(value => {
    createListItems(ul, value, null);
  });

  const li = document.createElement('li');
  li.appendChild(createLiFold('[', null, key));
  li.appendChild(ul);
  li.appendChild(createLiFold(null, ']', key));
  rootElement.appendChild(li)
}

function createListItems (parentElement, value, key) {
  const li = document.createElement('li');
  if (Array.isArray(value)) {
    createArr(parentElement, value, null);
  }
  if (isObj(value)) {
    render(parentElement, value, null, true);
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

    parentElement.appendChild(li)
  }
}

function isObj (o) {
  return o != null && o.constructor.name === "Object"
}

function isFloatOrNumber (value) {
  return Number(value) === value && value % 1 !== 0
}

function createLiFold (startDelimiter, endDelimiter, key) {
  const li = document.createElement('li');

  if (startDelimiter) {
    li.classList.add('jsv-fold');
    li.innerHTML = `<svg viewBox="0 0 15 15" fill="currentColor"><path d="M0 5l6 6 6-6z"></path></svg>`;
    li.innerHTML += key ? `"${key}": ${startDelimiter}` : ` ${startDelimiter}`;
  }
  else {
    li.classList.add('jsv-fold-end');
    li.innerHTML = endDelimiter;
  }

  return li;
}