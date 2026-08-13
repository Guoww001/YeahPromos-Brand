const demos = {
  demo1: {
    number: "01",
    title: "Business Overview",
    description: "清晰、稳妥的商家经营总览，适合作为默认工作台。",
    path: "./demo1/index.html",
  },
  demo2: {
    number: "02",
    title: "Operations Cockpit",
    description: "把任务、风险、指标和下一步动作放在同一张运营桌面。",
    path: "./demo2/index.html",
  },
  demo3: {
    number: "03",
    title: "Signal Control Room",
    description: "用更强的对比和状态信号，快速识别经营变化与优先级。",
    path: "./demo3/index.html",
  },
  demo4: {
    number: "04",
    title: "Brand Pulse",
    description: "白底黑字的品牌化运营编辑台，让数据和动作拥有更明确的节奏。",
    path: "./demo4/index.html",
  },
};

const selector = document.querySelector("#demo-selector");
const frame = document.querySelector("#demo-frame");
const fullView = document.querySelector("#full-view");
const previewNumber = document.querySelector("#preview-number");
const previewTitle = document.querySelector("#preview-title");
const previewDescription = document.querySelector("#preview-description");
const framePath = document.querySelector("#frame-path");
const options = [...document.querySelectorAll("[data-demo]")];

function getDemoId() {
  const value = window.location.hash.slice(1).toLowerCase();
  return Object.hasOwn(demos, value) ? value : "demo1";
}

function updateUrl(demoId) {
  const nextHash = `#${demoId}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
}

function renderDemo(demoId, { syncUrl = true } = {}) {
  const demo = demos[demoId] ?? demos.demo1;
  const activeId = demos[demoId] ? demoId : "demo1";

  if (syncUrl) {
    updateUrl(activeId);
  }

  options.forEach((option) => {
    const isActive = option.dataset.demo === activeId;
    option.classList.toggle("is-active", isActive);
    if (isActive) {
      option.setAttribute("aria-current", "page");
    } else {
      option.removeAttribute("aria-current");
    }
  });

  if (frame.getAttribute("src") !== demo.path) {
    frame.setAttribute("src", demo.path);
  }
  frame.setAttribute("title", `${demo.title} demo 预览`);
  fullView.setAttribute("href", demo.path);
  previewNumber.textContent = demo.number;
  previewTitle.textContent = demo.title;
  previewDescription.textContent = demo.description;
  framePath.textContent = `yeahpromos.local / ${activeId}`;
  document.title = `YeahPromos / ${demo.title}`;
}

selector.addEventListener("click", (event) => {
  const option = event.target.closest("[data-demo]");
  if (!option) return;

  event.preventDefault();
  renderDemo(option.dataset.demo);
});

selector.addEventListener("keydown", (event) => {
  if (!(["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key))) return;

  const currentIndex = options.findIndex((option) => option.dataset.demo === getDemoId());
  const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
  const nextIndex = (currentIndex + direction + options.length) % options.length;

  event.preventDefault();
  options[nextIndex].focus();
  renderDemo(options[nextIndex].dataset.demo);
});

window.addEventListener("hashchange", () => renderDemo(getDemoId(), { syncUrl: false }));

renderDemo(getDemoId());
