import HttpService from "../config/http-service";

class CategoryService extends HttpService {
    getCategory = async () => {
        try{
            // let response = await this.getRequest('market-category/list?_limit=5')
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

export default new CategoryService;