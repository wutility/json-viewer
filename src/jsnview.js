function isObj(o) {
  return o && typeof o === 'object' && o.constructor.name === 'Object'
}

function getType(value) {
  let isFloat = Number(value) === value && value % 1 !== 0;
  return isFloat ? 'float' : ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function createEl(el) {
  return document.createElement(el);
}

let config = {
  showLen: false,
  showType: false,
  showBrackets: true,
  showFoldmarker: true,
  colors: { boolean: '#ff2929', null: '#ff2929', string: '#690', number: '#905', float: '#002f99' }
}

export default function jsnview(data, options) {
  config = { ...config, ...options };
  const root = createEl('ul');
  root.classList.add('jsv')
  createTree({ data }, root, true);
  return root
}

function createTree(data, parentEl = null, isArray = false) {
  
  for (const key in data) {
    const li = createEl('li'),
    value = data[key],
    isArr = Array.isArray(value);
    
    if (isObj(value) || isArr) {
      let isOpen = false;
      const startDel = createEl('span');
      startDel.classList.add('fold', 'open');
      startDel.setAttribute('data-before', "▾");
      startDel.setAttribute('data-close', "▸");
      if(config.showFoldmarker) startDel.setAttribute('data-after', "↔");

      startDel.textContent = config.showBrackets ? (isArray ? "" : `"${key}": `) + (isArr ? "[" : "{") : '';
      li.appendChild(startDel);

      if (config.showLen) {
        const spanLen = createEl('span');
        const len = isArr ? value.length : Object.keys(value).length;
        spanLen.classList.add('len');
        spanLen.textContent = `{${len}}`;
        li.appendChild(spanLen)
      }

      const ul = createEl('ul');
      li.appendChild(ul);

      if (isArr) {
        const np = createEl('ul');
        for (let i = 0; i < value.length; i++) {
          createTree(value[i], np, true);
        }
      }

      createTree(value, ul, isArr);
      
      startDel.onclick = () => {
        isOpen = !isOpen;
        startDel.parentElement.querySelector('ul').style.display = isOpen ? 'none' : 'block';
        startDel.classList.add(isOpen ? 'close' : 'open');
        startDel.classList.remove(isOpen ? 'open' : 'close');
      }
      
      const endDel = createEl('span');
      endDel.classList.add('fold');
      endDel.textContent = !config.showBrackets ? '' : isArr ? ']' : '}';
      li.appendChild(endDel)
      parentEl.appendChild(li);
    }
    else {
      const spanVal = createEl('span'),
        spanType = createEl('span'),
        valType = getType(value);

      spanVal.style.color = config.colors[valType];
      spanVal.textContent = isNaN(value) ? `"${value}"` : value;

      li.textContent += isArray ? "" : `"${key}": `;
      li.appendChild(spanVal)

      if (config.showType) {
        spanType.classList.add('type');
        spanType.textContent = `(${valType})`;
        li.appendChild(spanType)
      }

      parentEl.appendChild(li)
    }
  }

  return parentEl
}
