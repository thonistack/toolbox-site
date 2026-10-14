
const tools = [
  {
    name: "Canva",
    icon: "🎨",
    category: "Desain",
    description: "Membuat desain visual, presentasi, dan konten sosial.",
    url: "https://www.canva.com/"
  },
  {
    name: "Photopea",
    icon: "🖼️",
    category: "Desain",
    description: "Editor gambar berbasis browser untuk kebutuhan grafis.",
    url: "https://www.photopea.com/"
  },
  {
    name: "Excalidraw",
    icon: "✏️",
    category: "Produktivitas",
    description: "Membuat diagram dan sketsa dengan cepat.",
    url: "https://excalidraw.com/"
  },
  {
    name: "Google Gemini",
    icon: "✨",
    category: "AI",
    description: "Asisten AI untuk membantu berbagai pekerjaan digital.",
    url: "https://gemini.google.com/"
  },
  {
    name: "Hugging Face",
    icon: "🤗",
    category: "AI",
    description: "Menjelajahi model dan demo machine learning.",
    url: "https://huggingface.co/"
  },
  {
    name: "CodePen",
    icon: "💻",
    category: "Developer",
    description: "Mencoba dan membagikan eksperimen HTML, CSS, dan JS.",
    url: "https://codepen.io/"
  }
];

const categories = [
  "Semua",
  ...new Set(tools.map(tool => tool.category))
];

let selectedCategory = "Semua";

const searchInput = document.querySelector("#search");
const filters = document.querySelector("#filters");
const toolContainer = document.querySelector("#tools");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

function renderFilters() {
  filters.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.toggle(
      "active",
      category === selectedCategory
    );

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderFilters();
      renderTools();
    });

    filters.appendChild(button);
  });
}

function renderTools() {
  const query = searchInput.value.trim().toLowerCase();

  const visibleTools = tools.filter(tool => {
    const matchesCategory =
      selectedCategory === "Semua" ||
      tool.category === selectedCategory;

    const matchesQuery =
      `${tool.name} ${tool.category} ${tool.description}`
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesQuery;
  });

  toolContainer.innerHTML = "";
  count.textContent = `${visibleTools.length} tools`;
  empty.hidden = visibleTools.length !== 0;

  visibleTools.forEach(tool => {
    const card = document.createElement("article");
    card.className = "tool-card";

    const icon = document.createElement("div");
    icon.className = "tool-icon";
    icon.textContent = tool.icon;

    const category = document.createElement("div");
    category.className = "category";
    category.textContent = tool.category;

    const title = document.createElement("h3");
    title.textContent = tool.name;

    const description = document.createElement("p");
    description.textContent = tool.description;

    const link = document.createElement("a");
    link.href = tool.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Kunjungi situs ↗";

    link.addEventListener("click", () => {
      console.info("outbound_click", {
        tool: tool.name,
        time: new Date().toISOString()
      });
    });

    card.append(icon, category, title, description, link);
    toolContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", renderTools);

renderFilters();
renderTools();
