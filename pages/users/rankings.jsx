import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { all } from 'axios';

export default Rankings;

function Rankings() {
    const [users, setUsers] = useState(null);
    const [teams, setTeams] = useState([]);
    let counter = 1;

    useEffect(() => {
        
        let allTeams =[]
        userService.getAll().then(x => x.map(user => user.teams.map(team => {var temp = {x: team, y: user.username}; allTeams.push(temp);})))
        .then(() => {
            allTeams?.sort((a, b) => (a.x.totalScore < b.x.totalScore) ? 1 : -1); 
            console.log(allTeams);
            setTeams(allTeams);
        });
        

        
    }, []);


    return (
        <Layout>
            <h1>All Team Rankings</h1>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Ranking</th>
                        <th style={{ width: '30%' }}>User</th>
                        <th style={{ width: '30%' }}>Team Name</th>
                        <th style={{ width: '30%' }}>Score</th>
                        
                    </tr>
                </thead>
                <tbody>
               
                    {teams && teams.map((team, id) =>
                    
                        <tr key={id}>
                            <td>{counter++}</td>
                            <td>{team.y}</td>
                            <td>{team.x.name}</td>
                            <td>{team.x.totalScore}</td>
                          
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
