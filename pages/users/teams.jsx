import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { userAgent } from 'next/server';

export default Teams;

function Teams() {
    const [teams, setTeams] = useState();
    

    useEffect(() => {
        setTeams(userService.userValue.teams);
        
        
    }, []);

     function deleteTeam(name) {
        
        setTeams(teams.map(x => {
            if (x.name === name) { x.isDeleting = true; }
            else { x.isDeleting = false; }
            return x;
        }));
        const temp = teams.filter(team => team.name !== name);
        const user = userService.userValue;
        
        user.teams = temp;
        userService.update(userService.userValue.id, user).then(() => {
            setTeams(teams => teams.filter(x => x.name !== name));
        });
        console.log(user);
    }

    

    return (
        <Layout>
            <h1>Teams</h1>
            <Link href="/users/addTeam" className="btn btn-sm btn-success mb-2">Add Teams</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}> Name</th>
                        <th style={{ width: '10%' }}> Score</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {teams && teams.map(team =>
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.totalScore}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/team/${team.name}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <Link href={`/users/compare/${team.name}`} className="btn btn-sm btn-primary me-1">Compare</Link>
                                <button onClick={() => deleteTeam(team.name)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={team.isDeleting}>
                                    {team.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
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
        </Layout>
    );
}
