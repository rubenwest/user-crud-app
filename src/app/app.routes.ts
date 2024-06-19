import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: UserListComponent },
  { path: 'user/new', component: UserFormComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'user/edit/:id', component: UserFormComponent },
];
