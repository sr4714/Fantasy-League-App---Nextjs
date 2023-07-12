import { Layout } from 'components/users';
import AddEditTeam from 'components/users/AddEditTeam';


export default AddTeam;

function AddTeam() {
    return (
        <Layout>
            <h1>Add Team</h1>
            <AddEditTeam />
        </Layout>
    );
}