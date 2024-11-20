import { Component, OnInit } from '@angular/core';
import { DataBaseAccessService } from './data-base-access.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [],
  providers:[DataBaseAccessService],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

constructor(private dbService:DataBaseAccessService){}

ngOnInit(): void {
  this.dbService.getAllRecipes();
}
}
