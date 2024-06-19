import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDemandant } from '../../models/user-demandant.interface';
import { UserEmployee } from '../../models/user-employee.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userTypes = ['Demandant', 'Employee'];
  userId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      type: ['', Validators.required],
      nif: ['', Validators.required],
      name: ['', Validators.required],
      firstSurname: ['', Validators.required],
      secondSurname: [''],
      gender: [''],
      birthDate: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        door: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
      studies: this.fb.array([]),
      workExperience: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.isEditMode = true;
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number): void {
    const user = this.userService.getUserById(id);
    if (user) {
      this.userForm.patchValue(user);
      if (user.type === 'Demandant') {
        user.studies.forEach((study) => {
          this.addStudy(study);
        });
      } else if (user.type === 'Employee') {
        user.workExperience.forEach((exp) => {
          this.addWorkExperience(exp);
        });
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.isEditMode && this.userId !== null) {
        user.id = this.userId;
        this.userService.updateUser(user);
      } else {
        if (user.type === 'Demandant') {
          this.userService.addUser(user as UserDemandant);
        } else if (user.type === 'Employee') {
          this.userService.addUser(user as UserEmployee);
        }
      }
      this.router.navigate(['/list']);
    } else {
      console.log('Form is invalid');
    }
  }

  get studies(): FormArray {
    return this.userForm.get('studies') as FormArray;
  }

  get workExperience(): FormArray {
    return this.userForm.get('workExperience') as FormArray;
  }

  addStudy(study?: any): void {
    this.studies.push(
      this.fb.group({
        institution: [study ? study.institution : '', Validators.required],
        degree: [study ? study.degree : '', Validators.required],
        date: [study ? study.date : '', Validators.required],
      })
    );
  }

  addWorkExperience(exp?: any): void {
    this.workExperience.push(
      this.fb.group({
        company: [exp ? exp.company : '', Validators.required],
        position: [exp ? exp.position : '', Validators.required],
        date: [exp ? exp.date : '', Validators.required],
      })
    );
  }
}
