import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fullName!: string;
  username!: string;
  password!: string;
  accept: boolean = false;
  checked: boolean = false;


  onSubmit() {
    if (this.accept) {
      console.log('Form Submitted!', this.fullName, this.username, this.password);
    } else {
      console.log('You must accept the terms and conditions.');
    }
  }
}


