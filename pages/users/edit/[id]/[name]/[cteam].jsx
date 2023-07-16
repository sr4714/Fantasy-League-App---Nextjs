import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

export default MainCompare;

function MainCompare() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [uteam, setUteam] = useState(null);
    const [cname, setCname] = useState(null);
    useEffect(() => {
        const { id, name, cteam } = router.query;
        if (!id) return;
        setUteam(userService.userValue.teams.find(teams => teams.name === name));
        setCname(cteam);
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => { setUser(x);})
            .catch(alertService.error)
        //console.log(user);
    }, [router]);
    const team2 = user?.teams.find(teams => teams.name === cname);

    return (
        <div>
            <div>
                <h1>Your Team</h1>
                <h3>{uteam?.name}</h3>
                <h5>{uteam?.totalScore}</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}> Name</th>
                            
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {uteam?.players && uteam.players.map(player =>
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    
                                    
                                </td>
                            </tr>
                        )}
                        {!uteam?.players &&
                            <tr>
                                <td colSpan="4">
                                    <Spinner />
                                </td>
                            </tr>
                        }
                        {uteam?.players && !uteam.players.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No Users To Display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
            </table>
            </div>
            <div>
                <h1>{user?.firstName}&apos;s Team</h1>
                <h3>{team2?.name}</h3>
                <h5>{team2?.totalScore}</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}> Name</th>
                            
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {team2?.players && team2.players.map(player =>
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    
                                    
                                </td>
                            </tr>
                        )}
                        {!team2?.players &&
                            <tr>
                                <td colSpan="4">
                                    <Spinner />
                                </td>
                            </tr>
                        }
                        {team2?.players && !team2.players.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No Players To Display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
            </table>
            </div>
        </div>
    );
}