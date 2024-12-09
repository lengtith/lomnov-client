// Define the roles available in your application
type UserRole = 'user' | 'admin';

// Define the Auth interface that extends Mongoose's Document interface
export interface Auth extends Document {
  cognitoSub: string;
  email: string;
  googleId?: string;   // Optional, since not all users may have a Google ID
  isVerified: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
