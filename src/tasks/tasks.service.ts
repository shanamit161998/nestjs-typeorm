import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {


  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) {
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const getTaskById = await this.tasksRepository.findOne({ where: { id } })
    if (!getTaskById) {
      throw new NotFoundException(`Task with ID => ${id} not found, Try again with different id`)
    }
    return getTaskById;
  }

  createTask(createtaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createtaskDto);
  }


  async deleteTask(Id: string):Promise<void> {
      const result = await this.tasksRepository.delete(Id);
      if(result.affected == 0){
        throw new NotFoundException(`Task with ID ==> ${Id} is not found`)
      }
      console.log(result)
  }


   async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
      const task = await this.getTaskById(id);
      task.status = status
      await this.tasksRepository.save(task)
      return task;
  }


  /* WITHOUT TYPE ORM*/
  // private tasks: Task[] = []

  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }

  
 
}
