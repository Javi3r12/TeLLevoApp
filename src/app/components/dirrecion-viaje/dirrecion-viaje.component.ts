import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dirrecion-viaje',
  templateUrl: './dirrecion-viaje.component.html',
  styleUrls: ['./dirrecion-viaje.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class DirrecionViajeComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}

