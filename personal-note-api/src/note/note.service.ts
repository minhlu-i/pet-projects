import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotes(userId: string) {
    return await this.prismaService.note.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async getNoteById(userId: string, noteId: string) {
    return await this.prismaService.note.findFirstOrThrow({
      where: {
        user_id: userId,
        id: noteId,
      },
    });
  }

  async createNote(userId: string, body: CreateNoteDto) {
    return await this.prismaService.note.create({
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
        user_id: userId,
      },
    });
  }

  async updateNote(userId: string, noteId: string, body: UpdateNoteDto) {
    await this.prismaService.note.findFirstOrThrow({
      where: {
        id: noteId,
        user_id: userId,
      },
    });
    return await this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
      },
    });
  }

  async deleteNote(userId: string, noteId: string) {
    await this.prismaService.note.findFirstOrThrow({
      where: {
        id: noteId,
        user_id: userId,
      },
    });
    return await this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
