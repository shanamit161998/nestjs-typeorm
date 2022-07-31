import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTaskWithFilters(filterDto)
    }

    @Get('/taskById/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Post('/create')
    createTask(@Body() createtaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createtaskDto)
    }

    @Delete('/taskById/:id')
    deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id)
    }


    @Patch('/taskById/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status)
    }

    /* WITHOUT TYPE ORM*/






}
