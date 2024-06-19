import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDemandant } from '../models/user-demandant.interface';
import { UserEmployee } from '../models/user-employee.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: (UserDemandant | UserEmployee)[] = [];
  private usersSubject: BehaviorSubject<(UserDemandant | UserEmployee)[]> =
    new BehaviorSubject<(UserDemandant | UserEmployee)[]>(this.users);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http
      .get<(UserDemandant | UserEmployee)[]>('assets/users.json')
      .pipe(
        map((users) =>
          users.map((user) => {
            if (user.type === 'Demandant') {
              (user as UserDemandant).birthDate = new Date(user.birthDate);
              (user as UserDemandant).studies.forEach(
                (study) => (study.date = new Date(study.date))
              );
            } else if (user.type === 'Employee') {
              (user as UserEmployee).birthDate = new Date(user.birthDate);
              (user as UserEmployee).workExperience.forEach(
                (exp) => (exp.date = new Date(exp.date))
              );
            }
            return user;
          })
        )
      )
      .subscribe((users) => {
        this.users = users;
        this.usersSubject.next(this.users);
      });
  }

  getUsers(): Observable<(UserDemandant | UserEmployee)[]> {
    return this.usersSubject.asObservable();
  }

  getUserById(id: number): UserDemandant | UserEmployee | undefined {
    return this.users.find((user) => user.id === id);
  }

  addUser(user: UserDemandant | UserEmployee): void {
    user.id = this.users.length + 1;
    this.users.push(user);
    this.usersSubject.next(this.users);
  }

  updateUser(user: UserDemandant | UserEmployee): void {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.usersSubject.next(this.users);
  }
}
