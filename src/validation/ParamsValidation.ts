import { Request } from "express";
import Joi from "@hapi/joi";

class ParamsValidation {
  //Validation Schema Persons
  private personsSchema = {
    first_name: Joi.string()
      .min(3)
      .required(),
    last_name: Joi.string()
      .min(3)
      .required(),
    gender: Joi.string()
      .max(1)
      .required(),
    age: Joi.number()
      .min(5)
      .max(115)
      .required(),
    medical_history: Joi.string().required(),
    marital_status: Joi.string().required(),
    current_status: Joi.string().required(),
    bio: Joi.string().required()
  };
  // --> Validation Schema register
  private registerSchema = {
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
  // --> Validation Schema Login
  private loginSchema = {
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(7)
      .required()
  };
  constructor(private request: Request) {}

  checkPersonsCredentials() {
    const { error } = Joi.validate(this.request.body, this.personsSchema);
    return error;
  }
  checkRegisterCredentials() {
    const { error } = Joi.validate(this.request.body, this.registerSchema);
    return error;
  }
  checkLoginCredentials() {
    const { error } = Joi.validate(this.request.body, this.loginSchema);
    return error;
  }
}

export default ParamsValidation;
