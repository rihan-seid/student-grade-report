"use client";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {  Button, Input, TextField } from '@mui/material';
import * as yup from 'yup';

import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { LetterGradeHelper } from '../utilities/letterGradeHelper';
import axios from 'axios';
import { useCourseStore } from '../Store/coursesStore';
import { useEffect } from 'react';
import { getCoursesResponse } from '../course/page';
import { GetStudentsResponse } from '../models/student';
import { useStudentStore } from '../Store/studentsStore';

type SubmitGradeModel = {
    studentId: string;
    courseCode: string;
    score: number;
    letterGrade?: string;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'studentName', headerName: 'Student Name', width: 150 },
    { field: 'course', headerName: 'Course', width: 130 },
    { field: 'academicPeriod', headerName: 'Academic Period', width: 130 },
    { field: 'grade', headerName: 'Grade', width: 90 },
];

//Todo remove later
const rows = [
    { id: 1, studentName: 'Jon Snow', course: 'Mathematics', academicPeriod: '2023 Spring', grade: 'A' },
    { id: 2, studentName: 'Cersei Lannister', course: 'History', academicPeriod: '2023 Spring', grade: 'B' },
    { id: 3, studentName: 'Jaime Lannister', course: 'Physics', academicPeriod: '2023 Spring', grade: 'C' },
];

const validationSchema = yup.object().shape({
    studentId: yup.string().required('Student is required'),
    courseCode: yup.string().required('Course Code is required'),
    score: yup.number().min(1).max(100).required('Score is required'),
    letterGrade: yup.string(),
});
const gradeApiUrl = "https://localhost:7069/api/Grade";


export default function GradePage() {

    const courses= useCourseStore(state=>state.courses);
    const students= useStudentStore(state=>state.Students);
    const coursesStore= useCourseStore();
    const studentStore = useStudentStore()

    const fetchCourses = async () => {
        const coursesUrl = "https://localhost:7069/api/";
        axios.get(`${coursesUrl}course?PageNumber=1&PageSize=100`)
            .then(async (response) => {
                const apiResponse: getCoursesResponse = response.data;
                const data = apiResponse.courses;
                const total= apiResponse.total;
                coursesStore.setCount(total);
                coursesStore.setCourses(data);
            })
            .catch(() => {});
    }

    const fetchStudents = async () => {
        const stdudentsApiUrl = "https://localhost:7069/api/student";
        axios.get(`${stdudentsApiUrl}?PageNumber=1&PageSize=100`)
            .then(async (response) => {
                const data: GetStudentsResponse = response.data;
                const students = data.students;
                const totalStudents= data.total;
                studentStore.setStudents(students);
                studentStore.setCount(totalStudents);
            })
            .catch(() => { });
    }
    useEffect(() => {
        fetchCourses();
        fetchStudents();
    },[])


    const { register, handleSubmit, formState: { errors } } = useForm<SubmitGradeModel>({ resolver: yupResolver(validationSchema) });
    const onSubmit: SubmitHandler<SubmitGradeModel> = (data) => {
       const studentGrade: SubmitGradeModel= {
        courseCode: data.courseCode,
        letterGrade: LetterGradeHelper.getletterGrade(data.score),
        score: data.score,
        studentId: data.studentId
       }

       axios.post(gradeApiUrl, studentGrade).then(async(res) => {
        console.log(res);
       }).catch((err) => {});
    }
    return (
        <div>
            <form className='grid my-4 grid-cols-12 items-center gap-3' onSubmit={handleSubmit(onSubmit)} >

                {/* This one has to be dropdown */}

                <select
                    {...register("studentId", { required: 'Student is required' })}
                    className='col-span-3 block w-full py-2 px-3 border border-gray-300 bg-white` rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                >
                    <option value="">Select Student</option>
                    {students?.map((student, index) => (
                        <option key={index} value={student.id}>{student.name}</option>
                    ))}
                </select>

                <TextField variant='outlined' size='small'   {...register("score")} type='number'/>

                <div className="col-span-3">
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
                        Select Course
                    </label>
                  
                        <select
                            id="courseCode"
                            {...register("courseCode", { required: 'Course Code is required' })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Course</option>
                            {courses?.map((course, index) => (
                                <option key={index} value={course.courseCode}>{course?.title}</option>
                            ))}
                    </select>
                </div>
                <Button variant='outlined' type="submit">Submit</Button>
            </form>
            <DataGrid
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                autoHeight
                rows={rows}
            />
        </div>
    );
}


