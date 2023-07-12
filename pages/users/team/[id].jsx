import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout } from 'components/users';
import AddEditTeam from 'components/users/AddEditTeam';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

export default Team;

function Team() {
    const router = useRouter();
    const [team , setTeam] = useState();

    useEffect(() => {
        const { id } = router.query;
        console.log(id);
        if (!id) return;

        // fetch user and set default form values if in edit mode
        setTeam(userService.userValue.teams.find(team => team.name === id));
    }, [router]);

    return (
        <Layout>
            <h1>Edit Team</h1>
            {team ? <AddEditTeam team={team} /> : <Spinner />}
        </Layout>
    );
}