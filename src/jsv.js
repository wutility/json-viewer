function jsv (data) {
  let rootElement = document.createElement('ul');
  rootElement.classList.add('p-0', 'm-0')

  if (Array.isArray(data)) {
    data.forEach(obj => {
      render(rootElement, obj, null, true);
    });

    rootElement.innerHTML = `<li class="jsv-fold">${svgFold()} [</li> ${rootElement.innerHTML} <li class="jsv-fold-end">]</li>`;
  }
  else {
    render(rootElement, data, null, false);
    rootElement.innerHTML = `<li class="jsv-fold">${svgFold()} {</li> ${rootElement.childNodes[0].innerHTML} <li class="jsv-fold-end">}</li>`;
  }

  let isChildrenHided = false;
  rootElement.addEventListener('click', (e) => {

    let target = e.target;
    let parentTarget = target.parentNode;

    if (parentTarget.nodeName === 'UL' && target.classList.contains('jsv-fold')) {

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
    const li = document.createElement('li');
    li.classList.add('ml-40')

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

  if (!parentKey && isObjInsideArr) {
    ul.innerHTML = `<li class="jsv-fold">${svgFold()} {</li> ${ul.innerHTML} }`;
  }

  if (parentKey && !isObjInsideArr) {
    ul.innerHTML = `<li class="jsv-fold">${svgFold()} "${parentKey}" {</li> ${ul.innerHTML} }`;
  }

  rootElement.appendChild(ul)
}

function createArr (rootElement, arr, key) {
  const ul = document.createElement('ul');

  arr.forEach(value => {
    createListItems(ul, value, null);
  });

  ul.innerHTML = `<li class="jsv-fold">${svgFold()} "${key}" [</li> ${ul.innerHTML} ]`;
  rootElement.appendChild(ul)
}

function createListItems (parentElement, value, key) {
  const li = document.createElement('li');
  li.classList.add('ml-40')
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

function svgFold () {
  return `<svg viewBox="0 0 15 15" fill="currentColor"><path d="M0 5l6 6 6-6z"></path></svg>`;
}