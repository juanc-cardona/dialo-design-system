// Dialo · componentes React sin dependencias de build (React.createElement).
// El mismo código alimenta el paquete npm (dist/react) y Claude Design (window.Dialo).
// Requiere dist/css/dialo.css (o bundle.css en Claude Design).

export function createDialo(React, LOGO_DATA, LOGO_META) {
  const h = React.createElement;
  const cx = (...a) => a.filter(Boolean).join(" ");
  const forward = (fn, name) => {
    const C = React.forwardRef ? React.forwardRef(fn) : fn;
    C.displayName = name;
    return C;
  };

  // ---------------------------------------------------------------- Logo
  // version: "horizontal" | "horizontal-endorsed" | "vertical" | "icon"
  // color:   "positive" | "negative" | "mono-black" | "mono-white"
  // height en px; clearSpace añade el área de seguridad oficial alrededor.
  function Logo({ version = "horizontal", color = "positive", height = 32, clearSpace = false, title = "Dialo", className, style, ...rest }) {
    const key = `dialo-${version}-${color}`;
    const data = LOGO_DATA[key];
    if (!data) {
      const ok = Object.keys(LOGO_DATA).join(", ");
      throw new Error(`Dialo <Logo>: la combinación ${version}/${color} no existe en el sistema oficial. Variantes: ${ok}`);
    }
    const meta = LOGO_META[key];
    const width = Math.round(height * meta.aspectRatio);
    if (typeof console !== "undefined" && width < meta.minPx) {
      console.warn(`Dialo <Logo>: ${key} a ${width}px está por debajo del mínimo (${meta.minPx}px).`);
    }
    return h(
      "span",
      {
        className: cx("dl-logo", className),
        style: { "--dl-logo-h": `${height}px`, "--dl-logo-clear": clearSpace ? meta.clearSpace : 0, ...style },
        ...rest,
      },
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: data.viewBox,
        role: "img",
        "aria-label": title,
        height,
        width,
        dangerouslySetInnerHTML: { __html: data.inner },
      })
    );
  }

  // Slogan oficial: literal, en español, con punto final. Nunca dentro del lockup.
  const SLOGAN = "El agente que convierte conversaciones en resultados.";
  function Slogan({ as = "p", className, ...rest }) {
    return h(as, { className: cx("dl-slogan", className), ...rest }, SLOGAN);
  }

  // ---------------------------------------------------------------- Button
  const Button = forward(function Button(
    { variant = "primary", size = "md", icon, iconRight, accentIcon = false, block, loading, disabled, as = "button", className, children, ...rest },
    ref
  ) {
    const isButton = as === "button";
    return h(
      as,
      {
        ref,
        className: cx("dl-btn", `dl-btn--${variant}`, size !== "md" && `dl-btn--${size}`, !children && icon && "dl-btn--icon", block && "dl-btn--block", className),
        disabled: isButton ? disabled || loading : undefined,
        "aria-disabled": !isButton && disabled ? "true" : undefined,
        "aria-busy": loading ? "true" : undefined,
        "data-loading": loading ? "true" : undefined,
        type: isButton && !rest.type ? "button" : rest.type,
        ...rest,
      },
      loading ? h("span", { className: "dl-spinner", "aria-hidden": true }) : icon ? h("span", { className: accentIcon ? "dl-btn__accent" : undefined, style: { display: "inline-flex" }, "aria-hidden": true }, icon) : null,
      children != null ? h("span", { className: "dl-btn__label" }, children) : null,
      iconRight ? h("span", { style: { display: "inline-flex" }, "aria-hidden": true }, iconRight) : null
    );
  }, "Button");

  // ---------------------------------------------------------------- Forms
  let uid = 0;
  const useId = React.useId || (() => React.useMemo(() => `dl-${++uid}`, []));

  function Field({ label, hint, error, id, children }) {
    const auto = useId();
    const fid = id || auto;
    const child = React.Children.only(children);
    return h(
      "div",
      { className: "dl-field" },
      label && h("label", { className: "dl-field__label", htmlFor: fid }, label),
      React.cloneElement(child, {
        id: fid,
        "aria-invalid": error ? "true" : undefined,
        "aria-describedby": error ? `${fid}-error` : hint ? `${fid}-hint` : undefined,
      }),
      error ? h("span", { className: "dl-field__error", id: `${fid}-error`, role: "alert" }, error) : hint ? h("span", { className: "dl-field__hint", id: `${fid}-hint` }, hint) : null
    );
  }
  const Input = forward((p, ref) => h("input", { ref, ...p, className: cx("dl-input", p.className) }), "Input");
  const Textarea = forward((p, ref) => h("textarea", { ref, ...p, className: cx("dl-input", p.className) }), "Textarea");
  const Select = forward(({ children, ...p }, ref) => h("select", { ref, ...p, className: cx("dl-input", p.className) }, children), "Select");

  const Checkbox = forward(({ label, className, ...p }, ref) =>
    h("label", { className: cx("dl-choice", className) }, h("input", { ref, type: "checkbox", className: "dl-check", ...p }), label && h("span", null, label)), "Checkbox");
  const Radio = forward(({ label, className, ...p }, ref) =>
    h("label", { className: cx("dl-choice", className) }, h("input", { ref, type: "radio", className: "dl-radio", ...p }), label && h("span", null, label)), "Radio");

  function Switch({ checked, defaultChecked, onChange, label, disabled, className, ...rest }) {
    const [inner, setInner] = React.useState(!!defaultChecked);
    const on = checked != null ? checked : inner;
    const toggle = () => { if (disabled) return; if (checked == null) setInner(!on); onChange && onChange(!on); };
    return h(
      "label",
      { className: cx("dl-choice", className), style: { alignItems: "center" } },
      h("button", { type: "button", role: "switch", "aria-checked": on ? "true" : "false", className: "dl-switch", onClick: toggle, disabled, ...rest }),
      label && h("span", null, label)
    );
  }

  // ---------------------------------------------------------------- Display
  function Badge({ tone = "neutral", dot, live, className, children, ...rest }) {
    return h("span", { className: cx("dl-badge", tone !== "neutral" && `dl-badge--${tone}`, live && "dl-badge--live", className), ...rest },
      (dot || live) && h("span", { className: "dl-badge__dot", "aria-hidden": true }), children);
  }

  const Chip = forward(({ pressed, className, children, ...rest }, ref) =>
    h("button", { ref, type: "button", className: cx("dl-chip", className), "aria-pressed": pressed != null ? String(!!pressed) : undefined, ...rest }, children), "Chip");

  function Card({ eyebrow, title, variant, interactive, className, children, as = "div", ...rest }) {
    return h(as, { className: cx("dl-card", variant && `dl-card--${variant}`, interactive && "dl-card--interactive", className), ...rest },
      eyebrow && h("p", { className: "dl-card__eyebrow" }, eyebrow),
      title && h("h3", { className: "dl-card__title" }, title),
      typeof children === "string" ? h("p", { className: "dl-card__body" }, children) : children);
  }

  function Tabs({ items, value, defaultValue, onChange, label = "Secciones", className }) {
    const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : items[0] && items[0].value);
    const cur = value != null ? value : inner;
    const select = (v) => { if (value == null) setInner(v); onChange && onChange(v); };
    const onKey = (e, i) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      const n = items[(i + d + items.length) % items.length];
      select(n.value);
      const el = e.currentTarget.parentElement.children[(i + d + items.length) % items.length];
      el && el.focus();
    };
    return h("div", { className: cx("dl-tabs", className), role: "tablist", "aria-label": label },
      items.map((it, i) => h("button", {
        key: it.value, role: "tab", type: "button", className: "dl-tab",
        "aria-selected": cur === it.value ? "true" : "false", tabIndex: cur === it.value ? 0 : -1,
        onClick: () => select(it.value), onKeyDown: (e) => onKey(e, i),
      }, it.label)));
  }

  const ALERT_ICONS = {
    info: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    success: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
    warning: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01",
    danger: "M12 8v4M12 16h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  };
  function Icon({ d, size = 20, className, ...rest }) {
    return h("svg", { viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true, ...rest },
      h("path", { d }));
  }
  function Alert({ tone = "info", title, children, className, ...rest }) {
    return h("div", { className: cx("dl-alert", `dl-alert--${tone}`, className), role: tone === "danger" ? "alert" : "status", ...rest },
      h(Icon, { d: ALERT_ICONS[tone], className: "dl-alert__icon" }),
      title && h("p", { className: "dl-alert__title" }, title),
      children && h("p", { className: "dl-alert__body" }, children));
  }

  function Avatar({ src, name = "", size = "md", className, ...rest }) {
    const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    return h("span", { className: cx("dl-avatar", size !== "md" && `dl-avatar--${size}`, className), "aria-label": name || undefined, role: name ? "img" : undefined, ...rest },
      src ? h("img", { src, alt: "" }) : initials);
  }
  // Avatar del agente: siempre el icono oficial positivo
  function AgentAvatar({ size = "sm", className }) {
    const d = LOGO_DATA["dialo-icon-positive"];
    return h("span", { className: cx("dl-avatar", "dl-avatar--agent", size !== "md" && `dl-avatar--${size}`, className), role: "img", "aria-label": "Dialo" },
      h("svg", { viewBox: d.viewBox, xmlns: "http://www.w3.org/2000/svg", dangerouslySetInnerHTML: { __html: d.inner } }));
  }

  // ---------------------------------------------------------------- Conversación
  function Message({ from = "agent", time, avatar = true, children, className }) {
    return h("div", { className: cx("dl-msg", `dl-msg--${from}`, className) },
      from === "agent" && avatar ? h(AgentAvatar, null) : null,
      h("div", { className: "dl-bubble" }, children, time && h("span", { className: "dl-msg__meta" }, time)));
  }
  function Thread({ children, className, ...rest }) {
    return h("div", { className: cx("dl-thread", className), role: "log", "aria-live": "polite", ...rest }, children);
  }
  function QuickReplies({ options = [], onSelect, className }) {
    return h("div", { className: cx("dl-quick-replies", className) }, options.map((o) => h(Chip, { key: o, onClick: () => onSelect && onSelect(o) }, o)));
  }
  function Typing() {
    return h("div", { className: "dl-msg dl-msg--agent" }, h(AgentAvatar, null),
      h("div", { className: "dl-typing", role: "status", "aria-label": "Dialo está escribiendo" }, h("span"), h("span"), h("span")));
  }
  function Composer({ placeholder = "Escribe un mensaje", onSend, sendLabel = "Enviar mensaje", className }) {
    const [v, setV] = React.useState("");
    const send = (e) => { e && e.preventDefault(); if (!v.trim()) return; onSend && onSend(v.trim()); setV(""); };
    return h("form", { className: cx("dl-composer", className), onSubmit: send },
      h("input", { className: "dl-composer__input", value: v, onChange: (e) => setV(e.target.value), placeholder, "aria-label": placeholder }),
      h(Button, { type: "submit", size: "sm", "aria-label": sendLabel, icon: h(Icon, { d: "m22 2-7 20-4-9-9-4Z M22 2 11 13", size: 18 }) }));
  }
  function OrderCard({ title, meta, amount, className }) {
    return h("div", { className: cx("dl-order", className) },
      h("p", { className: "dl-order__title" }, title),
      h("span", { className: "dl-order__amount" }, amount),
      meta && h("p", { className: "dl-order__meta" }, meta));
  }

  // ---------------------------------------------------------------- Datos
  function Stat({ label, value, delta, deltaTone = "success", context, className }) {
    return h("div", { className: cx("dl-stat", className) },
      h("span", { className: "dl-stat__label" }, label),
      h("span", { className: "dl-stat__value" }, value),
      (delta || context) && h("span", { className: "dl-stat__meta" }, delta && h(Badge, { tone: deltaTone }, delta), context));
  }

  function EmptyState({ title, children, action, art, className }) {
    return h("div", { className: cx("dl-empty", className) },
      art && h("img", { className: "dl-empty__art", src: art, alt: "" }),
      h("h3", { className: "dl-empty__title" }, title),
      children && h("p", { className: "dl-empty__body" }, children),
      action);
  }

  function Toast({ children, icon, className, ...rest }) {
    return h("div", { className: cx("dl-toast", className), role: "status", ...rest }, icon, h("span", null, children));
  }

  return {
    Logo, Slogan, SLOGAN, Button, Field, Input, Textarea, Select, Checkbox, Radio, Switch,
    Badge, Chip, Card, Tabs, Alert, Icon, Avatar, AgentAvatar,
    Thread, Message, QuickReplies, Typing, Composer, OrderCard, Stat, EmptyState, Toast,
    LOGO_VARIANTS: Object.keys(LOGO_DATA),
  };
}
