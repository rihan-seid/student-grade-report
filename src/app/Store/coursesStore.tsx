import axios from 'axios';
import { create } from 'zustand';
import { ICourse } from '../models/course';

const apiUrl = process.env.API_URL ??"https://localhost:7069/api/";

type CourseState = {
    courses: ICourse[];
    addCourse: (course: ICourse) => void;
    editCourse: (course: ICourse) => void;
    getCourse: (id: string) => Promise<ICourse>; // Updated return type
    getCourses: () => Promise<ICourse[]>;
    setCourses: (courses: ICourse[]) => void;
    setCount: (count: number) => void;  
    total: number;
};

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    total: 0,
    addCourse: async (course) => {
        try {
            const response = await axios.post(`${apiUrl}course`, course);
            const newCourse = response.data;
            set((state) => ({ courses: [...state.courses, newCourse] }));
        } catch (error) {
            console.error('Error creating course:', error);
        }
    },
    editCourse: async (course) => {
        try {
            const response = await axios.put(`${apiUrl}courses/${course.Id}`, course);
            const updatedCourse = response.data;
            set((state) => ({
                courses: [
                    ...state.courses.filter((c) => c.Id !== updatedCourse.Id),
                    updatedCourse,
                ],
            }));
        } catch (error) {
            console.error('Error updating course:', error);
        }
    },
    getCourse: async (id) => {
        try {
            const response = await axios.get(`${apiUrl}course/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting course details:', error);
            return null;
        }
    },
    getCourses: async (): Promise<ICourse[]> => {
        try {
            return get().courses;
        } catch (error) {
            console.error('Error getting courses:', error);
            return [];
        }
    },
    setCourses: (courses) => set({ courses }),
    setCount: (count) => set({total: count }),
}));
