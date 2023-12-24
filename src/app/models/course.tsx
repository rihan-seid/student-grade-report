import { Student } from "./student";

export interface ICourse {
    Id: string;
    title: string;
    courseCode: string;
    Description?: string;
    CreditHours: number;
    Students: Student[];
}

