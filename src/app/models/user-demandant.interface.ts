import { Address } from './address.interface';
import { Study } from './study.interface';

export interface UserDemandant {
  id: number;
  type: 'Demandant';
  nif: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
  gender: string;
  birthDate: Date;
  address: Address;
  studies: Study[];
}
