import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { auth } from "@clerk/nextjs/server";

export async function checkIfUserIsAdmin(){
      const { userId } = await auth();

      if (!userId) {
        return false;
      }
    
      await connectDB();
    
      const user = await User.findOne({ clerkId: userId });
    
      return (user && user.role === "ADMIN");
    
}


