import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    const existingGenres = await this.prisma.genre.findMany({
      where: { name: { in: data.genre } },
    });

    return await this.prisma.movie.create({
      data: {
        name: data.name,
        genre: {
          connect: existingGenres.map((genre) => ({ id: genre.id }))
        }
      },
      include: {
        genre: true
      }
    })
  }

  async findAll() {
    return await this.prisma.movie.findMany({
      include: {
        genre: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
