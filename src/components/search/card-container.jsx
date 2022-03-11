import React from "react";
import Card from "./card";
export function CardContainer({
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

  const schoolsLogoLookup = {
    "University of Ottawa": "https://i.ibb.co/2nzbFtz/uottawalogo.jpg",
    "University of Waterloo": "https://i.ibb.co/SRwz8gK/watelroo-Image.png",
    "Nipissing University": "https://i.ibb.co/tBFNxrw/nip-logo.jpg",
    "Université de l'Ontario français": "https://i.ibb.co/X35FyYf/u-of-of-logo.png",
    "Brock University": "https://i.ibb.co/N9WmkR0/brock-logo.jpg",
    "Lakehead University": "https://i.ibb.co/QNZV6SC/lakehead-logo.jpg",
    "OCAD University": "https://i.ibb.co/YZBFd8c/OCADUniversity-Logo.png",
    "University of Toronto": "https://i.ibb.co/K2vN4KV/UofTLogo.jpg",
    "Ontario Tech University": "https://i.ibb.co/mSHRrDh/Ontario-Tech-U.png",
    "Carleton University": "https://i.ibb.co/rwNbGF3/Carleton-ULogo.png",
    "University of Guelph": "https://i.ibb.co/0QkZm1C/Uof-Guelph-Logo.jpg",
    "Wilfrid Laurier University": "https://i.ibb.co/wrV6gtv/wlu.jpg",
    "Trent University": "https://i.ibb.co/gd2rRVP/trent.webp",
    "Ryerson University": "https://i.ibb.co/yXCHVTp/ryerson.png",
    "McMaster University": "https://i.ibb.co/bPrVwmD/McMaster.png",
    "Royal Military College of Canada": "https://i.ibb.co/CskTpCz/RMC.jpg",
    "Queen's University": "https://i.ibb.co/gD3vj87/Queens-Logo-colour.png",
    "University of Windsor": "https://i.ibb.co/DfGv79x/University-of-Windsor.png",
    "Algoma University": "https://i.ibb.co/4tmV9TN/Algoma-Univeristy.png",
    "Laurentian University": "https://i.ibb.co/ct0w30n/Laurentian-University.png",
    "Western University": "https://i.ibb.co/cFXtSDN/western.png",
    "York University": "https://i.ibb.co/dt5ZxK9/York.png",
  }



  return <div className={"w-full mx-auto mt-12 mb-10 items-center flex flex-wrap justify-center gap-14 "}>
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
