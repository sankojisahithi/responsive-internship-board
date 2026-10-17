"use strict";

// Sample internship data for demonstration.

const internships = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova",
    domain: "Web Development",
    location: "Remote",
    duration: "3 months",
    description: "Build responsive websites using HTML, CSS, and JavaScript."
  },
  {
    title: "Python Developer Intern",
    company: "CodeWorks",
    domain: "Python",
    location: "Hybrid",
    duration: "2 months",
    description: "Practice Python programming and build backend applications."
  },
  {
    title: "UI/UX Design Intern",
    company: "PixelStudio",
    domain: "Design",
    location: "On-site",
    duration: "3 months",
    description: "Create accessible layouts and user-friendly interface designs."
  },
  {
    title: "Data Science Intern",
    company: "DataBridge",
    domain: "Data Science",
    location: "Remote",
    duration: "4 months",
    description: "Explore datasets and learn data analysis fundamentals."
  },
  {
    title: "Full Stack Developer Intern",
    company: "WebNest",
    domain: "Web Development",
    location: "Hybrid",
    duration: "3 months",
    description: "Learn how frontend interfaces connect to backend services."
  },
  {
    title: "Python Automation Intern",
    company: "AutomateLab",
    domain: "Python",
    location: "Remote",
    duration: "2 months",
    description: "Write Python scripts to automate repetitive tasks."
  }
];

const searchInput = document.getElementById("search");
const domainSelect = document.getElementById("domain");
const internshipList = document.getElementById("internship-list");
const statusMessage = document.getElementById("status");

function createTextElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function createInternshipCard(internship) {
  const card = document.createElement("article");
  card.className = "internship-card";

  const title = createTextElement("h3", "", internship.title);
  const company = createTextElement("p", "company", internship.company);
  const badge = createTextElement("span", "badge", internship.domain);
  const description = createTextElement(
    "p",
    "card-description",
    internship.description
  );

  const details = document.createElement("div");
  details.className = "card-details";

  details.append(
    createTextElement("span", "", "Location: " + internship.location),
    createTextElement("span", "", "Duration: " + internship.duration)
  );

  card.append(title, company, badge, description, details);

  return card;
}

function renderInternships(items) {
  internshipList.replaceChildren();

  if (items.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    emptyState.append(
      createTextElement("h3", "", "No internships found"),
      createTextElement(
        "p",
        "",
        "Try another keyword or choose a different domain."
      )
    );

    internshipList.appendChild(emptyState);
    statusMessage.textContent = "No matching internships.";
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach(function (internship) {
    fragment.appendChild(createInternshipCard(internship));
  });

  internshipList.appendChild(fragment);
  statusMessage.textContent =
    items.length + (items.length === 1
      ? " internship found."
      : " internships found.");
}

function filterInternships() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainSelect.value;

  const filteredInternships = internships.filter(function (internship) {
    const searchableText = [
      internship.title,
      internship.company,
      internship.domain,
      internship.location,
      internship.description
    ].join(" ").toLowerCase();

    const matchesKeyword = searchableText.includes(keyword);

    const matchesDomain =
      selectedDomain === "all" ||
      internship.domain === selectedDomain;

    return matchesKeyword && matchesDomain;
  });

  renderInternships(filteredInternships);
}

searchInput.addEventListener("input", filterInternships);
domainSelect.addEventListener("change", filterInternships);

// Show all internships when the page first loads.
renderInternships(internships);