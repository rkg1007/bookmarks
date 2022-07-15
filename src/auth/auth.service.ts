import { Injectable } from "@nestjs/common"
import { AuthDto } from "./dtos"

@Injectable()
export class AuthService {
  signup(dto: AuthDto) {
    console.log(dto);
    return {msg: "I am signed up"}
  }
  signin(dto: AuthDto) {
    console.log(dto);
    return {msg: "I am signed in"}
  }
}