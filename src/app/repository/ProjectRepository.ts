import { getConnection, Repository } from "typeorm";
import { Project } from "../entities/Projects";

export class ProjectRepository extends Repository<Project>{
    public async createProject( projectDetails : Project ){
        const projectsConnection = getConnection().getRepository(Project);
        const saveDetails = await projectsConnection.save(projectDetails);
        return saveDetails;
    }
}