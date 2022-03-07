import React from "react";
import Card from "./card";
export function CardContainer({
  cardDetails,
  handleCardClick
}) {

  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const truncateLongDesc = (text) => {
    if (!text) { return text }
    if (text.length > 300) {
      text = text.substring(0, 300) + "..."
    }
    return text
  }


  return <div className={"w-full mx-auto mt-12 mb-10 items-center flex flex-wrap justify-center gap-14 "}>
    {cardDetails?.map((detail, index) => {
      const {
        program_key,
        program_name,
        uni_name,
        description,
        image_url
      } = detail;
      const descriptionPreview = truncateLongDesc(description);
      return <Card key={program_key} id={program_key} index={index} programName={program_name} schoolName={uni_name} descPreview={descriptionPreview} thumbnailUrl={"https://i.ibb.co/SRwz8gK/watelroo-Image.png"} topColor={colors[index % colors.length]} handleLearnMore={handleCardClick} />;
    })}
  </div>;
}
