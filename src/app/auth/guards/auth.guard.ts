import { Injectable } from '@angular/core';
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanMatch, 
    Route, 
    UrlSegment, 
    RouterStateSnapshot, 
    UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

    constructor() { }

    canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }
    
}