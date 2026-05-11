import React from "react";
import agent1 from "@/assets/agent1.jpg";
import agent2 from "@/assets/agent2.jpg";
import agent3 from "@/assets/agent3.jpg";
import { Star } from "lucide-react";

function WaitListPromo() {
  return (
    <div className="flex items-center gap-3  py-2">
      <div className="flex -space-x-2">
        {[agent1, agent2, agent3].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-9 w-9 rounded-full border-2 border-background object-cover"
          />
        ))}
      </div>
      <div>
        <div className="flex gap-0.5 text-yellow-500">
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
        </div>
        <p className="text-[.7rem] md:text-xs text-muted-foreground">
          1,000+ users already waiting
        </p>
      </div>
    </div>
  );
}

export default WaitListPromo;
