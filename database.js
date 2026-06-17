// Banco de dados simples usando localStorage para armazenar rastreamentos

const DB = {
    // Salva um registro de rastreamento
    save(orderId, data) {
        const all = this.getAll();
        all[orderId] = {
            ...data,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('rastreamentos', JSON.stringify(all));
    },

    // Retorna um registro específico
    get(orderId) {
        const all = this.getAll();
        return all[orderId] || null;
    },

    // Retorna todos os registros
    getAll() {
        try {
            return JSON.parse(localStorage.getItem('rastreamentos')) || {};
        } catch {
            return {};
        }
    },

    // Remove um registro
    remove(orderId) {
        const all = this.getAll();
        delete all[orderId];
        localStorage.setItem('rastreamentos', JSON.stringify(all));
    },

    // Lista todos os IDs únicos com data
    list() {
        const all = this.getAll();
        return Object.entries(all).map(([id, data]) => ({
            id,
            ...data
        }));
    }
};