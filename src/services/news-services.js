import HttpService from "../config/http-service";

class NewsService extends HttpService {
    getNews = async () => {
        try {
            let response = await this.getRequest('news')
            return response;
        }
        catch(exception) {
            throw exception;
        }
    }
}

export default new NewsService;