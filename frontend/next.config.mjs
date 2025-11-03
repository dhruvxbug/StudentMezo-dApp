import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@react-native-async-storage/async-storage"] = false;
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      encoding: false,
      "pino-pretty": false,
    };
    return config;
  },
};

export default nextConfig;