import axios from 'axios';

//.NET app 
export const BASE_URL = 'https://localhost:7104/';
//Azure functions app
// export const BASE_URL = 'http://localhost:7071/';

export const ENDPOINTS ={
    TestSample: 'TestSample',
    TestSampleGrouping: 'TestSampleGrouping',
    ViewTestSample: 'ViewTestSample',
    ViewTestSampleGroup: 'ViewTestSampleGroup',
    ViewAllTSG: 'ViewAllTSG'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}

