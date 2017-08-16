import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.benutzer.html',
  styleUrls: ['./app.benutzer.css']
})
export class Benutzer {
  showUserEditor = false;

  users = [];
  user = {};

  public cmdAddUser(){
    var newUser = {};
    this.users.push(newUser);
    this.user = newUser;

    this.hideEditor();
    this.showUserEditor = true;
  }

  public showUser(event, user) {
    this.user = user;

    this.hideEditor();
    this.showUserEditor = true;
  }

  private resetUser() {
    this.user = {
      vorname: "",
      nachname: "",
      adresse: "",
      benutzername:"",
      passwort: "",
      kommentar:""
    };
  }

  public cmdDeleteUser(event, user) {
     var index = this.users.indexOf(user);
     if (index > -1) {
        this.users.splice(index, 1);
    }
      this.hideEditor();
  }

  public cmdFinishUser(){
    this.hideEditor();
  }

  private hideEditor(){
    this.showUserEditor = false;
  }
}
