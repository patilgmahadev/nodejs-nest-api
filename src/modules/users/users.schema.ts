import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
	email: String,
	isActive: {
		type: Boolean,
		default:false
	},
  admin: {
    type: Boolean,
    default: false,
  },

});
UserSchema.index({ username: 1 }, { unique: true });
export const UserModel = mongoose.model('User', UserSchema);
