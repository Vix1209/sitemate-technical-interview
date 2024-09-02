/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
    await this.blogRepository.save(blog);
    return;
  }

  async findAll() {
    return this.blogRepository.find();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });
    if (!blog) {
      throw new NotFoundException(`blog with ID ${id} not found.`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    // Merge the updates
    const updatedBlog = this.blogRepository.merge(blog, updateBlogDto);

    // Save the updated blog back to the database
    return this.blogRepository.save(updatedBlog);
  }

  async remove(id: number): Promise<Blog> {
    const deleteBlog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });
    if (!deleteBlog) {
      throw new NotFoundException(`blog with ID ${id} not found.`);
    }
    console.log(`item id ${id} deleted successfully`);
    return await this.blogRepository.remove(deleteBlog);
  }
}
