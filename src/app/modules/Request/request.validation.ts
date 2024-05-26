import { z } from "zod";

const requestDonorValidationSchema = z.object({
    body: z.object({
      donorId: z.string({
        required_error: "DonorId is Required.",
      }),
      phoneNumber: z.string({
        required_error: "Phone Number is Required.",
      }),
      dateOfDonation: z.string({
        required_error: "Date Of Donation is Required.",
      }),
      hospitalName: z.string({
        required_error: "Hospital Name  is Required.",
      }),
      hospitalAddress: z.string({
        required_error: "Hospital Address is Required.",
      }),
      reason: z.string({
        required_error: "Reason is Required.",
      }),
    }),
  });

export const RequestValidation = {
    requestDonorValidationSchema
}
