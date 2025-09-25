// ===== COMPONENTES REUTILIZABLES =====

class Components {
    
    // ===== MODAL GENÉRICO =====
    static createModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            size = 'medium',
            closable = true,
            actions = []
        } = options;
        
        const modal = Utils.createElement('div', `modal modal-${size}`);
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    ${closable ? '<button class="modal-close"><i class="fas fa-times"></i></button>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${actions.length > 0 ? `
                    <div class="modal-footer">
                        ${actions.map(action => `
                            <button class="btn ${action.class || 'btn-secondary'}" data-action="${action.action}">
                                ${action.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        // Configurar eventos
        if (closable) {
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => this.closeModal(modal));
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        }
        
        // Configurar acciones
        actions.forEach(action => {
            const btn = modal.querySelector(`[data-action="${action.action}"]`);
            if (btn && action.handler) {
                btn.addEventListener('click', () => action.handler(modal));
            }
        });
        
        return modal;
    }
    
    static showModal(modal) {
        document.body.appendChild(modal);
        setTimeout(() => Utils.addClass(modal, 'active'), 10);
    }
    
    static closeModal(modal) {
        Utils.removeClass(modal, 'active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // ===== NOTIFICACIONES =====
    static createNotification(message, type = 'info', duration = 5000) {
        const notification = Utils.createElement('div', `notification notification-${type}`);
        const typeConfig = CURRENT_CONFIG.notifications.types[type];
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${typeConfig.icon}"></i>
            </div>
            <div class="notification-content">
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Contenedor de notificaciones
        let container = Utils.$('.notifications-container');
        if (!container) {
            container = Utils.createElement('div', 'notifications-container');
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => Utils.addClass(notification, 'show'), 100);
        
        // Auto-cerrar
        const autoClose = setTimeout(() => this.closeNotification(notification), duration);
        
        // Cerrar manualmente
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoClose);
            this.closeNotification(notification);
        });
        
        return notification;
    }
    
    static closeNotification(notification) {
        Utils.removeClass(notification, 'show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ===== LOADER =====
    static createLoader(text = 'Cargando...') {
        const loader = Utils.createElement('div', 'component-loader');
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <span class="loader-text">${text}</span>
            </div>
        `;
        return loader;
    }
    
    static showLoader(container, text = 'Cargando...') {
        const loader = this.createLoader(text);
        container.appendChild(loader);
        return loader;
    }
    
    static hideLoader(loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }
    
    // ===== CONFIRMACIÓN =====
    static confirm(message, title = 'Confirmar') {
        return new Promise((resolve) => {
            const modal = this.createModal({
                title,
                content: `<p>${message}</p>`,
                actions: [
                    {
                        text: 'Cancelar',
                        class: 'btn-secondary',
                        action: 'cancel',
                        handler: (modal) => {
                            this.closeModal(modal);
                            resolve(false);
                        }
                    },
                    {
                        text: 'Confirmar',
                        class: 'btn-primary',
                        action: 'confirm',
                        handler: (modal) => {
                            this.closeModal(modal);
                            resolve(true);
                        }
                    }
                ]
            });
            
            this.showModal(modal);
        });
    }
    
    // ===== PROMPT =====
    static prompt(message, defaultValue = '', title = 'Ingresa un valor') {
        return new Promise((resolve) => {
            const inputId = 'prompt-input-' + Date.now();
            const modal = this.createModal({
                title,
                content: `
                    <p>${message}</p>
                    <div class="form-group">
                        <input type="text" id="${inputId}" class="form-control" value="${defaultValue}" placeholder="Ingresa un valor...">
                    </div>
                `,
                actions: [
                    {
                        text: 'Cancelar',
                        class: 'btn-secondary',
                        action: 'cancel',
                        handler: (modal) => {
                            this.closeModal(modal);
                            resolve(null);
                        }
                    },
                    {
                        text: 'Aceptar',
                        class: 'btn-primary',
                        action: 'accept',
                        handler: (modal) => {
                            const input = modal.querySelector(`#${inputId}`);
                            const value = input ? input.value.trim() : '';
                            this.closeModal(modal);
                            resolve(value);
                        }
                    }
                ]
            });
            
            this.showModal(modal);
            
            // Focus en el input
            setTimeout(() => {
                const input = modal.querySelector(`#${inputId}`);
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 100);
        });
    }
    
    // ===== TABLA DINÁMICA =====
    static createTable(options = {}) {
        const {
            columns = [],
            data = [],
            sortable = true,
            filterable = false,
            paginated = false,
            pageSize = 10
        } = options;
        
        const tableContainer = Utils.createElement('div', 'table-container');
        
        // Filtro
        if (filterable) {
            const filterInput = Utils.createElement('input', 'table-filter');
            filterInput.type = 'text';
            filterInput.placeholder = 'Buscar...';
            tableContainer.appendChild(filterInput);
        }
        
        // Tabla
        const table = Utils.createElement('table', 'dynamic-table');
        
        // Encabezados
        const thead = Utils.createElement('thead');
        const headerRow = Utils.createElement('tr');
        
        columns.forEach(column => {
            const th = Utils.createElement('th');
            th.textContent = column.title;
            th.setAttribute('data-key', column.key);
            
            if (sortable && column.sortable !== false) {
                th.classList.add('sortable');
                th.innerHTML += ' <i class="fas fa-sort"></i>';
            }
            
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Cuerpo
        const tbody = Utils.createElement('tbody');
        table.appendChild(tbody);
        
        tableContainer.appendChild(table);
        
        // Paginación
        if (paginated) {
            const pagination = Utils.createElement('div', 'table-pagination');
            tableContainer.appendChild(pagination);
        }
        
        // Renderizar datos
        this.renderTableData(table, columns, data);
        
        return tableContainer;
    }
    
    static renderTableData(table, columns, data) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        
        data.forEach(row => {
            const tr = Utils.createElement('tr');
            
            columns.forEach(column => {
                const td = Utils.createElement('td');
                const value = Utils.getNestedValue(row, column.key);
                
                if (column.render) {
                    td.innerHTML = column.render(value, row);
                } else {
                    td.textContent = value || '';
                }
                
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
    }
    
    // ===== FORMULARIO DINÁMICO =====
    static createForm(fields = []) {
        const form = Utils.createElement('form', 'dynamic-form');
        
        fields.forEach(field => {
            const formGroup = Utils.createElement('div', 'form-group');
            
            // Label
            if (field.label) {
                const label = Utils.createElement('label');
                label.textContent = field.label;
                label.setAttribute('for', field.name);
                formGroup.appendChild(label);
            }
            
            // Input
            let input;
            
            switch (field.type) {
                case 'textarea':
                    input = Utils.createElement('textarea');
                    if (field.rows) input.rows = field.rows;
                    break;
                    
                case 'select':
                    input = Utils.createElement('select');
                    if (field.options) {
                        field.options.forEach(option => {
                            const optionEl = Utils.createElement('option');
                            optionEl.value = option.value;
                            optionEl.textContent = option.text;
                            input.appendChild(optionEl);
                        });
                    }
                    break;
                    
                default:
                    input = Utils.createElement('input');
                    input.type = field.type || 'text';
            }
            
            // Atributos comunes
            input.name = field.name;
            input.id = field.name;
            
            if (field.placeholder) input.placeholder = field.placeholder;
            if (field.required) input.required = true;
            if (field.value) input.value = field.value;
            if (field.disabled) input.disabled = true;
            
            formGroup.appendChild(input);
            
            // Texto de ayuda
            if (field.help) {
                const helpText = Utils.createElement('small', 'form-help');
                helpText.textContent = field.help;
                formGroup.appendChild(helpText);
            }
            
            form.appendChild(formGroup);
        });
        
        return form;
    }
    
    // ===== PROGRESS BAR =====
    static createProgressBar(value = 0, max = 100, showText = true) {
        const progressContainer = Utils.createElement('div', 'progress-container');
        
        const progressBar = Utils.createElement('div', 'progress-bar');
        const progressFill = Utils.createElement('div', 'progress-fill');
        
        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);
        
        if (showText) {
            const progressText = Utils.createElement('span', 'progress-text');
            progressContainer.appendChild(progressText);
        }
        
        this.updateProgressBar(progressContainer, value, max);
        
        return progressContainer;
    }
    
    static updateProgressBar(progressContainer, value, max = 100) {
        const progressFill = progressContainer.querySelector('.progress-fill');
        const progressText = progressContainer.querySelector('.progress-text');
        
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(percentage)}%`;
        }
    }
    
    // ===== TABS =====
    static createTabs(tabs = []) {
        const tabsContainer = Utils.createElement('div', 'tabs-container');
        
        // Tab headers
        const tabHeaders = Utils.createElement('div', 'tab-headers');
        tabs.forEach((tab, index) => {
            const tabHeader = Utils.createElement('button', 'tab-header');
            tabHeader.textContent = tab.title;
            tabHeader.setAttribute('data-tab', tab.id);
            
            if (index === 0) {
                tabHeader.classList.add('active');
            }
            
            tabHeaders.appendChild(tabHeader);
        });
        
        tabsContainer.appendChild(tabHeaders);
        
        // Tab contents
        const tabContents = Utils.createElement('div', 'tab-contents');
        tabs.forEach((tab, index) => {
            const tabContent = Utils.createElement('div', 'tab-content');
            tabContent.setAttribute('data-tab', tab.id);
            tabContent.innerHTML = tab.content;
            
            if (index === 0) {
                tabContent.classList.add('active');
            }
            
            tabContents.appendChild(tabContent);
        });
        
        tabsContainer.appendChild(tabContents);
        
        // Event listeners
        tabHeaders.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-header')) {
                const tabId = e.target.getAttribute('data-tab');
                this.switchTab(tabsContainer, tabId);
            }
        });
        
        return tabsContainer;
    }
    
    static switchTab(tabsContainer, tabId) {
        // Desactivar todos los tabs
        tabsContainer.querySelectorAll('.tab-header').forEach(header => {
            header.classList.remove('active');
        });
        
        tabsContainer.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Activar tab seleccionado
        const activeHeader = tabsContainer.querySelector(`[data-tab="${tabId}"].tab-header`);
        const activeContent = tabsContainer.querySelector(`[data-tab="${tabId}"].tab-content`);
        
        if (activeHeader) activeHeader.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }
    
    // ===== ACCORDION =====
    static createAccordion(items = []) {
        const accordion = Utils.createElement('div', 'accordion');
        
        items.forEach((item, index) => {
            const accordionItem = Utils.createElement('div', 'accordion-item');
            
            const accordionHeader = Utils.createElement('div', 'accordion-header');
            accordionHeader.innerHTML = `
                <span>${item.title}</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            const accordionContent = Utils.createElement('div', 'accordion-content');
            accordionContent.innerHTML = item.content;
            
            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionContent);
            accordion.appendChild(accordionItem);
            
            // Event listener
            accordionHeader.addEventListener('click', () => {
                this.toggleAccordionItem(accordionItem);
            });
        });
        
        return accordion;
    }
    
    static toggleAccordionItem(item) {
        const isActive = item.classList.contains('active');
        
        // Cerrar otros items (opcional)
        const accordion = item.parentNode;
        accordion.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
    
    // ===== TOOLTIP =====
    static createTooltip(element, text, position = 'top') {
        const tooltip = Utils.createElement('div', `tooltip tooltip-${position}`);
        tooltip.textContent = text;
        
        element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            this.positionTooltip(tooltip, element, position);
            Utils.addClass(tooltip, 'show');
        });
        
        element.addEventListener('mouseleave', () => {
            Utils.removeClass(tooltip, 'show');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 200);
        });
    }
    
    static positionTooltip(tooltip, element, position) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 10;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 10;
                break;
        }
        
        tooltip.style.top = `${top + window.scrollY}px`;
        tooltip.style.left = `${left + window.scrollX}px`;
    }
    
    // ===== DROPDOWN =====
    static createDropdown(button, items = []) {
        const dropdown = Utils.createElement('div', 'dropdown');
        const dropdownMenu = Utils.createElement('div', 'dropdown-menu');
        
        items.forEach(item => {
            const dropdownItem = Utils.createElement('a', 'dropdown-item');
            dropdownItem.textContent = item.text;
            dropdownItem.href = item.href || '#';
            
            if (item.handler) {
                dropdownItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.handler();
                    this.closeDropdown(dropdown);
                });
            }
            
            dropdownMenu.appendChild(dropdownItem);
        });
        
        dropdown.appendChild(button);
        dropdown.appendChild(dropdownMenu);
        
        // Event listeners
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown(dropdown);
        });
        
        document.addEventListener('click', () => {
            this.closeDropdown(dropdown);
        });
        
        return dropdown;
    }
    
    static toggleDropdown(dropdown) {
        Utils.toggleClass(dropdown, 'active');
    }
    
    static closeDropdown(dropdown) {
        Utils.removeClass(dropdown, 'active');
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
} else {
    window.Components = Components;
}
