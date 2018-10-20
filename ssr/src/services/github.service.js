import axios from 'axios';

const api = 'https://api.github.com';

export class GitHubService {
    fetchTopRepos() {
        return axios
            .get(api + '/search/repositories', {
                params: {
                    q: 'language:javascript stars:>10000',
                    sort: 'stars',
                    order: 'desc'
                }
            })
            .then(response => {
                return response.data.items;
            });
    }
}
