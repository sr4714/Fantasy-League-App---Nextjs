import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spinner } from 'components';

import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const teams = user?.teams;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(user ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (user) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated';
            } else {
                await userService.register(data);
                message = 'User added';
            }

            // redirect to user list with success message
            router.push('/users');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <div className="row">
        //         <div className="mb-3 col">
        //             <label className="form-label">First Name</label>
        //             <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
        //             <div className="invalid-feedback">{errors.firstName?.message}</div>
        //         </div>
        //         <div className="mb-3 col">
        //             <label className="form-label">Last Name</label>
        //             <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
        //             <div className="invalid-feedback">{errors.lastName?.message}</div>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="mb-3 col">
        //             <label className="form-label">Username</label>
        //             <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
        //             <div className="invalid-feedback">{errors.email?.message}</div>
        //         </div>
        //         <div className="mb-3 col">
        //             <label className="form-label">
        //                 Password
        //                 {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
        //             </label>
        //             <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
        //             <div className="invalid-feedback">{errors.password?.message}</div>
        //         </div>
        //     </div>
        //     <div className="mb-3">
        //         <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
        //             {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
        //             Save
        //         </button>
        //         <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
        //         <Link href="/users" className="btn btn-link">Cancel</Link>
        //     </div>
        // </form>
        <div>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}> Name</th>
                        <th style={{ width: '10%' }}> Score</th>
                        {/* <th style={{ width: '10%' }}></th> */}
                    </tr>
                </thead>
                <tbody>
                    {teams && teams.map(team =>
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.totalScore}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {/* <Link href={`/users/team/${team.name}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => deleteTeam(team.name)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={team.isDeleting}>
                                    {team.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button> */}
                            </td>
                        </tr>
                    )}
                    {!teams &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {teams && !teams.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Teams To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}