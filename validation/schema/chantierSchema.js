import Joi from "joi";
const chantierSchemaJoi = Joi.object({
  chantierName:Joi.string().min(3).max(150).required(),
  category: Joi.string()
    .valid(
      "BUILDING",
      "PRIVATE INFRASTRUCTURE",
      "ROAD",
      "BRIDGE",
      "PUBLIC INFRASTRUCTRUE",
      "OTHER"
    )
    .default("BUILDING"),
  description: Joi.string(),
  upi: Joi.string(),
  autobatir: Joi.string(),
  plotNumber: Joi.string(),
  geoCoordinates: Joi.object({
    lat: Joi.number(),
    lng: Joi.number(),
  }),

  BoQ: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
    totalAmount: Joi.number(),
    totalFixedCost: Joi.number(),
    totalTaskAmount: Joi.number(),
    totalItemsAmount: Joi.number(),
    totalYieldAmount: Joi.number(),
    currency: Joi.string(),
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
        taskCategories: Joi.object({
          taskName: Joi.string(),
          taskCategoryComment: Joi.string(),
          taskTotalCost: Joi.number(),
          taskItems: Joi.array().items(
            Joi.object({
              taskItemName: Joi.string(),
              taskItemUnit: Joi.string(),
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
        }),
      })
    ),
  }),
}).messages({
  "any.required": "{#label} is required",
  "string.empty": "{#label} cannot be empty",

  "string.min": "{#label} must be at least {#limit} characters long",
});

export default chantierSchemaJoi;
