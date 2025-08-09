interface JsnviewConfig {
    showType: boolean;
    showFoldmarker: boolean;
    showLen: boolean;
    collapsed: boolean;
    maxDepth: number;
}

const DEFAULT_CONFIG: JsnviewConfig = {
    showType: true,
    showFoldmarker: true,
    showLen: true,
    collapsed: false,
    maxDepth: Infinity,
};

export default class Jsnview {
    private data: any;
    private config: JsnviewConfig;
    private root: HTMLDivElement;

    /**
     * Initializes the JSON viewer.
     * @param {any} data - The JSON data to display.
     * @param {Partial<JsnviewConfig>} options - Configuration options.
     */
    constructor(data: any, options: Partial<JsnviewConfig> = {}) {
        this.data = data;
        this.config = { ...DEFAULT_CONFIG, ...options };
        this.root = this.createRootElement();
        this.bindEvents();
        this.render();
    }

    /**
     * Creates the main container element for the viewer.
     * @returns {HTMLDivElement} The root element.
     */
    private createRootElement(): HTMLDivElement {
        const root = document.createElement('div');
        root.className = 'jsv text-sm p-4 bg-white rounded-lg shadow-sm';
        return root;
    }

    /**
     * Binds a single click event listener to the root for event delegation.
     */
    private bindEvents(): void {
        this.root.addEventListener('click', (event: MouseEvent) => {
            const toggle = (event.target as HTMLElement).closest<HTMLSpanElement>('.jsv-toggle');
            if (toggle) {
                const content = toggle.parentElement?.querySelector<HTMLUListElement>('.jsv-content');
                if (content) {
                    toggle.classList.toggle('-rotate-90');
                    content.classList.toggle('hidden');
                }
            }
        });
    }

    /**
     * Renders the initial JSON tree.
     */
    private render(): void {
        this.root.innerHTML = ''; // Clear previous content
        const tree = this.createTree(this.data, 0);
        this.root.appendChild(tree);
    }

    /**
     * Recursively creates the HTML structure for the JSON data.
     * @param {any} data - The current piece of data (object, array, primitive).
     * @param {number} depth - The current nesting depth.
     * @returns {HTMLElement} The generated HTML element for the data.
     */
    private createTree(data: any, depth: number): HTMLElement {
        if (data === null || typeof data !== 'object') {
            const valueNode = document.createElement('span');
            this.applyValueStyles(valueNode, data);
            return valueNode;
        }

        const isArray = Array.isArray(data);
        const list = document.createElement('ul');
        list.className = 'jsv-content list-none pl-7 m-0 border-l border-dotted border-gray-300';

        if (this.config.collapsed && depth > 0) {
            list.classList.add('hidden');
        }

        const fragment = document.createDocumentFragment();
        const entries = Object.entries(data);

        for (const [key, value] of entries) {
            const item = document.createElement('li');
            item.className = 'relative';

            const isComplex = value !== null && typeof value === 'object';

            if (!isArray) {
                const keyNode = document.createElement('span');
                keyNode.className = 'text-amber-800';
                keyNode.textContent = `"${key}": `;
                item.appendChild(keyNode);
            }

            if (this.config.showFoldmarker && isComplex) {
                const toggle = document.createElement('span');
                toggle.className = 'jsv-toggle cursor-pointer select-none absolute -left-4 top-1 text-gray-500 text-xs transition-transform duration-100 ease-in-out';
                toggle.textContent = '▼';
                if (this.config.collapsed && depth > 0) {
                    toggle.classList.add('-rotate-90');
                }
                item.appendChild(toggle);
            }

            if (isComplex) {
                const bracketStart = document.createElement('span');
                bracketStart.className = 'text-gray-600';
                bracketStart.textContent = isArray ? '[' : '{';
                item.appendChild(bracketStart);

                if (this.config.showLen) {
                    const lenNode = document.createElement('span');
                    lenNode.className = 'text-gray-500 italic ml-2';
                    lenNode.textContent = `(${Object.keys(value).length} items)`;
                    item.appendChild(lenNode);
                }

                if (depth < this.config.maxDepth) {
                    item.appendChild(this.createTree(value, depth + 1));
                }

                const bracketEnd = document.createElement('span');
                bracketEnd.className = 'text-gray-600';
                bracketEnd.textContent = isArray ? ']' : '}';
                item.appendChild(bracketEnd);
            } else {
                const valueNode = document.createElement('span');
                this.applyValueStyles(valueNode, value);
                item.appendChild(valueNode);
            }
            fragment.appendChild(item);
        }
        list.appendChild(fragment);
        return list;
    }

    /**
     * Applies syntax highlighting styles to a value element.
     * @param {HTMLElement} element - The element to style.
     * @param {any} value - The value to be styled.
     */
    private applyValueStyles(element: HTMLElement, value: any): void {
        const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        element.textContent = JSON.stringify(value);

        switch (type) {
            case 'string':
                element.className = 'text-green-700';
                break;
            case 'number':
            case 'bigint':
                element.className = 'text-blue-700';
                break;
            case 'boolean':
                element.className = 'text-rose-700';
                break;
            case 'null':
                element.className = 'text-stone-700 italic';
                element.textContent = 'null';
                break;
            default:
                // Optional: Handle other types or provide a default style
                break;
        }

        if (this.config.showType) {
            const typeNode = document.createElement('span');
            typeNode.className = 'text-gray-500 italic ml-2';
            typeNode.textContent = `(${type})`;
            element.appendChild(typeNode);
        }
    }

    /**
     * Returns the root DOM element of the viewer.
     * @returns {HTMLDivElement}
     */
    public getElement(): HTMLDivElement {
        return this.root;
    }

    /**
     * Collapses all collapsible nodes in the tree.
     */
    public collapseAll(): void {
        const toggles = this.root.querySelectorAll<HTMLSpanElement>('.jsv-toggle');
        toggles.forEach(toggle => {
            const content = toggle.parentElement?.querySelector<HTMLUListElement>('.jsv-content');
            if (content && !content.classList.contains('hidden')) {
                toggle.classList.add('-rotate-90');
                content.classList.add('hidden');
            }
        });
    }

    /**
     * Expands all collapsible nodes in the tree.
     */
    public expandAll(): void {
        const toggles = this.root.querySelectorAll<HTMLSpanElement>('.jsv-toggle');
        toggles.forEach(toggle => {
            const content = toggle.parentElement?.querySelector<HTMLUListElement>('.jsv-content');
            if (content && content.classList.contains('hidden')) {
                toggle.classList.remove('-rotate-90');
                content.classList.remove('hidden');
            }
        });
    }
}