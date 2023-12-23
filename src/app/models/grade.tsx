export interface IGrade {
    id: number;
    studentId: number;
    courseId: number;
    period: string;
    grade: string;

    letterGrade: 'A' | 'B' | 'C' | 'D' | 'F';
}