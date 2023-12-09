import Joi from "joi";

export const signUpFormSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})