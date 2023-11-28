import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';

import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor( private _http: HttpClient ) { }

    get currentUSer(): User | undefined {
        if( !this.user ) return undefined;
        return structuredClone ( this.user );
    }

    
    login( email: string, password: string ): Observable<User> {
        return this._http.get<User>( `${ this.baseUrl }/users/1` )
            .pipe(
                tap( user => this.user = user ),
                tap( user => localStorage.setItem( 'token', user.id.toString()) )
            )
    }

    checkAuthentication(): Observable<boolean> {
        if( !localStorage.getItem('token')) return of( false );
        const token = localStorage.getItem( 'token' );
        return this._http.get<User>( `${ this.baseUrl }/user/1` )
            .pipe(
                tap( user => this.user = user ),
                map( user => !!user ),
                catchError( err => of( false ))
            )
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }
    
}