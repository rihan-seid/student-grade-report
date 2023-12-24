"use client"
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCourseStore } from '../Store/coursesStore';
import { ICourse } from '../models/course';
import axios from 'axios';
import { Button, FormControl, TextField } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


export interface getCoursesResponse {
    courses: ICourse[];
    total: number;
}

export interface ICourseModel { Title: string, CourseCode: string, CreditHours: number, Description: string }

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 330 },
    { field: 'courseCode', headerName: 'Course Code', minWidth: 120 },
  
    { field: 'creditHours', headerName: 'Credit Hours', type: 'number', minWidth: 130 },
    {
        field: 'enrolledStudents',
        headerName: 'Enrolled Students',
        minWidth: 200,
        valueGetter: (params) => params.row.enrolledStudents?.join(', '),
    },
    { field: 'description', headerName: 'Description', minWidth: 200 },
];
async function getData(params?: GridPaginationModel): Promise<getCoursesResponse> {
    try {
        if (!params) {
            params = { page: 1, pageSize: 5 };
        }
        const apiUrl = process.env.API_URL ?? "https://localhost:7069/api/";
        const res = await axios.get(`${apiUrl}course?PageNumber=${params.page}&PageSize=${params.pageSize}`);
        const response: getCoursesResponse = res.data;
        return response;
    } catch (error) {
        return { courses: [], total: 0 };
    }
}
export default function CoursesPage() {
    const store = useCourseStore();
    let courses = useCourseStore(state => state.courses);
    const coursesCount = useCourseStore(state => state.total);

    const fetchCourses = async (params?: GridPaginationModel) => {
        getData(params).then((data: getCoursesResponse) => {
            const courses = data.courses;
            store.setCourses(courses);
            store.setCount(data.total);
        });
    }

    const [showAddForm, setShowAddForm] = useState(false);

    const onPaginationModelChange = async (params: GridPaginationModel) => {
        if (!params) return;
        const updatedParams: GridPaginationModel = { ...params, page: params.page + 1 };
        await fetchCourses(updatedParams);
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className=' h-screen'>
            <div className='flex justify-end mb-3'>
                <Button variant='outlined' onClick={() => setShowAddForm(true)}>Add Course</Button>
            </div>

            {showAddForm && <div> <AddCourseForm /> </div>}

            <DataGrid
                rows={courses}
                columns={columns}
                autoHeight
                rowCount={coursesCount}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 15]}
                onPaginationModelChange={onPaginationModelChange}
            />
        </div>
    );
}
const AddCourseForm: React.FC = () => {
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
        CourseCode: yup.string().required('Course Code is required').min(3, 'Course Code must be at least 3 characters long'),
        CreditHours: yup.number().min(1).max(5).required('Credit Hours is required'),
        Description: yup.string().required('Description is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<ICourseModel>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<ICourseModel> = (data) => {
        console.log(data)

        const res = axios.post("https://localhost:7069/api/course/create", data).then(async (res) => {
            var response = await res.data;
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div className='flex flex-col  justify-stretch items-center h-auto mb-3'>
            <h1 className='mt-1'>Create a new Course</h1>
            <form className='grid grid-cols-12 justify-stretch gap-2' autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <FormControl className='col-span-2'>
                    <TextField
                        size='small'
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        {...register("Title", { required: 'Title is required', minLength: { value: 3, message: 'Title must be at least 3 characters long' } })}
                        type="text"
                        error={!!errors.Title}
                        helperText={errors.Title?.message}
                    />
                </FormControl>
                <FormControl className='col-span-3' >
                    <TextField 
                        size='small'
                        label="Credit Hours"
                        variant="outlined"
                        color="secondary"
                        type="number"
                        {...register("CreditHours", { min: 1, max: 5 })}
                        error={!!errors.CreditHours}
                        helperText={errors.CreditHours?.message}
                    />
                </FormControl>
                <FormControl className='col-span-2'>
                <TextField 
                    size='small'
                    label="Course Code"
                    variant="outlined"
                    color="secondary"
                    {...register("CourseCode", { required: 'Course Code is required', minLength: { value: 3, message: 'Course Code must be at least 3 characters' } })}
                    type="text"
                    error={!!errors.CourseCode}
                    helperText={errors.CourseCode?.message}
                /></FormControl>
                <FormControl className='col-span-3'>
                    <TextField 
                        size='small'
                        label="Description"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        {...register("Description", { required: 'Description is required' })}
                        error={!!errors.Description}
                        helperText={errors.Description?.message}
                    />
                </FormControl>
                <div className='flex items-center gap-4'>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
