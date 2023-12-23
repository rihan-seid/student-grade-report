'use client';
import React, { Suspense } from 'react';
import { TextField, Button, Card, Box, CardContent } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form"
import { Student, Login } from '../models/student';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signupFormSchema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    id: yup.string().required('ID is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ""], 'Passwords must match')
        .required('Confirm Password is required'),
});

const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});


const SignInForm: React.FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Login>({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<Login> = (data) => console.log(data);
    return (
        <div className="flex flex-row p-4 bg-blue-50 text-w  px-4 mx-auto flex-grow mt-8">
            <div className='w-full max-w-md mx-auto'>
            <Suspense fallback={<div>Loading...</div>}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField
                        size="small"
                        label="Email"
                        type="email"
                        {...register('email')}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        size="small"
                        label="Password"
                        type="password"
                        {...register('password')}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button className='mt-2 self-end right-0' type="submit" variant="outlined">
                        Login
                    </Button>
                </form>
            </Suspense>
            </div>

        </div>
    )
}
const SignupForm: React.FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Student>({
        resolver: yupResolver(signupFormSchema),
    });

    const onSubmit: SubmitHandler<Student> = (data) => console.log(data);
    return (
        <Card variant="outlined" className="flex px-4 mx-auto flex-grow mt-8">
            <CardContent>
                <Suspense fallback={<div>Loading...</div>}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            size="small"
                            label="FullName"
                            {...register('name')}
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            size="small"
                            label="Email"
                            type="email"
                            {...register('email')}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            size="small"
                            label="Id"
                            type="id"
                            {...register('id')}
                            fullWidth
                            margin="normal"
                            error={!!errors.id}
                            helperText={errors.id?.message}
                        />
                        <TextField
                            size="small"
                            label="Password"
                            type="password"
                            {...register('password')}
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <TextField
                            size="small"
                            label="confirm Password"
                            type="password"
                            {...register('confirmPassword')}
                            fullWidth
                            margin="normal"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                        <Button type="submit" variant="outlined">
                            Login
                        </Button>
                    </form>
                </Suspense>
            </CardContent>
        </Card>
    )
}

const LoginPage: React.FC = () => {

    return (

        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 items-center'>
            <div className='bg-white '><SignInForm /></div>
            <div className='bg-white '><SignupForm /></div>
        </div>

    );
};

export default LoginPage;
