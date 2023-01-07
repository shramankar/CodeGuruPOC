import ForgeUI, { render, 
                 ProjectPage, 
                 Fragment, 
                 Text, 
                 Select, 
                 Form,
                 useEffect, 
                 useState, 
                 Option,
                 Table, 
                 Head, 
                 Cell, 
                 Row} from '@forge/ui';
import api, {route} from '@forge/api'
const App = () => {
    const [formState, setFormState] = useState(undefined);
    var [stories, setStories] = useState(undefined);

    const fetchNumberOfIssues = async () => {
        const response = await api.asUser().requestJira(route`/rest/api/3/search`);
        const data = await response.json();
        return data.total;
    };
    const fetchStories = async (projectKey) => {
        const jql = `project in (${projectKey})`; 
        const formattedArray = []
        const res = await api
                         .asUser()
                         .requestJira(route`/rest/api/3/search?jql=${jql}`);
        const data = await res.json()
        const numIssues = data.total
        for (let i = 0; i < numIssues; i++) {
            formattedArray.push({
                issueID: data.issues[i].key, 
                description: data.issues[i].fields.summary 
            })
        }
        setStories(formattedArray)
    }  
    const getProjects = async () =>{
        const numIssues = await fetchNumberOfIssues();
        const response = await api.asUser()
                                  .requestJira(
                                   route`/rest/api/3/search?maxResults=1000`);
        const data = await response.json();
        let projects = new Set();
        for (let i = 0; i < numIssues; i++) {
          projects.add(data.issues[i].fields.project.name);
        }
        const projects_l = Array.from(projects);
        return projects_l;
    }
    const getProjectKey = async(project) => {
        const numIssues = await fetchNumberOfIssues();
        const response = await api.asUser()
                                  .requestJira(
                                   route`/rest/api/3/search?maxResults=1000`);
        const data = await response.json();
        for (let i = 0; i < numIssues; i++) {
            if (data.issues[i].fields.project.name == project) {
                return data.issues[i].fields.project.key
            }
        }
        throw "project key associated with" + project + "could not be found"
    }
    const onSubmit = async (formData) => {
        setFormState(formData);
    }
    const onDefault = (project) => {
        try {
          if (project === formState.projects){
            return true
          }
        }
        catch {
          return false
        }
      }
    const [projects] = useState(async () => await getProjects());
    useEffect(async () => {
            if (formState != undefined){
                const key = await getProjectKey(formState.projects)
                await fetchStories(key)
            }
    }, [formState])
    return (
        <Fragment>
            <Form onSubmit={onSubmit}>
                <Select
                    label="Select the project you want code to be generated for"
                    name="projects"
                    placeholder="Select Project"
                >
                    {projects.map((project) => (
                        <Option label={project} value={project} defaultSelected={onDefault(project)}/>
                    ))}
                </Select>
            </Form>
            {formState != undefined && stories != undefined ? (
          <Fragment>
            <Table>
              <Head>
                <Cell>
                  <Text>ID</Text>
                </Cell>
                <Cell>
                  <Text>Description</Text>
                </Cell>
              </Head>
              {stories.map((story) => (
                <Row>
                  <Cell>
                    <Text>{story.issueID}</Text>
                  </Cell>
                  <Cell>
                    <Text>{story.description}</Text>
                  </Cell>
                </Row>
              ))}
            </Table>
          </Fragment>
        ) : null}
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
