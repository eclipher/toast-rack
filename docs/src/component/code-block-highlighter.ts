import { createHighlighterCore } from "shiki/core";
import nord from "@shikijs/themes/nord";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export const highlighter = await createHighlighterCore({
    themes: [nord],
    langs: [import("@shikijs/langs/typescript"), import("@shikijs/langs/bash")],
    engine: createJavaScriptRegexEngine(),
});
