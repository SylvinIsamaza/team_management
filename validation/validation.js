import Joi from "joi";
import chantierSchemaJoi from "./schema/chantierSchema.js";
class Validation {
  validateEmail(email) {
    const schema = Joi.string().email().required().messages({
      "string.empty": "Email required",
      "string.email": "Invalid email",
      "any.required": "Email required",
    });
    const { error } = schema.validate(email);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }

    return {
      valid: true,
    };
  }
  validateUsername(username) {
    const schema = Joi.string().required().min(3).max(150).messages({
      "string.empty": "Username required",
      "string.min": "Username should be atleast 3 characters long",
      "string.max": "Username should not exceed 150 characters",
      "any.required": "Username required",
    });
    const { error } = schema.validate(username);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validatePassword(password) {
    const schema = Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least {#limit} characters long",
        "string.pattern.base":
          "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
        "any.required": "Password required",
      });

    const { error } = schema.validate(username);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateChantierInput(chantier) {
    const { error } = chantierSchemaJoi.validate(chantier);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateLoginInfo(info) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email required",
        "string.email": "Invalid email",
        "any.required": "Email required",
      }),
      password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least {#limit} characters long",
        "any.required": "Email required",
      }),
      chantierName: Joi.string().required({
        "string.empty": "Chantier name is required",
      }),
      role: Joi.string()
        .required()
        .valid("owner", "store keeper", "site manager", "field engineer")
        .messages({
          "string.empty": "Role required",
          "any.only":
            "Invalid role ,Role must be one of the following: owner, store keeper, site manager, field engineer",
          "any.required": "Role required",
        }),
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateAdminLoginInfo(info) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email required",
        "string.email": "Invalid email",
        "any.required": "Email required",
      }),
     
      password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least {#limit} characters long",
        "any.required": "Email required",
      }),
      role: Joi.string().required().valid("admin").messages({
        "string.empty": "Role required",
        "any.only": "Invalid role ,Role must be one of the following: admin",
        "any.required": "Role required",
      }),
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }

  validateSignUpInfo(info) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email required",
        "string.email": "Invalid email",
        "any.required": "Email required",
      }),
      password: Joi.string()
        .required()
        .min(8)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.min": "Password must be at least {#limit} characters long",
          "string.pattern.base":
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
          "any.required": "Password required",
        }),
      chantierName: Joi.string().required({
        "string.empty": "Chantier name is required",
        "any.required": "Chantier name required",
      }),
      role: Joi.string()
        .required()
        .valid("owner", "store keeper", "site manager", "field engineer")
        .messages({
          "string.empty": "Role required",
          "any.only":
            "Invalid role ,Role must be one of the following: owner, store keeper, site manager, field engineer",
          "any.required": "Role required",
        }),
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateLocationInfo(info) {
    const schema = Joi.object({
      physicalLocation: {
        country: Joi.string().required(),
        province: Joi.string().required(),
        district: Joi.string().required(),
        sector: Joi.string().required(),
        cell: Joi.string().required(),
        village: Joi.string().required(),
        address: Joi.string().required(),
      },
    }).messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} can not be empty",
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateBillOfQuantityInfo(info) {
    const schema = Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      totalAmount: Joi.number().required(),
      totalFixedCost: Joi.number().required(),
      totalTaskAmount: Joi.number().required(),
      totalItemsAmount: Joi.number().required(),
      totalYieldAmount: Joi.number().required(),
      currency: Joi.string().required(),
      description: Joi.string(),
      generalCosts: Joi.array().items(
        Joi.object({
          costName: Joi.string(),
          costType: Joi.string().valid("AMOUNT", "PERCENTAGE"),
          costAmount: Joi.number(),
          costDescription: Joi.string(),
        })
      ),
      tasks: Joi.array().items(
        Joi.object({
          taskName: Joi.string(),
          taskCategoryComment: Joi.string(),
          taskTotalCost: Joi.number(),
          taskItems: Joi.array().items(
            Joi.object({
              taskItemName: Joi.string(),
              taskItemUnit: Joi.number(),
              taskItemQuantity: Joi.number(),
              taskItemUnitPrice: Joi.number(),
              taskItemTotalCost: Joi.number(),
              taskItemUnitComment: Joi.string(),
              itemDetails: Joi.array().items(
                Joi.object({
                  detailName: Joi.string(),
                  detailUnit: Joi.string(),
                  unitCost: Joi.number(),
                  detailQuantity: Joi.number(),
                  detailDescription: Joi.string(),
                  detailTotalCost: Joi.number(),
                })
              ),
            })
          ),
        })
      ),
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
  validateAdminRegisterInfo(info) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email required",
        "string.email": "Invalid email",
        "any.required": "Email required",
      }),
      secretKey: Joi.string().required().messages({
        "string.base": "secretKey must be a string",
        "string.empty": "secretKey cannot be empty",
        "any.required": "secretKey is required",
      }),
      password: Joi.string().required().pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      ).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least {#limit} characters long",
        "any.required": "Password required",
      }),
      name: Joi.string().required().messages({
        "string.empty": "name is required",
        "any.required": "name required",
      }),
      phone: Joi.string().max(13).min(12).messages({
        "string.min": "Phone number must be at least {#limit} characters long"
      })
      
    });
    const { error } = schema.validate(info);

    if (error) {
      return {
        valid: false,
        message: error.details[0].message,
        type: "validation",
      };
    }
    return {
      valid: true,
    };
  }
}

export default new Validation();
