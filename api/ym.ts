// @ts-nocheck

const ID = 94299054;

export const initYm = () => {
  if (typeof window === "undefined") {
    return;
  }

  const ym = function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };

  window.ym = window.ym || ym;
  window.ym.l = window.ym.l || Number(new Date());

  for (let script of document.scripts) {
    if (script.src === "https://mc.yandex.ru/metrika/tag.js") {
      return;
    }
  }

  let script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";

  let firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  window.ym(ID, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
};

interface IParams {
  order_price?: number;
  currency?: string;
}

interface IHitOptions {
  callback?: () => void;
  ctx?: Object;
  referer?: string;
  title?: string;
  params?: IParams;
}

export const sendHit = (url: string, options?: IHitOptions) => {
  if (typeof window === "undefined") {
    return;
  }

  window.ym(ID, "hit", url, options);
};

export const sendReachGoal = (
  target: string,
  params?: IParams,
  callback?: () => void,
  ctx?: Object,
) => {
  if (typeof window === "undefined") {
    return;
  }

  window.ym(ID, "reachGoal", target, params, callback, ctx);
};
