import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HerosService {

    private baseUrl: string = environments.baseUrl;

    constructor( private _http: HttpClient ) { }

    getHeroes(): Observable<Hero[]> {
        return this._http.get<Hero[]>( `${ this.baseUrl }/heroes` );
    }
    
}