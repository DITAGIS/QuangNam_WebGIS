var config = {
    isDebug:true,
    locale:"vi",
    paths: {
      ditagis: URL_SCRIPTS+ "/ditagis",
    },
  };
  if (dojoConfig) {
    for (const key in config) {
      dojoConfig[key] = config[key]
    }
  } else
    var dojoConfig = config;