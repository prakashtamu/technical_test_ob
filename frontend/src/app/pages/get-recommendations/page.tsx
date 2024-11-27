"use client";

import React, { useState } from "react";
import { GetRecommendation } from "@/app/pages/get-recommendations/form";
import { Book, CircleHelp, Film, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GetRecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<
    { type: string; value: string; icon: React.ComponentType }[]
  >([]);
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleFetch = (data: {
    recommendations: string[];
    interests: string[];
  }) => {
    const iconMapping = [
      {
        key: "book",
        icon: Book,
      },
      {
        key: "article",
        icon: Newspaper,
      },
      {
        key: "movie",
        icon: Film,
      },
    ];

    const modifiedRecommendations = data.recommendations.map((item) => {
      const splitted = item.split(":");
      return {
        type: splitted[0],
        icon:
          iconMapping.find((i) => i.key === splitted[0].toLowerCase())?.icon ||
          CircleHelp,
        value: splitted[1],
      };
    });

    setRecommendations(modifiedRecommendations);
    setPreferences(data.interests);
  };

  return (
    <div className="p-10 flex flex-col space-y-8 w-full">
      <h1 className="text-xl font-bold">View Your Recommendations</h1>
      <GetRecommendation onFetch={handleFetch} />

      {preferences.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">User preferences</h2>
          {preferences.map((item, index) => (
            <Badge className="m-2" key={index}>
              {item}
            </Badge>
          ))}
        </div>
      )}

      {recommendations.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">Recommendations</h2>
          {recommendations.map((item, index) => (
            <p key={index} className="flex items-center gap-2">
              <item.icon />
              {item.value}
            </p>
          ))}
        </div>
      ) : preferences.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">Recommendations</h2>
          <p className="uppercase font-bold text-sm text-red-500">
            No recommendations found!
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GetRecommendationsPage;
