import http from './http';
import config from '../config';

const archiveSize = 1;

export default {
    archive(index, func) {
        http.get(`/archive/page/${index}_${archiveSize}`)
            .then(function (resp) {
                func(resp.data.data.content[0]);
            })
    },
    category(func) {
        http.get(`/category/page/1_10000`)
            .then(function (resp) {
                func(resp.data.data.content);
            })
    },
    staffUsers(func){
        http.get('/user/staff-users')
            .then(function (resp){
                func(resp.data.data);
            });
    },
    admin(func) {
        http.get(`/admin/page/1_10`)
            .then(function (resp) {
                func(resp.data.data.content);
            })
    },
    pager(url, current, func) {
        let self = this;
        http.get(url + `${current}_10`)
            .then(function (resp){
                let datasource = resp.data.data.content;
                let pagination = {
                    total: resp.data.data.totalElements
                }
                let change = function(pagination){
                    self.pager(url, pagination.current, func);
                }
                func(datasource, pagination, change)
            })
    },
    url(uri) {
        return config.baseURL + uri;
    }
}