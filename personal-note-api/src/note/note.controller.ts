import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../user/decorator';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtGuard)
  @Get('notes')
  async getNotes(@GetUser('id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @UseGuards(JwtGuard)
  @Get('notes/:id')
  async getNotesById(@GetUser('id') userId: string, @Param('id') noteId: string) {
    return await this.noteService.getNoteById(userId, noteId);
  }

  @UseGuards(JwtGuard)
  @Post('notes')
  async createNote(@GetUser('id') userId: string, @Body() body: CreateNoteDto) {
    return await this.noteService.createNote(userId, body);
  }

  @UseGuards(JwtGuard)
  @Patch('notes/:id')
  async updateNote(@GetUser('id') userId: string, @Body() body: UpdateNoteDto, @Param('id') noteId: string) {
    return await this.noteService.updateNote(userId, noteId, body);
  }

  @UseGuards(JwtGuard)
  @Delete('notes/:id')
  async deleteNote(@GetUser('id') userId: string, @Param('id') noteId: string) {
    return await this.noteService.deleteNote(userId, noteId);
  }
}
