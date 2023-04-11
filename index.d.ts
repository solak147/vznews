// 需配置 index.d.ts 否則 app.config.ts build 會有 ts 錯誤 
declare module '@nuxt/schema' {
    interface AppConfigInput {
        addressConfig: {
          text: string;
          value: string;
          cityEngName: string;
          children: {
            value: string;
            text: string;
            areaEngName: string;
          }[];
        }[];
      }
  }

export {}
