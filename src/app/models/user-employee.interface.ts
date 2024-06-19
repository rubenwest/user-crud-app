import { Address } from './address.interface';
import { WorkExperience } from './work-experience.interface';

export interface UserEmployee {
  id: number;
  type: 'Employee';
  nif: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
  gender: string;
  birthDate: Date;
  address: Address;
  workExperience: WorkExperience[];
}
