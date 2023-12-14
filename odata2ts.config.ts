import { ConfigFileOptions, Modes } from "@odata2ts/odata2ts";

const config: ConfigFileOptions = {
  mode: Modes.service,
  services: {
    withKeys: {
      source: "resource/keyed.xml",
      output: "build/keyed",
    },
    keyless: {
      source: "resource/keyless.xml",
      output: "build/keyless",
    },
  },
};

export default config;
