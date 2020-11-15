function jsv (data) {
  let rootElement = document.createElement('ul');
  rootElement.classList.add('p-0','m-0')

  if (Array.isArray(data)) {
    data.forEach(obj => {
      render(rootElement, obj, null, true);
    });

    rootElement.innerHTML = `<li class="jsv-fold">- [</li> ${rootElement.innerHTML} <li class="jsv-fold-end">]</li>`;
  }
  else {
    render(rootElement, data, null, false);
    rootElement.innerHTML = `<li class="jsv-fold">- {</li> ${rootElement.childNodes[0].innerHTML} <li class="jsv-fold-end">}</li>`;
  }

  let isChildrenHided = false;
  rootElement.addEventListener('click', (e) => {

    let target = e.target;
    let parentTarget = target.parentNode;

    if (parentTarget.nodeName === 'UL' && target.classList.contains('jsv-fold')) {

      target.textContent = isChildrenHided
        ? target.textContent.replace('+', '-')
        : target.textContent.replace('-', '+');

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
      let typeValue = typeof value;
      console.log(typeValue);
      if(typeValue==='number') {
        typeValue=Number(value) === value && value % 1 !== 0 ? 'float' :'number'
      }
      li.innerHTML =typeValue==='string'
      ? `"${key}": <span class="txt-${typeValue}">"${value}"</span>,`
      :`"${key}": <span class="txt-${typeValue}">${value}</span>,`;
      ul.appendChild(li)
    }

    if (Array.isArray(value)) {
      createArr(ul, value, key, false);
    }

    if (isObj(value)) {
      render(ul, value, key, false);
    }
  }

  if (!parentKey && isObjInsideArr) {
    ul.innerHTML = `<li class="jsv-fold">- {</li> ${ul.innerHTML} }`;
  }

  if (parentKey && !isObjInsideArr) {
    ul.innerHTML = `<li class="jsv-fold">- ${parentKey} {</li> ${ul.innerHTML} }`;
  }

  rootElement.appendChild(ul)
}

function createArr (rootElement, arr, key) {
  const ul = document.createElement('ul');

  arr.forEach(value => {
    createItems(ul, value);
  });

  ul.innerHTML = `<li class="jsv-fold">- "${key}" [</li> ${ul.innerHTML} ]`;
  rootElement.appendChild(ul)
}

function createItems (parentElement, value) {
  const li = document.createElement('li');
  li.classList.add('ml-40')
  if (Array.isArray(value)) {
    createArr(parentElement, value, null);
  }
  if (isObj(value)) {
    render(parentElement, value, null, true);
  }
  if (!isObj(value) && !Array.isArray(value)) {
    li.innerHTML = `${value}`;
    parentElement.appendChild(li)
  }
}

function isObj (o) {
  return o != null && o.constructor.name === "Object"
}