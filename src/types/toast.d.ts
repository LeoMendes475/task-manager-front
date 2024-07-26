declare module '@nuxt/schema' {
    interface NuxtConfig {
      toast?: {
        position?: string;
        duration?: number;
        keepOnHover?: boolean;
        register?: Array<{
          name: string;
          message: string;
          options: {
            type: string;
          };
        }>;
      };
    }
  }