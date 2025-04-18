"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import Image from "next/image";

const Home = () => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    originCountry: "",
    image: "",
    isVegetarianFriendly: false,
  });

  const utils = api.useUtils();

  const { data: cuisines = [], isLoading, isError } = api.cuisine.getAllCuisine.useQuery();

  const createCuisine = api.cuisine.createCuisine.useMutation({
    onSuccess: () => {
      utils.cuisine.getAllCuisine.invalidate();
      resetForm();
    },
  });

  const updateCuisine = api.cuisine.updateCuisine.useMutation({
    onSuccess: () => {
      utils.cuisine.getAllCuisine.invalidate();
      resetForm();
    },
  });

  const deleteCuisine = api.cuisine.deleteCuisine.useMutation({
    onSuccess: () => utils.cuisine.getAllCuisine.invalidate(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      const { id, ...data } = form;
      updateCuisine.mutate({ id, data });
      
    } else {
      createCuisine.mutate(form as any);
    }
  };

  const resetForm = () =>
    setForm({
      id: null,
      name: "",
      description: "",
      originCountry: "",
      image: "",
      isVegetarianFriendly: false,
    });

  const startEdit = (cuisine: any) => {
    setForm({
      id: cuisine.id,
      name: cuisine.name,
      description: cuisine.description,
      originCountry: cuisine.originCountry,
      image: cuisine.image,
      isVegetarianFriendly: cuisine.isVegetarianFriendly,
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold mb-4">Cuisines Manager</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded shadow-md border max-w-2xl">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Origin Country"
          className="border p-2 rounded"
          value={form.originCountry}
          onChange={(e) => setForm({ ...form, originCountry: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isVegetarianFriendly}
            onChange={(e) => setForm({ ...form, isVegetarianFriendly: e.target.checked })}
          />
          Vegetarian Friendly
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {form.id ? "Update" : "Create"}
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* CUISINE LIST */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading && <div>Loading cuisines...</div>}
        {isError && <div>Failed to load cuisines.</div>}
        {cuisines.map((cuisine) => (
          <div key={cuisine.id} className="bg-white p-4 rounded shadow-md space-y-2 border">
            <Image
              src={cuisine.image}
              alt={cuisine.name}
              width={300}
              height={200}
              className="rounded w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold">{cuisine.name}</h2>
            <p className="text-sm text-gray-600">{cuisine.description}</p>
            <p className="text-sm">Country: {cuisine.originCountry}</p>
            <p className="text-sm">
              Vegetarian: <span className="font-medium">{cuisine.isVegetarianFriendly ? "Yes" : "No"}</span>
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => startEdit(cuisine)}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCuisine.mutate({ id: cuisine.id })}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
