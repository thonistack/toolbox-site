"use strict";

const toolsData = [
  {
    name: "Adobe Acrobat Online",
    category: "PDF & Documents",
    description: "Work with PDF files online, including common document tasks.",
    bestFor: "Everyday PDF tasks",
    url: "https://www.adobe.com/acrobat/online.html",
    tags: ["pdf", "document", "convert", "edit"]
  },
  {
    name: "Smallpdf",
    category: "PDF & Documents",
    description: "Browser-based tools for converting, compressing, and managing PDFs.",
    bestFor: "Common PDF workflows",
    url: "https://smallpdf.com/",
    tags: ["pdf", "compress", "convert", "merge"]
  },
  {
    name: "iLovePDF",
    category: "PDF & Documents",
    description: "Online tools for combining, splitting, compressing, and converting PDFs.",
    bestFor: "Quick PDF operations",
    url: "https://www.ilovepdf.com/",
    tags: ["pdf", "merge", "split", "compress"]
  },
  {
    name: "Canva",
    category: "Image & Design",
    description: "Create presentations, posters, social graphics, and other visual designs.",
    bestFor: "Everyday visual design",
    url: "https://www.canva.com/",
    tags: ["design", "image", "poster", "presentation"]
  },
  {
    name: "Photopea",
    category: "Image & Design",
    description: "A browser-based image editor with support for layered graphics.",
    bestFor: "Layer-based image editing",
    url: "https://www.photopea.com/",
    tags: ["image", "photo", "edit", "psd", "graphics"]
  },
  {
    name: "Remove.bg",
    category: "Image & Design",
    description: "Automatically remove backgrounds from images.",
    bestFor: "Removing image backgrounds",
    url: "https://www.remove.bg/",
    tags: ["image", "background", "photo", "cutout"]
  },
  {
    name: "LanguageTool",
    category: "Text & Writing",
    description: "Check spelling, grammar, and writing style in supported languages.",
    bestFor: "Proofreading text",
    url: "https://languagetool.org/",
    tags: ["writing", "grammar", "spellcheck", "proofreading"]
  },
  {
    name: "Hemingway Editor",
    category: "Text & Writing",
    description: "Review writing readability and identify difficult sentences.",
    bestFor: "Improving readability",
    url: "https://hemingwayapp.com/",
    tags: ["writing", "readability", "editing", "essay"]
  },
  {
    name: "Grammarly",
    category: "Text & Writing",
    description: "Writing assistance for grammar, clarity, and tone.",
    bestFor: "English writing assistance",
    url: "https://www.grammarly.com/",
    tags: ["writing", "grammar", "english", "proofreading"]
  }
];

const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const clearSearchButton = document.getElementById("clear-search");
const filtersContainer = document.getElementById("filters");
const toolsContainer = document.getElementById("tools");
const countElement = document.getElementById("count");
const emptyState = document.getElementById("empty");
const resetSearchButton = document.getElementById("reset-search");
const suggestions = document.querySelectorAll(".suggestion");
const currentYearElement = document.getElementById("current-year");
const directoryElement = document.getElementById("directory");

let activeCategory = "All";
let searchQuery = "";

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getCategories() {
  return [
    "All",
    ...new Set(toolsData.map(tool => tool.category))
  ];
}

function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== "") element.textContent = text;

  return element;
}

function renderFilters() {
  filtersContainer.replaceChildren();

  getCategories().forEach(category => {
    const button = createElement(
      "button",
      "",
      category === "All" ? "All tools" : category
    );

    button.type = "button";
    button.setAttribute(
      "aria-pressed",
      String(activeCategory === category)
    );

    if (activeCategory === category) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      activeCategory = category;

      // Clear previous search when selecting a category.
      searchInput.value = "";
      searchQuery = "";

      renderFilters();
      renderTools();
    });

    filtersContainer.appendChild(button);
  });
}

function matchesSearch(tool, query) {
  if (!query) return true;

  const searchableText = [
    tool.name,
    tool.category,
    tool.description,
    tool.bestFor,
    ...(tool.tags || [])
  ].join(" ");

  return normalizeText(searchableText).includes(
    normalizeText(query)
  );
}

function getFilteredTools() {
  return toolsData.filter(tool => {
    const categoryMatches =
      activeCategory === "All" ||
      tool.category === activeCategory;

    const queryMatches = matchesSearch(tool, searchQuery);

    return categoryMatches && queryMatches;
  });
}

function createToolCard(tool) {
  const card = createElement("article", "tool-card");
  const category = createElement("span", "tool-category", tool.category);
  const title = createElement("h3", "", tool.name);
  const description = createElement("p", "tool-description", tool.description);
  const bestFor = createElement("p", "tool-best-for", `Best for: ${tool.bestFor}`);

  card.append(category, title, description, bestFor);

  const link = createElement("a", "tool-link", "Visit official website ↗");
  link.href = tool.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  card.appendChild(link);

  return card;
}

function renderTools() {
  const filteredTools = getFilteredTools();

  toolsContainer.replaceChildren();

  filteredTools.forEach(tool => {
    toolsContainer.appendChild(createToolCard(tool));
  });

  countElement.textContent =
    `${filteredTools.length} ${filteredTools.length === 1 ? "tool" : "tools"} found`;

  emptyState.hidden = filteredTools.length > 0;
  clearSearchButton.hidden = searchQuery.length === 0;
}

function handleSearch() {
  searchQuery = searchInput.value.trim();
  renderTools();
}

searchInput.addEventListener("input", handleSearch);

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch();

  directoryElement.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  renderTools();
  searchInput.focus();
});

function resetDirectory() {
  searchInput.value = "";
  searchQuery = "";
  activeCategory = "All";

  renderFilters();
  renderTools();
  searchInput.focus();
}

resetSearchButton.addEventListener("click", resetDirectory);

suggestions.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = "All";
    searchInput.value = button.dataset.query || "";
    searchQuery = searchInput.value.trim();

    renderFilters();
    renderTools();

    directoryElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

renderFilters();
renderTools();