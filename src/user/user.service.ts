import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserInput,
  CreateUserInputResponseDto,
  CurrentUserResponseDto,
  GetUserById,
} from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';
import { TokenService } from './token.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseError } from '../common/helpers/response.dto';
import { Ok } from '../common/helpers/appresponseType';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createNewUser(
    createUserInput: CreateUserInput,
    // ): Promise<Ok<CreateUserInputResponseDto>> {
  ): Promise<CreateUserInputResponseDto> {
    const user = await this.userModel.create({ ...createUserInput });
    user.password = await this.tokenService.hashPassword(
      createUserInput.password,
    );
    return user.save();
  }

  // }: GetUserById): Promise<Ok<CreateUserInputResponseDto>> {
  async findUserById(_id: string ): Promise<CreateUserInputResponseDto> {
    return await this.userModel.findById(_id);
  }

  // async me(userId: string): Promise<Ok<CurrentUserResponseDto>> {
  async me(userId: string): Promise<CurrentUserResponseDto> {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new NotFoundException(
        new ResponseError(
          `User with this ${userId} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    }
    return findUser;
  }
}
