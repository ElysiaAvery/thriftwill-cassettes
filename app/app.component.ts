import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Cd } from './cd.model';
import { CdListComponent } from './cd-list.component';
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
  <div class="jumbotron">
  <h1>Thriftwill's Cassette &amp; 8-Track Section</h1>
  </div>
  <div class="row">
    <div class="col-sm-8">
    <cd-list
      [childCdList]="masterCdList"
      [genres]="genreList"
      [artists]="artistList"
      (clickSender)="showDetails($event)"
    ></cd-list>
    </div>
    <div class="col-sm-4">
    <shopping-cart
      [childSelectedCdList]="selectedCds"
      (buyClickedSender)="finishedBuying()"
    ></shopping-cart>
    </div>
  </div>
  `
})

export class AppComponent {

  @ViewChild(CdListComponent)
  private cdListComponent: CdListComponent;

  masterCdList: Cd[] = [
    new Cd("Best Of Queen", "Queen", .25, "Rawk"),
    new Cd("Best Of Willie Nelson", "Willie Nelson", .25, "Country"),
    new Cd("Pretty Paper", "Willie Nelson", .25, "Country"),
    new Cd("Middle Cyclone", "Neko Case", .25, "Alt-Rawk"),
    new Cd("Greatest Hits", "Neil Young", .25, "Classic Rawk"),
    new Cd("Christmas In The Heart", "Bob Dylan", .25, "Folx"),
    new Cd("Once Upon a Christmas", "Dolly Parton", .50, "Country"),
    new Cd("The Best", "Rammstein", .25, "Metal.. I Guess..."),
    new Cd("The Collection Volume One", "Bone Thugs-n-Harmony", .25, "Hip-Hop"),
    new Cd("The Complete Greatest Hits", "America", .20, "Classic Rawk"),
    new Cd("Bob Dylan's Greatest Hits", "Bob Dylan", .25, "Folx")
  ];

  public genreList: String[] = this.createGenres();
  createGenres(){
    var list: String[] = [];
    this.masterCdList.forEach(function(cd){
      if(list.indexOf(cd.genre) < 0){
        list.push(cd.genre);
      }
    });
    return list;
  }

  public artistList:String[] = this.createArtists();
  createArtists(){
    var list: String[] = [];
    this.masterCdList.forEach(function(cd){
      if(list.indexOf(cd.artist) < 0){
        list.push(cd.artist);
      }
    });
    return list;
  }

  selectedCds: Cd[] = [];
  showDetails(clickedCd: Cd) {
    if(this.selectedCds.indexOf(clickedCd) < 0){
      this.selectedCds.push(clickedCd)
    } else {
      this.selectedCds.splice(this.selectedCds.indexOf(clickedCd), 1)
    }
  }
  finishedBuying() {
    for(var i = 0; i < this.selectedCds.length; i++){
      this.masterCdList.splice(this.masterCdList.indexOf(this.selectedCds[i]), 1);
    }
    this.selectedCds =  [];
    this.genreList = this.createGenres();
    this.artistList = this.createArtists();
    this.cdListComponent.selectedGenre = "all";
    this.cdListComponent.selectedArtist = "all";
  }
}
