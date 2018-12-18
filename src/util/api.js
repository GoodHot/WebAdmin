import http from './http';
import config from '../config';

const archiveSize = 1;

export default {
    archive(index, func){
        http.get(`/archive/page/${index}_${archiveSize}`)
            .then(function(resp){
                func(resp.data.data.content[0]);
            })
    },
    category(func){
        http.get(`/category/page/1_10000`)
            .then(function(resp){
                func(resp.data.data.content);
            })
    },
    url(uri){
        return config.baseURL + uri;
    }
}