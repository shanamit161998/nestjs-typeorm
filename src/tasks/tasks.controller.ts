import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import {Logger} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('Task Controller');
    constructor(private taskService: TasksService) { 
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user:User): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks`)
        return this.taskService.getTaskWithFilters(filterDto, user)
    }
    

    @Get('/taskById/:id')
    getTaskById(@Param('id') id: string, @GetUser() user:User): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Post('/create')
    createTask(@Body() createtaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createtaskDto, user)
    }

    @Delete('/taskById/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user:User): Promise<void> {
        return this.taskService.deleteTask(id, user)
    }


    @Patch('/taskById/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user:User): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status, user)
    }

    /* WITHOUT TYPE ORM*/


}
