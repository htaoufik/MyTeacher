import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService {
    /**
     * This URL will be used to store the API URL for document upload
     *
     * @type {string}
     * @private
     */
    _baseURL: string = 'http://localhost:xxxx/api/fileupload/';

    /**
     * Constructor injects the http
     *
     * @param {Http} http
     */
    constructor(private http: Http) { }

    /**
     * Proceed with the http post request uploading the file
     *
     * @param files
     * @param parameters
     * @returns {Observable<any | any>}
     */
    upload(files, parameters) {
        const headers = new Headers();
        const options = new RequestOptions({ headers: headers });
        options.params = parameters;

        return  this.http.post(this._baseURL + 'upload', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error)
            );
    }

    /**
     * Proceed with the http request getting the file
     *
     * @returns {Observable<any | any>}
     */
    getImages() {
        return this.http.get(this._baseURL + 'getImages')
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
}
