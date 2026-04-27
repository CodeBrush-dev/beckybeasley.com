// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.beckybeasley.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.beckybeasley.com/","title_tag":"Professor of Fine Art in London | Studio Becky Beasley","meta_description":"Professor of Fine Art at Goldsmiths College, London. Award-winning British visual artist, mentor and educator with international exhibitions and disability arts focus."},{"page_url":"https://www.beckybeasley.com/about-3","title_tag":"Fine Art Exhibition Project | Studio Becky Beasley","meta_description":"Fine Art touring exhibition proposal by Professor of Fine Art at Goldsmiths College, London. Linoleum floor works, video portrait and pastoral interior landscapes."},{"page_url":"https://www.beckybeasley.com/about-3-1","title_tag":"Fine Art & Autism Story | Studio Becky Beasley","meta_description":"Autism story, public talks and neurodiversity in Fine Art by Professor of Fine Art at Goldsmiths College, London. Recordings, panels and artist conversations."},{"page_url":"https://www.beckybeasley.com/disabilityartslandscape","title_tag":"Fine Art Disability Education | Studio Becky Beasley","meta_description":"Disability and neurodiversity education in Fine Art by autistic Professor of Fine Art at Goldsmiths College, London. Resources for students and arts practitioners."},{"page_url":"https://www.beckybeasley.com/works-homepage","title_tag":"Fine Art Works & Exhibitions | Studio Becky Beasley","meta_description":"Fine Art solo and group exhibitions by Professor of Fine Art at Goldsmiths College, London. Linoleum floor works, early works and selected international projects."},{"page_url":"https://www.beckybeasley.com/copy-of-text-1","title_tag":"Fine Art Writing & Essays | Studio Becky Beasley","meta_description":"Fine Art essays, press and articles by Professor of Fine Art at Goldsmiths College, London. Critical writing, exhibition texts and forthcoming publications."},{"page_url":"https://www.beckybeasley.com/copy-of-text","title_tag":"Fine Art Artist’s Writings | Studio Becky Beasley","meta_description":"Artist’s writings on Fine Art, sensitivity and objects by Professor of Fine Art at Goldsmiths College, London. Essays, proposals, diaries and prose pieces."},{"page_url":"https://www.beckybeasley.com/news","title_tag":"Fine Art Texts & Criticism | Studio Becky Beasley","meta_description":"Selected Fine Art essays and criticism on exhibitions featuring Professor of Fine Art at Goldsmiths College, London. Articles, reviews and exhibition texts."},{"page_url":"https://www.beckybeasley.com/cv","title_tag":"Professor of Fine Art Biography | Studio Becky Beasley","meta_description":"Professor of Fine Art at Goldsmiths College, London. Biography, education, awards, solo and group exhibitions, collections, publications and press coverage."}],"keywords":["Professor of Fine Art","Fine Art","Goldsmiths College","London"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.beckybeasley.com/#organization",
  "name": "Studio Becky Beasley",
  "url": "https://www.beckybeasley.com/",
  "description": "Studio Becky Beasley is the online home of Becky Beasley (b. 1975, UK), an award-winning British visual artist, mentor, educator and autism advocate, Professor of Fine Art at Goldsmiths College, London. The site presents her contemporary visual art practice, touring and digital exhibitions, disability arts education resources, writings and biography.",
  "image": "https://static.wixstatic.com/media/1b9815_4fd5fcb4c88445e8b2aac15de0cb0c97%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/1b9815_4fd5fcb4c88445e8b2aac15de0cb0c97%7Emv2.jpg",
  "logo": "https://static.wixstatic.com/media/1b9815_4fd5fcb4c88445e8b2aac15de0cb0c97%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/1b9815_4fd5fcb4c88445e8b2aac15de0cb0c97%7Emv2.jpg",
  "sameAs": [
    "https://www.instagram.com/beckybeasleyuk",
    "https://www.instagram.com/theseaweedshophastings",
    "https://www.plan-b.ro/artist/becky-beasley",
    "https://www.francescaminini.it"
  ],
  "founder": {
    "@type": "Person",
    "name": "Becky Beasley",
    "jobTitle": "Visual Artist, Professor of Fine Art",
    "description": "Becky Beasley is an award-winning British visual artist, mentor, educator and autism advocate. She is Professor of Fine Art (Studio Practice) at Goldsmiths College, London, and has exhibited widely in the UK and internationally.",
    "sameAs": [
      "https://www.instagram.com/beckybeasleyuk",
      "https://www.instagram.com/theseaweedshophastings",
      "https://www.plan-b.ro/artist/becky-beasley",
      "https://www.francescaminini.it"
    ]
  },
  "knowsAbout": [
    "contemporary visual art",
    "exhibition making",
    "fine art education",
    "autism advocacy",
    "disability arts",
    "neurodiversity in the arts"
  ]
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
