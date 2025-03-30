"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({
    name: session?.user?.name || "",
    githubId: session?.user?.id || "",
    email: session?.user?.email || "",
    postgresConfig: {
      host: "",
      port: 5432,
      user: "",
      password: "",
      database: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      postgresConfig: name.startsWith("postgres")
        ? { ...prev.postgresConfig, [name.replace("postgres", "").toLowerCase()]: value }
        : { ...prev, [name]: value },
    }));
  };

  const handleSave = () => {
    console.log("Updated User Data:", userData);
    alert("Profile Updated Successfully!");
    setIsEditing(false);
  };

  return (
    <Card className="w-full mx-auto p-6 h-full overflow-y-auto bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">User Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Details */}
        <div className="space-y-2">
          <Label className="text-gray-700">Full Name</Label>
          <Input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Email</Label>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PostgreSQL Credentials */}
        <h3 className="text-xl font-semibold text-gray-900">PostgreSQL Credentials</h3>

        <div className="space-y-2">
          <Label className="text-gray-700">Host</Label>
          <Input
            type="text"
            name="postgresHost"
            value={userData.postgresConfig.host}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Port</Label>
          <Input
            type="text"
            name="postgresPort"
            value={userData.postgresConfig.port}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Username</Label>
          <Input
            type="text"
            name="postgresUser"
            value={userData.postgresConfig.user}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Password</Label>
          <Input
            type="password"
            name="postgresPassword"
            value={userData.postgresConfig.password}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Database</Label>
          <Input
            type="text"
            name="postgresDatabase"
            value={userData.postgresConfig.database}
            onChange={handleChange}
            disabled={!isEditing}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          {isEditing ? (
            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-200">
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}