function jsv (data) {
  let rootElement = document.createElement('ul');

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
  ul.classList.add('border-left');

  for (let [key, value] of Object.entries(obj)) {
    const li = document.createElement('li');
    li.classList.add('ml-40')

    if (!isObj(value) && !Array.isArray(value)) {
      li.innerHTML = `"${key}": ${value},`;
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
  ul.classList.add('border-left')

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