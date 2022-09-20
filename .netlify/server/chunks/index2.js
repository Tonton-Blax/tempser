import { c as create_ssr_component, f as add_attribute, e as escape } from "./index.js";
const Component_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-h0ft0a.svelte-h0ft0a{z-index:2;position:fixed;top:0;left:0;background:rgba(255, 255, 255, 0.75);min-height:100vh;max-height:100vh;min-width:100vw;max-width:100vw}.inner.svelte-h0ft0a.svelte-h0ft0a{z-index:3;position:fixed;left:50%;transform:translateX(-50%);bottom:-15px;background:#ffffff;box-shadow:0px 0px 25px rgba(0, 0, 0, 0.25);border-radius:19px;max-width:100vw;min-width:100vw;padding:35px;min-height:65vh;max-height:65vh;margin:auto;overflow:scroll;-ms-overflow-style:none}.inner.svelte-h0ft0a.svelte-h0ft0a::-webkit-scrollbar{display:none}.line.svelte-h0ft0a.svelte-h0ft0a{height:7.14px;background:#ececec;border-radius:10px;margin:auto;width:100px}.crossimg.svelte-h0ft0a.svelte-h0ft0a{width:25px}.content.svelte-h0ft0a.svelte-h0ft0a{padding-top:35px;margin:auto}.innercontent.svelte-h0ft0a.svelte-h0ft0a{position:relative;min-height:100%}.linewrapper.svelte-h0ft0a.svelte-h0ft0a{position:fixed;z-index:4;left:0;height:70px;display:flex;justify-content:center;align-items:center;transform:translateX(-50%);background:white;border-radius:19px;cursor:move}.actionsDiv.svelte-h0ft0a.svelte-h0ft0a{display:flex;justify-content:space-between;align-items:center;padding:0px 35px}@media only screen and (max-width: 570px){.wrapper.svelte-h0ft0a .inner.svelte-h0ft0a{min-width:100vw !important}}@media only screen and (max-width: 800px){.inner.svelte-h0ft0a.svelte-h0ft0a{min-width:70vw !important}}@media only screen and (max-width: 1000px){.inner.svelte-h0ft0a.svelte-h0ft0a{min-width:70vw !important}}@media only screen and (max-width: 1600px){.inner.svelte-h0ft0a.svelte-h0ft0a{min-width:50vw}}@media only screen and (min-width: 1600px){.inner.svelte-h0ft0a.svelte-h0ft0a{min-width:40vw}}",
  map: null
};
const Component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visible = true } = $$props;
  let { maxVH = 90 } = $$props;
  let { minVH = 85 } = $$props;
  let inner, lineWrapper, wrapper, line, actionsDiv, overflow;
  let maxWidth;
  window.addEventListener("resize", () => {
    if (visible) {
      maxWidth = getComputedStyle(inner).width;
      lineWrapper.style.width = maxWidth;
    }
  });
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.maxVH === void 0 && $$bindings.maxVH && maxVH !== void 0)
    $$bindings.maxVH(maxVH);
  if ($$props.minVH === void 0 && $$bindings.minVH && minVH !== void 0)
    $$bindings.minVH(minVH);
  $$result.css.add(css);
  return `${visible ? `<div class="${"wrapper svelte-h0ft0a"}"${add_attribute("this", wrapper, 0)}><div style="${"overflow-y:" + escape(overflow, true) + ";min-height:" + escape(minVH, true) + "vh;max-height:" + escape(maxVH, true) + "vh"}" class="${"inner svelte-h0ft0a"}"${add_attribute("this", inner, 0)}><div class="${"innercontent svelte-h0ft0a"}"><div class="${"content svelte-h0ft0a"}">${slots.default ? slots.default({}) : ``}</div></div></div>

    <div class="${"linewrapper svelte-h0ft0a"}" draggable="${"true"}"${add_attribute("this", lineWrapper, 0)}><div>${`<img src="${"/assets/cross_primary.svg"}" alt="${"X"}" class="${"crossimg svelte-h0ft0a"}" style="${"cursor: " + escape("pointer", true) + ";"}"${add_attribute("this", line, 0)}>`}

        <div class="${"actionsDiv svelte-h0ft0a"}"${add_attribute("this", actionsDiv, 0)}>${slots.left ? slots.left({}) : ``}
          ${slots.right ? slots.right({}) : ``}</div></div></div></div>` : ``}`;
});
const Component$1 = Component;
export {
  Component$1 as default
};
