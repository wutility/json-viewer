function jsv (data) {
  let rootElement = document.createElement('div');
  if (Array.isArray(data)) {
    let ul = document.createElement('ul');

    data.forEach(obj => {
      let li = document.createElement("li");
      let span = document.createElement('span');
      span.textContent = '- {';
      span.classList.add('jsv-fold-arr');
      li.classList.add('ml-40')
      li.appendChild(span);
      render(li, obj, null, true);

      li.innerHTML += `<span class="jsv-fold-arr">}</span>`;
      ul.appendChild(li)
    });

    ul.innerHTML = `<li class="jsv-fold-parent-arr border-left">- [</li> ${ul.innerHTML} ]`;
    rootElement.appendChild(ul);
  }
  else {
    render(rootElement, data, null);
  }

  let isChildrenHided = false;
  rootElement.addEventListener('click', (e) => {

    if (e.target.classList.contains('jsv-fold-parent-arr') || e.target.classList.contains('jsv-fold-arr') || (e.target.nodeName === 'LI'
      && e.target.parentNode.nodeName === 'UL'
      && e.target.classList.contains('jsv-fold'))) {

      e.target.textContent = isChildrenHided ? e.target.textContent.replace('+', '-') : e.target.textContent.replace('-', '+');

      [...e.target.parentNode.children].forEach(c => {
        if (!c.classList.contains('jsv-fold-arr') && !c.classList.contains('jsv-fold-parent-arr') && !c.classList.contains('jsv-fold')) {
          c.style.display = isChildrenHided ? 'block' : 'none'
        }
      });

      isChildrenHided = !isChildrenHided;
    }
  }, false);

  return rootElement
}
var index = 0;
function render (rootElement, obj, parentKey, isObjInsideArr = false) {

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
  index++
  console.log(ul);
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