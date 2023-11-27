import { Component, OnInit } from '@angular/core';

import { HerosService } from '../../services/heros.service';

import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public title: string = 'Listado de Héroes';
  public heroes: Hero[] = []

  constructor( private _herosService: HerosService ) {}

  ngOnInit(): void {
    this._herosService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );
  }

}
