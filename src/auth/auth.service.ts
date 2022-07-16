import { ConflictException, HttpException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schemas";
import { AuthDto } from "./dtos"

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

  async signup(dto: AuthDto) {
    try {
      const user = await this.userModel.create(dto);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException({
          msg: `${dto.email} is already registered`,
          status: "failed"
        });
      }
      throw new HttpException(error.message, 400);
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new NotFoundException({
        msg: `user with email ${dto.email} not found`,
        status: "failed"
      })
    }
    return user;
  }
}