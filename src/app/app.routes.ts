import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: UserListComponent },
];
