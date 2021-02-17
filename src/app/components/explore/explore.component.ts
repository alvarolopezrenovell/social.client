import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: []
})

export class ExploreComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = 'Explorar';
  }

  ngOnInit(): void {
    console.log('Componente de <explore> cargado');
  }

}


