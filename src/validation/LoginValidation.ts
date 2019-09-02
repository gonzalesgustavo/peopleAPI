import { Request } from "express";
import Joi from "@hapi/joi";

class LoginValidation {
  //Validation Schema
  private validSchema = {
    username: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(7)
      .required()
  };
  constructor(private request: Request) {}

  checkPostCredentials() {
    const { error } = Joi.validate(this.request.body, this.validSchema);
    return error;
  }
}

export default LoginValidation;
