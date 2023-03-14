import { DocumentType, getModelForClass, index, modelOptions, pre, prop, } from '@typegoose/typegoose';;

interface IMarker {
    longitude: number,
    latitude: number
}

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Report {
    @prop({ required: true })
    reporterEmail: string;

    @prop({ unique: true, required: true })
    location: IMarker;

    @prop({ default: '', required: true })
    description: string;

    @prop({ default: 'wildlife', required: true })
    category: string;

    @prop({ required: true })
    icon: string;

}

// Create the user model from the Report class
const ReportModel = getModelForClass(Report);
export default ReportModel;
