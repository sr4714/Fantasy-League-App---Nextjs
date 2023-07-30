import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Spinner } from 'components';
import { SearchBar } from 'components/SearchBar';
import { SearchResultsList } from 'components/SearchResultsList';

import { userService, alertService } from 'services';

export default AddEditTeam;

function AddEditTeam(props) {
    const team = props?.team;
    
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (team) {
        formOptions.defaultValues = props.team;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [players, setPlayers] = useState([]);
    const [results, setResults] = useState([]);
    const [score, setScore] = useState(0);
    // if(team) {
    //     setPlayers(team.players);
    // }

    useEffect(() => {
        if(team){
            setPlayers(team.players);
            setScore(team.totalScore);
        }
        else{
            setPlayers([]);
            setScore(0);
        }
        
        
    }, []);

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (team) {
                team.name = data.name;
                team.players = players;
                team.totalScore = score;
                await userService.update(userService.userValue.id, userService.userValue);
                message = 'team updated';
            } else {
                const temp = {
                    name: data.name,
                    players: players,
                    totalScore: score
                }
                userService.userValue.teams.push(temp);
                await userService.update(userService.userValue.id, userService.userValue);
                message = 'team added';
            }

            // redirect to user list with success message
            router.push('/users/teams');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    function deletePlayer(id, sco) {
        
        // setTeams(teams.map(x => {
        //     if (x.name === name) { x.isDeleting = true; }
        //     else { x.isDeleting = false; }
        //     return x;
        // }));
        // const temp = teams.filter(team => team.name !== name);
        // const user = userService.userValue;
        
        // user.teams = temp;
        // userService.update(userService.userValue.id, user).then(() => {
        //     setTeams(teams => teams.filter(x => x.name !== name));
        // });
        // console.log(user);
        setPlayers(players => players.filter(x => x.id !== id));
        if(players.length === 0){
            setScore(0);
        }
        else setScore(score - sco);

    }

    function getScore(){
        var x = players.reduce(function(tot, player) { 
            // return the sum with previous value
            return tot + player.score;
          
            // set initial value as 0
          },0);
    
          setScore(x);
    }

    

    

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                
            </div>
            
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users/teams" className="btn btn-link">Cancel</Link>
            </div>
        </form>

        <div>
            <h6>Team Score: {score}</h6>
            
        </div>
        
        <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}> Name</th>
                        
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {players && players.map(player =>
                        <tr key={player.id}>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                
                                <button onClick={() => deletePlayer(player.id, player.score)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={player.isDeleting}>
                                    {player.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!players &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {players && !players.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Players To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
        </table>
       


                <SearchBar setResults={setResults}/>
                <SearchResultsList results={results} players={players} setPlayers={setPlayers} setResults={setResults} getScore={getScore}/> 
        </div>
    );
}