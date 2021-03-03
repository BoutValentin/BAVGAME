import { Resources } from "./Resources";

export class GameResources extends Resources {
    query;
    constructor(query) {
        super('/game');
        this.query = query;
    }

    async getOne(id){
        return await super.getOne(id, this.query.getStringQuery());
    }

    async getAll(){
        return await super.getAll(this.query.getStringQuery()); 
    }

    async getManyById(ids){
        return await super.getManyById(ids, this.query.getStringQuery());
    }
}
