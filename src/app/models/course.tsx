import { Student } from "./student";

export interface ICourse {
    Id: string;
    Title: string;
    CourseCode: string;
    Description?: string;
    CreditHours: number;
    Students: Student[];
}

