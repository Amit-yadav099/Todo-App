import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  level: string;
  message: string;
  stack?: string;
  timestamp: Date;
  user?: string;
  endpoint?: string;
  method?: string;
}

const logSchema: Schema = new Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ['error', 'warn', 'info']
    },
    message: {
      type: String,
      required: true
    },
    stack: {
      type: String
    },
    user: {
      type: String
    },
    endpoint: {
      type: String
    },
    method: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILog>('Log', logSchema);