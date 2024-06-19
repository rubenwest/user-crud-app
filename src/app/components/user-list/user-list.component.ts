import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserDemandant } from '../../models/user-demandant.interface';
import { UserEmployee } from '../../models/user-employee.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: (UserDemandant | UserEmployee)[] = [];
  filteredUsers: (UserDemandant | UserEmployee)[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers(type: any): void {
    console.log(type.target.value);

    if (type.target.value) {
      this.filteredUsers = this.users.filter(
        (user) => user.type === type.target.value
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  viewUser(id: number): void {
    this.router.navigate(['/user/', id]);
  }

  editUser(id: number): void {
    this.router.navigate(['/user/edit', id]);
  }

  deleteUser(id: number): void {
    const user = this.users.find((user) => user.id === id);
    if (user && confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.userService.deleteUser(id);
    }
  }

  newUser(): void {
    this.router.navigate(['/user/new']);
  }
}
