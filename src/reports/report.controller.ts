import { NextFunction, Request, Response } from 'express';
import ReportModel from './report.model';
import { CreateReportInput } from './report.schema';

export const getAllReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reports = await ReportModel.find();

        res.status(200).json({
            status: 'success',
            data: {
                items: reports
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const report = await ReportModel.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: report,
        });
    } catch (err: any) {
        next(err);
    }
};

export const createReport = async (req: Request<{}, {}, CreateReportInput>, res: Response, next: NextFunction) => {
    try {
        const report = await ReportModel.create({
            reporterEmail: req.body.reporterEmail,
            location: req.body.location,
            description: req.body.description,
            category: req.body.category,
            icon: req.body.icon,
        });

        res.status(201).json({
            status: 'success',
            data: report,
        });

    } catch (err: any) {
        next(err);
    }

};
