const API_URL = "https://api.rawg.io/api";

export class Resources {
    entrypoint
    constructor(entrypoint) {
        this.entrypoint = entrypoint;
    } 
    
    async getOne(id, query){
        try {
            const response = await fetch(`${API_URL}${this.entrypoint}/${id}${query}`);
            const oneResources = await response.json();
            return oneResources;
        }catch(error) {
            return {...error};
        }
    }

    async getAll(query){
        try {
            const response = await fetch(`${API_URL}${this.entrypoint}${query}`);
            const allResources = await response.json();
            return allResources;
        }catch(error) {
            return {...error};
        }
    }

    async getManyById(ids, query){
        if (ids == null) {
            return { error: "Id cannot be null"};
        }
        try {
            const responses = await Promise.all(
                ids.map(id => fetch(`${API_URL}${this.entrypoint}/${id}${query}`))
            );
            const allResources = await Promise.all(responses.map(response => response.json()));
            return allResources;
        }catch(error) {
            return {...error};
        }
    }
}
