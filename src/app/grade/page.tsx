"use client";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'studentName', headerName: 'Student Name', width: 150 },
    { field: 'course', headerName: 'Course', width: 130 },
    { field: 'academicPeriod', headerName: 'Academic Period', width: 130 },
    { field: 'grade', headerName: 'Grade', width: 90 },
];

const rows = [
    { id: 1, studentName: 'Jon Snow', course: 'Mathematics', academicPeriod: '2023 Spring', grade: 'A' },
    { id: 2, studentName: 'Cersei Lannister', course: 'History', academicPeriod: '2023 Spring', grade: 'B' },
    { id: 3, studentName: 'Jaime Lannister', course: 'Physics', academicPeriod: '2023 Spring', grade: 'C' },
];

const courses = rows; // Declare and assign the 'courses' variable

export default function GradePage() {
    return (
        <div>
            <DataGrid
                columns={columns}
                //rowCount={coursesCount}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                autoHeight
                rows={courses} // Use the 'courses' variable here
            />
        </div>
    );
}


 