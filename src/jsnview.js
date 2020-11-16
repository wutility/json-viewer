function isObj (o) {
  return o !== null && o.constructor.name === "Object"
}

function getValType (value) {
  let isFloat = Number(value) === value && value % 1 !== 0;
  return isFloat ? 'float' : ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function createSpan (txt, className) {
  let span = document.createElement('span');
  span.textContent = txt;
  span.classList.add(className);
  return span;
}

export default function jsnview (data, { displayItemsLen = true, displayTypes = true } = {}) {
  let options = { displayItemsLen, displayTypes };
  let rootElement = document.createElement('ul');
  rootElement.classList.add('jsv', 'p-0', 'm-0');

  if (Array.isArray(data)) {
    const ul = document.createElement('ul');
    data.forEach(obj => {
      render(ul, obj, null);
    });

    let li = document.createElement('li');
    li.prepend(createSpanFold('[', null, null, ul.children.length));
    li.appendChild(ul);
    li.appendChild(createSpanFold(null, ']', null));
    rootElement.appendChild(li)
  }
  else {
    render(rootElement, data, null);
  }

  function createSpanFold (startDelimiter, endDelimiter, key, itemsLen = 0) {
    let span = document.createElement('span');

    if (startDelimiter) {
      span.classList.add('jsv-fold');
      span.textContent = (key ? `"${key}": ` : '') + startDelimiter;

      if (options.displayItemsLen) {
        let spanItemsLen = createSpan(`${itemsLen} items`, 'jsv-items-len');
        span.appendChild(spanItemsLen);
      }
    }
    else {
      span.classList.add('jsv-fold-end');
      span.innerHTML = endDelimiter;
    }

    return span;
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

    if (Array.isArray(value)) {
      createArr(parentElement, value, null);
    }
    if (isObj(value)) {
      render(parentElement, value, null);
    }
    if (!isObj(value) && !Array.isArray(value)) {
      let typeValue = getValType(value);

      let spanValue = createSpan(
        typeValue === 'string' ? `"${value}"` : value,
        `txt-${typeValue}`
      );

      if (options.displayTypes) {
        let spanValueType = createSpan(options.displayTypes ? ` (${typeValue})` : '', 'txt-span-vtype');
        spanValue.appendChild(spanValueType);
      }

      let li = document.createElement('li');
      li.textContent = key ? `"${key}": ` : '';
      li.appendChild(spanValue);

      parentElement.appendChild(li);
    }
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

  rootElement.addEventListener('click', (e) => {

    let target = e.target, parentTarget = target.parentNode;

    if (parentTarget.nodeName === 'LI' && target.classList.contains('jsv-fold')) {

      let isClosed = target.classList.contains('jsv-fold-close');

      for (let element of parentTarget.children) {
        if (!element.classList.contains('jsv-fold') && !element.classList.contains('jsv-fold-end')) {
          element.style.display = isClosed ? 'block' : 'none';
        }
      }

      target.classList.toggle('jsv-fold-close');
    }
  }, false);

  return rootElement;
}
