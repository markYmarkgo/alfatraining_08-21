import React, {ReactElement, useState} from 'react';
import Project from '../types/Project';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

type ViewState = 'list' | 'details'

export default function App(): ReactElement {
  const [project, setProject] = useState<Project>()
  const [viewState, setViewState] = useState<ViewState>('list')
  const [showCounter, setShowCounter] = useState(true)

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
      {showCounter && (
        <>
          <FunctionalCounter />
          <ClassCounter />
        </>
      )}
      {project && viewState === 'details'
        ? <ProjectDetails projectId={project.id} onShowList={onShowList} />
        : <ProjectList onShowDetails={onShowDetails} />}
    </div>
  );
}
