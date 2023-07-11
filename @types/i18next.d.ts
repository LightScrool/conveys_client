import "i18next";
import UIConfig from "../i18n/UIConfig.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      "translation": typeof UIConfig
    }
  }
}
