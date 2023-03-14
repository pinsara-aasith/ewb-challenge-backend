import { object, string, TypeOf, promise, number } from 'zod';

const VALID_REPORT_CATEGORIES = ["agriculture", "animals"]

export const CreateReportSchema = object({
    body: object({
        reporterEmail: string({ required_error: 'reporter\'s email is required' }).email('Invalid email'),
        description: string({ required_error: 'description is required' }),
        location: object(
            {
                longitute: number({ required_error: 'longitude required' }),
                latitude: number({ required_error: 'latitude required' }),
            },
            {
                required_error: 'location required'
            }
        ),
        category: string({ required_error: 'category is required' })
            .trim()
            .refine((category) => !!VALID_REPORT_CATEGORIES.find(v => v == category.trim()), "invalid category"),
        icon: string({ required_error: 'icon is required' }).trim(),

        // attachments: string({ required_error: 'Password is required' }),
    }),
});

export type CreateReportInput = TypeOf<typeof CreateReportSchema>['body'];
