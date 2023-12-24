
export interface Student {
    name: string;
    id: string;
    Email: string;
    PhoneNumber: string
    Address: string
}

export interface Login {

    password: string;
    email: string;
}

export interface GetStudentsResponse {
    total: number;
    students: StudentDetails[];
}

export interface StudentDetails {
    id: string
    name: string
    email: string
    phoneNumber: string
    address: string
    academicRecord: any[]
    courses: any[]
    createdAt: string
    updatedAt: any
    createdBy: string
    updatedBy: any
}

