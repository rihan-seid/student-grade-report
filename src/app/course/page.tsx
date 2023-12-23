"use client"
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCourseStore } from '../Store/coursesStore';
import { ICourse } from '../models/course';
import axios from 'axios';

export interface getCoursesResponse{
    courses: ICourse[];
    total: number;
}

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 330 },
    { field: 'courseCode', headerName: 'Course Code', minWidth: 120 },
    { field: 'description', headerName: 'Description', minWidth: 200 },
    { field: 'creditHours', headerName: 'Credit Hours', type: 'number', minWidth: 130 },
    {
        field: 'enrolledStudents',
        headerName: 'Enrolled Students',
        minWidth: 200,
        valueGetter: (params) => params.row.enrolledStudents?.join(', '),
    },
];
async function getData(params?: GridPaginationModel): Promise<getCoursesResponse> {
    try {
        console.log(params);
        if (!params) {
            params = { page: 1, pageSize: 5 };
        }
        const apiUrl = process.env.API_URL ?? "https://localhost:7069/api/";
        const res = await axios.get(`${apiUrl}course?PageNumber=${params.page}&PageSize=${params.pageSize}`);
        const response: getCoursesResponse = res.data ;
        return  response;
    } catch (error) {
        debugger;
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

    
    const onPaginationModelChange = async (params: GridPaginationModel) => {
        if (!params) return;
        const updatedParams: GridPaginationModel = { ...params, page: params.page + 1 };
        await fetchCourses(updatedParams);
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
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