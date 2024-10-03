import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import connectDB from "../../../../utils/connectDB";
import { verifyPassword } from "@/utils/auth";
  
export const authOptions = {
    session: {strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const {email , password} = credentials;
                //connecting to DB
                try {
                    await connectDB();
                } catch (error) {
                    throw new Error('A problem has occurred on the server');
                }

                //check email or password is not empty
                if(!email || !password) {
                    throw new Error('Please enter valid information');
                }

                // finding user
                const user = await User.findOne({ email })

                // check user is exist
                if(!user) {
                    throw new Error('Email or password is wrong');
                }

                // validation check for user password with password in DB
                const isValid = await verifyPassword(password , user.password);

                if(!isValid) {
                    throw new Error('Email or password is wrong')
                }
               
                const name = [user.name , user.role];

                // if everything is ok
                return { email , name };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET , handler as POST};