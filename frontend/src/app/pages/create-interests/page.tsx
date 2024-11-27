// pages/create-interests/page.tsx
"use client";
import { InterestsForm } from "@/app/pages/create-interests/form";
import React from "react";

const CreateInterestsPage: React.FC = () => {
  return (
    <div className="p-10 flex-col w-96">
      <h1 className="py-4">Your preferences</h1>
      <InterestsForm />
    </div>
  );
};

export default CreateInterestsPage;
