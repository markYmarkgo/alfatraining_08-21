import React, {ReactElement, useState} from 'react';
import Project from '../types/Project';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

type ViewState = 'list' | 'details'

export default function App(): ReactElement {
  const [project, setProject] = useState<Project>()
  const [viewState, setViewState] = useState<ViewState>('list')

  const onShowDetails = (project_: Project) => {
    setProject(project_)
    setViewState('details')
  }

  const onShowList = () => {
    setProject(undefined)
    setViewState('list')
  }

  return (
    <div className="ui container">
      {project && viewState === 'details'
        ? <ProjectDetails project={project} onShowList={onShowList} />
        : <ProjectList onShowDetails={onShowDetails} />}
    </div>
  );
}
