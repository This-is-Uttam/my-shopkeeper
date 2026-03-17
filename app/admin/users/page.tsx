"use client";

import { Spinner } from '@/components/ui/spinner';
import { IUser } from '@/lib/models/User';
import React from 'react'
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminUserPage = () => {
  const [isLoading, setisLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  


  const getAllUsers = async () => {
    const response = await fetch("/api/user/get-users-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setUsers(resJson.users || []);
    setisLoading(false);
  };

   useEffect(() => {
      getAllUsers();
    }, []);
  

  return (
    <div>
         {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      </div>

      {/* Page content */}
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
              <TableRow className="bg-gray-100">
                <TableHead className="text-left text-gray-700 font-bold">User Image</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">User Clerk Id</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">User Full Name</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">User Email</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">User Role</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">Actions</TableHead>
              </TableRow>
              <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left">
                      {
                        <img
                          src={user.imageUrl || "/placeholder.jpg"}
                          alt="User Image"
                          className="object-contain size-10 "
                        />
                      }
                    </TableCell>
                    <TableCell className="text-left font-semibold">{user._id.toString() ?? "NULL"}</TableCell>
                    <TableCell className="text-left">{user.fullName ?? "NULL"}</TableCell>
                    <TableCell className="text-left">{user.email ?? "NULL"}</TableCell>
                    <TableCell className={`text-left ${user.role === "ADMIN" ? "font-bold" : ""}`}>{user.role ?? "NULL"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-left py-10">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default AdminUserPage