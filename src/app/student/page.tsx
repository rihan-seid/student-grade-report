"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { GetStudentsResponse, StudentDetails } from '../models/student';
import { useStudentStore } from '../Store/studentsStore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCourseStore } from '../Store/coursesStore';
import { getCoursesResponse } from '../course/page';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Enrollment } from '../models/Enrollment';


const fetchStudents = async (): Promise<GetStudentsResponse> => {
  const stdudentsApiUrl = "https://localhost:7069/api/student";
  return axios.get(`${stdudentsApiUrl}?PageNumber=1&PageSize=100`)
    .then(async (response) => {
      const data: GetStudentsResponse = response.data;
      return data;
    })
    .catch(() => {
      return { students: [], total: 0 };
    });
}

async function getCourses(): Promise<getCoursesResponse> {
  const apiUrl = process.env.API_URL ?? "https://localhost:7069/api/";
  try {
    const response = await axios.get(`${apiUrl}course?PageNumber=1&PageSize=100`);
    const data: getCoursesResponse = response.data;
    return data;
  } catch (err) {
    return { total: 0, courses: [] };
  }
}



const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', minWidth: 200 },
  { field: 'email', headerName: 'Email', type: 'number', minWidth: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 250 },
  { field: 'address', headerName: 'Address', minWidth: 200 },

];


const Page: React.FC = () => {

  const studentStore = useStudentStore();
  const students = useStudentStore(state => state.Students);
  const studentsCount = useStudentStore(state => state.total);
  const [selectedStudent, setSelectedStudent] = React.useState({} as StudentDetails);

  const courseState = useCourseStore();
  const courses = useCourseStore(state => state.courses);




  useEffect(() => {

    getCourses().then(res => {
      courseState.setCount(res.total);
      courseState.setCourses(res.courses);
    }).catch(err => {
      courseState.setCount(0);
      courseState.setCourses([]);
    })

    fetchStudents().then((data) => {
      studentStore.setStudents(data.students);
      studentStore.setCount(data.total);
    });
  }, [])


  const setSelectedStudentDetails = (student: StudentDetails) => {
    setSelectedStudent(student);
  }

  const [semester, setSelectedSemester] = useState(0);
  const [courseCode, setSelectedcourseCode] = useState("");



  const handleSemesterChange = (event: SelectChangeEvent): void => {
    setSelectedSemester(parseInt(event.target.value))
  }



  const handleCourseCodeChange = (event: SelectChangeEvent) => {
    setSelectedcourseCode(event.target.value);
  };



  const handleEnrollment = () => {

    console.log("hey")
    const enrollment: Enrollment = {
      CourseCode: courseCode,
      studentId: selectedStudent.id,
      semester: semester
    }

    // send this to the backend using axios
    axios.post('https://localhost:7069/api/Student/enroll', enrollment).then((response) => {
      console.log(response)
    }).then(error => {
      console.log(error)
    })


  }

  return (<>
    <div className='mt-5'>
      <DataGrid
        rows={students}
        columns={columns}
        onRowClick={(data) => setSelectedStudentDetails(data.row)}
        autoHeight
        rowCount={studentsCount}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25]}
      />
    </div>

    {selectedStudent.name && <div className='mt-5'>

      <h4>Enroll selected student for a course</h4>

      <form className='flex w-2/4 flex-row gap-4'>

        <div className='flex-1'>
          <FormControl fullWidth>
            <Select defaultValue={""}
              value={courseCode}
              label="Course Code"
              onChange={handleCourseCodeChange}
            >  <option value=''>Select Course Code</option>
              {courses?.map((course,index) => (
                <MenuItem  key={index} value={course.courseCode}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='flex-1'>

          <FormControl fullWidth>
            <Select defaultValue={'0'}
              value={semester.toString()}
              label="Semester"
              onChange={handleSemesterChange}
            >
              <option value=''>Select semester</option>
              <MenuItem value={0}>First semester</MenuItem>
              <MenuItem value={1}>Second Semester</MenuItem>
            </Select>
          </FormControl>
          </div>

        <Button onClick={ handleEnrollment}>Enroll</Button>
      </form>
    </div>
    }
  </>
  );
}

export default Page;
