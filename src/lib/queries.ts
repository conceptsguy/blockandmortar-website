export const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc){
  _id, name, role, initials, tint, order, bio,
  "photo": select(defined(photo.asset) => photo.asset->url + "?w=400&h=400&fit=crop&auto=format", null)
}`;

export const LEGAL_QUERY = `*[_type == "legalPage" && pageKey == $pageKey][0]{
  lastUpdated,
  subtitle,
  leadParagraph,
  sections[]{
    "id": id.current,
    num,
    title,
    body
  }
}`;

export const HOME_QUERY = `*[_type == "homePage" && _id == "singleton-homePage"][0]{
  heroHeading,
  heroSubheading,
  testimonials[]{ quote, personName, personTitle },
  "logos": logos[]{ alt, "src": logo.asset->url },
  promptHeading,
  promptHeadingEm,
  promptDescription,
  stepsHeading,
  stepsHeadingEm,
  stepsDescription,
  steps[]{ number, title, body },
  bentoHeading,
  bentoHeadingEm,
  bentoDescription,
  bentoBoxes[]{ tag, heading, description },
  collabHeading,
  collabHeadingEm,
  collabDescription,
  collabFeatures[]{ title, description },
  verticalsHeading,
  verticalsHeadingEm,
  verticalsDescription,
  verticals[]{ key, title, meta },
  ctaHeading,
  ctaHeadingEm,
  ctaDescription
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc){
  quote,
  personName,
  personTitle
}`;

export const TEAM_PAGE_QUERY = `*[_type == "teamPage" && _id == "singleton-teamPage"][0]{
  h1,
  subheader,
  storyHeading,
  storyBody,
  visionHeading,
  visionBody,
  applyHeading,
  applyBody
}`;
