import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

export default ComapreTeam;

function ComapreTeam() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState();
    useEffect(() => {
        const { id, name } = router.query;
        if (!id) return;
        setName(name);
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => { setUser(x);})
            .catch(alertService.error)

        
        //console.log(user);
    }, [router]);
    

    return (
        <div>
           <h1>{user?.firstName}&apos;s Teams</h1>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}> Name</th>
                        <th style={{ width: '10%' }}> Score</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {user?.teams && user.teams.map(team =>
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.totalScore}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}/${name}/${team.name}`} className="btn btn-sm btn-primary me-1">Select</Link>
                                
                            </td>
                        </tr>
                    )}
                    {!user?.teams &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {user?.teams && !user.teams.length &&
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