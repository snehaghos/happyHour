import { QueryClient } from "react-query";



export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry:2,
        retryDelay: (attempt) => Math.pow(2, attempt)*1000, 
        onError: (e, key, context) => {
          console.error(`[Query Error]: ${key}`, e);
          if (!context?.pause) {
            console.log.error("An error occurred while fetching data");
          }
        },

      },
    },
  })
