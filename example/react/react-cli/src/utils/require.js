import importModule from "./import-module";

// eslint-disable-next-line import/no-anonymous-default-export
export default (name) => {
  const config = Array.find(window.WEB_COMMON, (x) => x.path === name);

  return new Promise((resolve, reject) => {
    if (!config) return reject();

    let { jsPath, globalVar, path } = config;
    window.__LOADED_MAP = window.__LOADED_MAP || {};
    if (window.__LOADED_MAP[globalVar]) {
      // eslint-disable-next-line no-undef
      return resolve({ globalVar, app: __LOADED_MAP[globalVar] });
    }

    importModule(jsPath)
      .then(() => {
        if (window[globalVar]) {
          const _defaultFun =
            typeof window[globalVar].default === "function"
              ? window[globalVar].default
              : window[globalVar];
          path =
            (window.baas_portal_app_prefix
              ? window.baas_portal_app_prefix + "/"
              : "") + path;
          window.__LOADED_MAP[globalVar] = _defaultFun({ appName: path });
          return resolve({ globalVar, app: window.__LOADED_MAP[globalVar] });
        } else {
          return reject();
        }
      })
      .catch((_e) => {
        return reject();
      });
  });
};
