import React from "react";
import Card from "./card";
export function CardContainer({
  hidden,
  cardDetails,
  handleCardClick
}) {
  const colors = ['violet-300', 'amber-200', 'emerald-400', 'rose-300', 'sky-300', 'orange-300', 'red-300']

  const truncateLongDesc = (text) => {
    if (!text) { return text }
    const MAX_LEN = 200
    if (text.length > MAX_LEN) {
      text = text.substring(0, MAX_LEN) + "..."
    }
    return text
  }

  const schoolsLogoLookup = require('../../utils/school_thumbnail_lookup.json');

  const hideClass = hidden ? "hidden" : ""

  return <div className={"w-full mx-auto mt-12 mb-10 items-center flex flex-wrap justify-center gap-14 " + hideClass}>
    {cardDetails?.map((detail, index) => {
      const {
        program_key,
        program_name,
        uni_name,
        description,
      } = detail;
      const thumbnailUrl = schoolsLogoLookup[uni_name]
      const descriptionPreview = truncateLongDesc(description);
      return <Card key={program_key} id={program_key} index={index} programName={program_name} schoolName={uni_name} descPreview={descriptionPreview} thumbnailUrl={thumbnailUrl} topColor={colors[index % colors.length]} handleLearnMore={handleCardClick} />;
    })}
  </div>;
}
