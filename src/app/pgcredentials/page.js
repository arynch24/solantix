"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button, Input, Label } from "@/components/ui";

export default function PostgresForm({ isOpen, setIsModalOpen, session, setPostgresConfig }) {
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    user: "",
    password: "",
    database: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/savePostgresConfig", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ githubId: session.user.id, ...formData })
    });
    if (response.ok) {
      setPostgresConfig(formData);
      setIsModalOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter PostgreSQL Credentials</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Host</Label>
            <Input type="text" name="host" value={formData.host} onChange={handleChange} required />
          </div>
          <div>
            <Label>Port</Label>
            <Input type="number" name="port" value={formData.port} onChange={handleChange} required />
          </div>
          <div>
            <Label>User</Label>
            <Input type="text" name="user" value={formData.user} onChange={handleChange} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <Label>Database</Label>
            <Input type="text" name="database" value={formData.database} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}