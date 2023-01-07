import ForgeUI, { render, ProjectPage, Fragment, Text } from '@forge/ui';
import api, {route} from '@forge/api'; 
const App = () => {
    const fetchStories = async function(projectKey) {
        console.log(projectKey)
        const jql = `project in (${projectKey})`; 
        const res = await api
                         .asUser()
                         .requestJira(route`/rest/api/3/search?jql=${jql}`);
        const data = await res.json()
        console.log(data)
    }   
    fetchStories('sample-project') 
    return (
        <Fragment>
            <Text>Hello world!</Text>
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
