import { plainToClass } from "class-transformer";
import { Project } from "../entities/Projects";
import { ProjectRepository } from "../repository/ProjectRepository";

export class ProjectService{
    constructor(
        private projectRepository : ProjectRepository
    ){}

    public async createProject(projectInput: any){
        const projectData = plainToClass(Project, {
            "name" : projectInput.name,
            "description" : "KeyValue"
        });
        const savedDetails = await this.projectRepository.createProject(projectData);
        return savedDetails;
    }
}