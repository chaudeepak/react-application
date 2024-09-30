import HttpService from "../config/http-service";

class SearchService extends HttpService {
    getSearchByKeywords = async () => {
        try {
            let response = await this.getRequest('/get-articles-by-keyword-name/Microsoft/0/20')
            return response;
        }
        catch(exception) {
            throw exception;
        }
    }
}

export default new SearchService;