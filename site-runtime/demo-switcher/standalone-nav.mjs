const demos = [
  { id: "demo1", number: "01", title: "Business Overview", label: "清晰的经营总览" },
  { id: "demo2", number: "02", title: "Operations Cockpit", label: "面向行动的运营驾驶舱" },
  { id: "demo3", number: "03", title: "Signal Control Room", label: "信号优先的经营控制台" },
  { id: "demo4", number: "04", title: "Brand Pulse", label: "品牌化的运营编辑台" },
];

const currentDemo = document.body.dataset.demoPage
  ?? window.location.pathname.match(/demo([1-4])(?:[\\/]|$)/)?.[1]
  ?? "1";
const currentId = `demo${currentDemo}`;

if (window.self === window.top) {
  const current = demos.find((demo) => demo.id === currentId) ?? demos[0];
  const root = document.createElement("aside");
  root.className = "demo-switcher";
  root.setAttribute("data-demo-switcher", "");
  root.innerHTML = `
    <button class="demo-switcher__trigger" type="button" aria-expanded="false" aria-controls="demo-switcher-panel">
      <span class="demo-switcher__mark" aria-hidden="true">YP</span>
      <span class="demo-switcher__trigger-label">切换 Demo</span>
      <span class="demo-switcher__trigger-current">${current.number}</span>
      <span class="demo-switcher__chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="demo-switcher__panel" id="demo-switcher-panel" hidden>
      <div class="demo-switcher__panel-head">
        <span>Demo family</span>
        <a class="demo-switcher__back" href="../#${current.id}">返回总览 ↗</a>
      </div>
      <nav class="demo-switcher__list" aria-label="切换其他 demo">
        ${demos.map((demo) => `
          <a class="demo-switcher__option${demo.id === current.id ? " is-current" : ""}" href="../${demo.id}/index.html"${demo.id === current.id ? ' aria-current="page"' : ""}>
            <span class="demo-switcher__option-index">${demo.number}</span>
            <span class="demo-switcher__option-copy"><strong>${demo.title}</strong><small>${demo.label}</small></span>
            <span class="demo-switcher__option-arrow" aria-hidden="true">↗</span>
          </a>
        `).join("")}
      </nav>
    </div>
  `;

  document.body.append(root);

  const trigger = root.querySelector(".demo-switcher__trigger");
  const panel = root.querySelector(".demo-switcher__panel");

  const setOpen = (open) => {
    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  };

  trigger.addEventListener("click", () => setOpen(panel.hidden));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.focus();
    }
  });
}
