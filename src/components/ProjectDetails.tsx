import React, {ReactElement, useEffect, useState} from "react"
import axios, {AxiosResponse} from 'axios'
import Project from "../types/Project"

interface Props {
  projectId: number
  onShowList: () => void;
}

function ProjectDetails(props: Props): ReactElement {
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    axios({method: 'get', url: `http://localhost:3001/projects/${props.projectId}`})
      .then((response: AxiosResponse<Project>) => {
        setProject(response.data)
      })
  }, [props.projectId])

  if (!project) {return <p>Lade</p>}

  return (
    <>
      <div>
        <h1>{project.title}</h1>
        <div className="ui divider" />
        <div className="ui grid">
          <div className="four wide column">
            <h4>
              <i className="file image outline middle aligned icon" />
              Image
            </h4>
            <img className="ui image" alt="" src={project.img} />
          </div>
          <div className="four wide column">
            <h4>
              <i className="clock outline middle aligned icon" />
              Times
            </h4>
          </div>
          <div className="four wide column">
            <h4>
              <i className="flag outline middle aligned icon" />
              Progress
            </h4>
          </div>
          <div className="four wide column">
            <h4>
              <i className="compass outline middle aligned icon" />
              Status
            </h4>
            <p>{project.status}</p>
          </div>
        </div>
      </div>
      <div className="ui divider" />
      <button onClick={props.onShowList} className="ui red button">Back</button>
    </>
  )
}

export default ProjectDetails
