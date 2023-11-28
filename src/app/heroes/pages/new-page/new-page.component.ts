import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition 
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { 
  filter, 
  switchMap, 
  tap 
} from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';

import { HerosService } from '../../services/heros.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }), //nonNullable -> Siempre va a ser un string
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });
  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ];
  public durationSnackbarInSeconds: number = 2.5;
  public horizontalPositionSnackbar: MatSnackBarHorizontalPosition = 'center';
  public verticalPositionSnackbar: MatSnackBarVerticalPosition = 'top';
  public titlePage!: string;

  constructor( 
    private _heroesService: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if( !this.router.url.includes( 'edit' )) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroById( id ))
      )
      .subscribe( hero => {
        if( !hero ) return this.router.navigateByUrl( '/' );
        this.heroForm.reset( hero );
        return;
      });
  }

  onSubmit(): void {
    if( this.heroForm.invalid ) return;
    if( this.currentHero.id ) {
      this._heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.superhero } update!`)
        });
      
      return;
    }
    this._heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heros/edit', hero.id]);
        this.showSnackBar(`${ hero.superhero } created!`);
      })
  }

  onDeleteHero() {
    if( !this.currentHero.id ) throw Error( 'Hero id is required' );

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter(( result: boolean ) => result ),
      switchMap(() =>  this._heroesService.deleteHeroById( this.currentHero.id )),
      filter(( wasDeleted: boolean ) => wasDeleted )
    )
    .subscribe( result => {
      this.router.navigate(['/heroes']);
    })
  }

  showSnackBar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: this.durationSnackbarInSeconds * 1000,
      horizontalPosition: this.horizontalPositionSnackbar,
      verticalPosition: this.verticalPositionSnackbar
    })
  } 

}
