import axios from 'axios';
import { create } from 'zustand';
import { Student, StudentDetails } from '../models/student';

const apiUrl = process.env.API_URL ?? "https://localhost:7069/api/Student";

type StudentState = {
    // grade: any;
    Students: StudentDetails[];
    setStudents: (students: StudentDetails[]) => void;
    setCount: (count: number) => void;
    total: number;
};

export const useStudentStore = create<StudentState>((set, get) => ({
    Students: [],
    total: 0,
    setCount: (count: number) => set({ total: count }),
    setStudents: (students: StudentDetails[]) => set({ Students: students }),
}));
