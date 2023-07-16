import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout } from 'components/users';
import AddEditTeam from 'components/users/AddEditTeam';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

export default Compare;

function Compare() {
    const router = useRouter();
    const [team , setTeam] = useState();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        
        if (!id) return;
        userService.getAll().then(x => setUsers(x));
        // fetch user and set default form values if in edit mode
        setTeam(userService.userValue.teams.find(team => team.name === id));
    }, [router]);

    return (
        <div>
            <h1>Select a User</h1>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}/${team.name}`} className="btn btn-sm btn-primary me-1">Select</Link>
                                {/* <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button> */}
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

        </div>
    );
}