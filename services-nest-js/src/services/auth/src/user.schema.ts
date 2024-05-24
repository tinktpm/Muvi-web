import { Schema } from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: Number,
    birthdate: Date,
    phoneNumber: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});


export interface User extends Document {
    name: string;
    email: string;
    password: string;
    gender: number;
    birthdate: Date;
    phoneNumber: string;
    isAdmin: boolean;
    isVip: boolean;
    isBlocked: boolean;
    created_at: Date;
}


// export const UserSchema = SchemaFactory.createForClass(User);