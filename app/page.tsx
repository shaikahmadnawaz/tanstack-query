"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const INITIAL_STATE = {
  title: "",
  body: "",
  userId: "",
};

export default function Home() {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const fetchData = async () => {
    const response = await fetch(
      "https://api.github.com/users/shaikahmadnawaz"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response);
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchData,
  });

  const postFormData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const formMutation = useMutation({
    mutationFn: postFormData,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await formMutation.mutateAsync();
    setFormData(INITIAL_STATE);
    console.log("Form data", formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>TanStack Query</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the title"
          name="title"
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          value={formData.title}
        />
        <input
          type="text"
          placeholder="Enter the body"
          name="body"
          onChange={(e) => {
            setFormData({ ...formData, body: e.target.value });
          }}
          value={formData.body}
        />
        <input
          type="text"
          placeholder="Enter the userId"
          name="userId"
          onChange={(e) => {
            setFormData({ ...formData, userId: e.target.value });
          }}
          value={formData.userId}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
