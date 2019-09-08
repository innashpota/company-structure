import {Employee} from '../employees/employee';

export class Project {
  public id: number;
  public name: string;
  public beginDate: Date;
  public endDate: Date;
  public employees: Employee[];

  constructor() { }
}
