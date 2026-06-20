import { Routes } from '@angular/router';
import { BoardPage } from './boards/board-page';

export const routes: Routes = [
  { path: 'boards', component: BoardPage },
  { path: '', pathMatch: 'full', redirectTo: 'boards' }
];
